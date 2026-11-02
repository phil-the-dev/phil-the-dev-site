import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';

/**
 * Keeps draft Markdown out of production builds.
 *
 * src/lib/content.ts imports every file in src/content with eager globs, so without
 * this every draft would be compiled into the client chunks even though no page is
 * prerendered for it. In `vite build` only (`vite dev` is untouched, so drafts still
 * render), for files under src/content whose front matter has `draft: true`:
 *
 * - each `import.meta.glob('/src/content/….md', …)` gets a negated pattern per draft,
 *   so drafts are not imported at all, not even their file names;
 * - as a backstop, any import of a draft that still happens (mdsvex or `?raw`) loads a
 *   stub holding only `draft: true`, which content.ts skips.
 */

const CONTENT_MD = /\/src\/content\/[^?]*\.md$/;
const STUB = '---\ndraft: true\n---\n';
/** `import.meta.glob<T>('/src/content/….md'` with the pattern in group 2. */
const CONTENT_GLOB = /(import\.meta\.glob(?:<[^>(]*>)?\(\s*)'(\/src\/content\/[^']*\.md)'/g;

/** Same rule as content.ts (`meta.draft === true`): an unquoted YAML boolean true. */
export function isDraft(source: string): boolean {
	const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? '';
	return /^draft:[ \t]*(true|True|TRUE)[ \t]*(#.*)?$/m.test(front);
}

export function dropDrafts(): Plugin {
	let root = process.cwd();
	return {
		name: 'drop-drafts',
		apply: 'build',
		enforce: 'pre',
		configResolved(config) {
			root = config.root;
		},
		transform(code, id) {
			if (id.includes('/node_modules/') || !code.includes('/src/content/')) return;
			const out = code.replace(CONTENT_GLOB, (match, call: string, pattern: string) => {
				const drafts = globSync(pattern.slice(1), { cwd: root })
					.map((file) => '/' + file.replaceAll('\\', '/'))
					.filter((file) => isDraft(readFileSync(join(root, file), 'utf8')));
				if (!drafts.length) return match;
				const list = [pattern, ...drafts.map((d) => '!' + d)].map((p) => `'${p}'`);
				return `${call}[${list.join(', ')}]`;
			});
			return out === code ? undefined : { code: out, map: null };
		},
		load(id) {
			const [path, query = ''] = id.split('?', 2);
			if (!CONTENT_MD.test(path.replaceAll('\\', '/'))) return;
			if (!isDraft(readFileSync(path, 'utf8'))) return;
			if (query === '') return STUB;
			if (query.split('&').includes('raw')) return `export default ${JSON.stringify(STUB)};`;
		}
	};
}
