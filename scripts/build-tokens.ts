/**
 * Turns the Ink & Ember tokens.json into CSS custom properties.
 *
 *   node scripts/build-tokens.ts
 *
 * Output: src/lib/styles/tokens.css (generated, do not edit by hand).
 * tokens.json is copied verbatim from the design system; values are never altered here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

type ThemedValue = { light: string; dark: string };
type ColorToken = { name: string; value: string | ThemedValue; usage: string };
type TypeStyle = {
	name: string;
	fontSize: string;
	lineHeight: number;
	fontWeight: number;
	letterSpacing?: string;
	usage: string;
};
type Tokens = {
	color: { tokens: ColorToken[] };
	type: {
		families: Record<string, string>;
		groups: { name: string; family: string; styles: TypeStyle[] }[];
	};
	spacing: { tokens: { name: string; value: string }[] };
	radius: { tokens: { name: string; value: string }[] };
	layout: { tokens: { name: string; value: string }[] };
};

const root = new URL('../', import.meta.url);
const tokens = JSON.parse(
	readFileSync(new URL('src/lib/design/tokens.json', root), 'utf8')
) as Tokens;

/** "{paper}" becomes var(--paper); plain values pass through. */
const ref = (v: string): string => {
	const m = /^\{([a-z0-9-]+)\}$/.exec(v);
	return m ? `var(--${m[1]})` : v;
};

const palette = tokens.color.tokens.filter(
	(t): t is ColorToken & { value: string } => typeof t.value === 'string'
);
const themed = tokens.color.tokens.filter(
	(t): t is ColorToken & { value: ThemedValue } => typeof t.value !== 'string'
);

const decl = (name: string, value: string) => `\t--${name}: ${value};`;
const themeBlock = (mode: 'light' | 'dark') =>
	themed.map((t) => decl(t.name, ref(t.value[mode]))).join('\n');

/** A type style's usage note may give its fluid size, e.g. "Fluid: clamp(2rem, 8.4vw, 6rem)." */
const fluid = (usage: string): string | undefined => /Fluid: (clamp\([^)]*\))/.exec(usage)?.[1];

const typeDecls = tokens.type.groups.flatMap((g) =>
	g.styles.flatMap((s) => {
		const out = [
			decl(`type-${s.name}-family`, `var(--font-${g.family})`),
			decl(`type-${s.name}-size`, fluid(s.usage) ?? s.fontSize),
			decl(`type-${s.name}-line-height`, String(s.lineHeight)),
			decl(`type-${s.name}-weight`, String(s.fontWeight))
		];
		out.push(decl(`type-${s.name}-tracking`, s.letterSpacing ?? 'normal'));
		return out;
	})
);

const css = `/* Generated from src/lib/design/tokens.json by scripts/build-tokens.ts. Do not edit. */

:root {
	color-scheme: light dark;

	/* Palette swatches: the same in both themes. Use directly only in the Hero split and the mark. */
${palette.map((t) => decl(t.name, t.value)).join('\n')}

	/* Families */
${Object.entries(tokens.type.families)
	.map(([k, v]) => decl(`font-${k}`, v))
	.join('\n')}

	/* Type styles */
${typeDecls.join('\n')}

	/* Spacing, radius, layout */
${[...tokens.spacing.tokens, ...tokens.radius.tokens, ...tokens.layout.tokens]
	.map((t) => decl(t.name, t.value))
	.join('\n')}
}

/* Role tokens, light (the default). */
:root,
:root[data-theme='light'] {
${themeBlock('light')}
}

/* Role tokens, dark: follows the system unless the visitor picked light. */
@media (prefers-color-scheme: dark) {
	:root:not([data-theme='light']) {
${themeBlock('dark')
	.split('\n')
	.map((l) => '\t' + l)
	.join('\n')}
	}
}

/* Role tokens, dark: the visitor's explicit choice. */
:root[data-theme='dark'] {
${themeBlock('dark')}
}
`;

const outPath = fileURLToPath(new URL('src/lib/styles/tokens.css', root));
writeFileSync(outPath, css);
console.log(`tokens: wrote ${outPath}`);
