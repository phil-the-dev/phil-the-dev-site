/**
 * Code highlighting for Markdown, run at build time by mdsvex.
 * Uses Shiki with the Ink & Ember VS Code theme (light and dark) from
 * src/lib/design/shiki/. Until those files exist, code renders unhighlighted.
 */
import { existsSync, readFileSync } from 'node:fs';
import { bundledLanguages, codeToHtml, type ThemeRegistration } from 'shiki';

const themeDir = new URL('../design/shiki/', import.meta.url);
const themeFile = (mode: 'light' | 'dark') => new URL(`ink-ember-${mode}.json`, themeDir);

function loadThemes(): { light: ThemeRegistration; dark: ThemeRegistration } | null {
	if (!existsSync(themeFile('light')) || !existsSync(themeFile('dark'))) return null;
	const read = (m: 'light' | 'dark') =>
		JSON.parse(readFileSync(themeFile(m), 'utf8')) as ThemeRegistration;
	return { light: read('light'), dark: read('dark') };
}

const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Make an HTML string safe to drop into Svelte markup via {@html `...`}. */
const forSvelte = (html: string) =>
	`{@html \`${html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`}`;

export async function highlight(code: string, lang: string | null | undefined): Promise<string> {
	const themes = loadThemes();
	const language = lang && lang in bundledLanguages ? lang : 'text';
	let html: string;
	if (themes) {
		html = await codeToHtml(code, {
			lang: language,
			themes,
			defaultColor: false,
			transformers: [
				{
					pre(node) {
						// Background, border and padding come from the tokens (.code-block in app.css).
						delete node.properties.style;
					}
				}
			]
		});
	} else {
		html = `<pre tabindex="0"><code>${escapeHtml(code)}</code></pre>`;
	}
	return `<div class="code-block" data-lang="${language}">${forSvelte(html)}</div>`;
}
