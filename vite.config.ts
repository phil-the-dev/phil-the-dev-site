import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { highlight } from './src/lib/markdown/highlight.ts';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'], highlight: { highlighter: highlight } })],
			compilerOptions: {
				// Force runes mode for the project, except for libraries and mdsvex output.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.md')
						? undefined
						: true
			},
			adapter: adapter({ strict: true }),
			prerender: {
				// /writing is linked from the nav but not built yet (see pages.md).
				handleHttpError: ({ path, message }) => {
					if (path === '/writing') return console.warn(`prerender: ${message} (not built yet)`);
					throw new Error(message);
				},
				// A collection with no published entries yet (all drafts) has nothing to prerender.
				handleUnseenRoutes: 'warn'
			}
		})
	]
});
