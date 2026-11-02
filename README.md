# phil-the-dev

Personal developer site, built with SvelteKit, TypeScript (strict), Tailwind 4 and pnpm, on the Ink & Ember design system.

## Commands

- `pnpm dev`: regenerate tokens, start the dev server
- `pnpm build`: regenerate tokens, prerender the static site to `build/`
- `pnpm check`: svelte-check
- `pnpm tokens`: regenerate `src/lib/styles/tokens.css` from `src/lib/design/tokens.json`
- `pnpm cf:dev`: build, then serve `build/` in the Cloudflare runtime at http://localhost:8787
- `pnpm run deploy`: build and deploy to Cloudflare Workers (static assets)
- `pnpm deploy:pages`: build and deploy to a Cloudflare Pages project called `phil-the-dev-site`

## Deploying to Cloudflare

The site is fully static: adapter-static prerenders it to `build/`. Unknown paths get `404.html` with a 404 status.

**Workers (recommended).** `wrangler.jsonc` defines a Worker with static assets only and no script. Either:

- run `pnpm exec wrangler login`, then `pnpm run deploy`, or
- connect the repository in the Cloudflare dashboard (Workers & Pages → Create → Import a repository) with build command `pnpm build` and deploy command `pnpm exec wrangler deploy`.

**Pages.** Connect the repository with framework preset *None*, build command `pnpm build` and output directory `build`. Or run `pnpm deploy:pages`.

Both read:

- `.node-version` (Node 22; the token script needs Node 22.18 or newer)
- the `packageManager` field (pnpm)
- `static/_headers`, which sets long caching on hashed assets, `nosniff`, and `noindex` on `/admin`

**CMS sign-in on Cloudflare.** Sveltia CMS at `/admin` signs in to GitHub with a personal access token as is. For GitHub OAuth sign-in, deploy the `sveltia-cms-auth` Worker and set `base_url` in `static/admin/config.yml`.

## Design tokens

`src/lib/design/tokens.json` is copied verbatim from the Ink & Ember design system. Change it there, then copy it here.
`scripts/build-tokens.ts` turns it into CSS custom properties: palette swatches, type, spacing, radius and layout on `:root`, and the role tokens as a light set and a dark set.
`src/app.css` removes Tailwind's default palette, spacing, radii, fonts and shadows, then maps the utilities onto the tokens. For example, `bg-surface`, `text-text-muted`, `p-5` (space-5), `text-title` and `max-band:` (under 860px).

## Theme

Light is the default, and with no saved choice the site follows `prefers-color-scheme`. Pressing D toggles the theme and saves the choice in `localStorage`. An inline script in `src/app.html` applies the saved choice before first paint.

## Content

Sveltia CMS runs at `/admin` (`static/admin/config.yml`). It commits Markdown files to:

- `src/content/articles`, served at `/writing/<slug>`
- `src/content/projects`, served at `/projects/<slug>`. Featured projects appear as the Selected work cards on Home, sorted by `order`.

mdsvex compiles the Markdown, and `src/lib/content.ts` validates the front matter, so a bad file fails the build. Drafts appear in `pnpm dev` and are left out of production builds. Code fences are highlighted with Shiki at build time (`src/lib/markdown/highlight.ts`).

The build writes `/projects/<slug>.html`, so the host needs to serve clean URLs (most static hosts do this by default).

## Assets you supply

- `static/fonts/GeneralSans-Semibold.woff2` (Fontshare, free licence): in place
- `src/lib/design/shiki/ink-ember-light.json` and `ink-ember-dark.json`: the Ink & Ember VS Code themes, used as is by Shiki
