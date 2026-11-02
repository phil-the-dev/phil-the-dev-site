import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { dropDrafts } from './src/lib/markdown/drafts.ts';
import { highlight } from './src/lib/markdown/highlight.ts';

/**
 * UNDER_CONSTRUCTION=true (or 1) at build or dev time: the app is built from
 * src/routes-holding, which holds only the holding page at /. No other route, and
 * none of src/content, is compiled, so nothing else can be reached or leak into the
 * client bundles. Unknown paths get the 404 page. Set it as a Workers Builds build
 * variable (see README).
 */
const underConstruction = /^(1|true)$/i.test(process.env.UNDER_CONSTRUCTION ?? '');
if (underConstruction) console.log('UNDER_CONSTRUCTION is on: building the holding page only.');

export default defineConfig({
	plugins: [
		dropDrafts(),
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			// `files.routes` is deprecated in favour of monorepos but still supported; it is
			// the one switch that keeps every other route out of the holding-page build.
			files: { routes: underConstruction ? 'src/routes-holding' : 'src/routes' },
			preprocess: [mdsvex({ extensions: ['.md'], highlight: { highlighter: highlight } })],
			compilerOptions: {
				// Force runes mode for the project, except for libraries and mdsvex output.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.md')
						? undefined
						: true
			},
			// fallback: 404.html is served by Cloudflare for unknown paths (wrangler.jsonc).
			adapter: adapter({ strict: true, fallback: '404.html' }),
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
