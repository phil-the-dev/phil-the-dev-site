# phil-the-dev

Personal developer site, built with SvelteKit, TypeScript (strict), Tailwind 4 and pnpm, on the Ink & Ember design system.

## Commands

- `pnpm dev`: regenerate tokens, start the dev server
- `pnpm build`: regenerate tokens, prerender the static site to `build/`
- `pnpm check`: svelte-check (types)
- `pnpm lint`: ESLint (TypeScript and Svelte)
- `pnpm tokens`: regenerate `src/lib/styles/tokens.css` from `src/lib/design/tokens.json`
- `pnpm cf:dev`: build, then serve `build/` in the Cloudflare runtime at http://localhost:8787
- `pnpm run deploy`: build and deploy to Cloudflare Workers (static assets)
- `pnpm deploy:pages`: build and deploy to a Cloudflare Pages project called `phil-the-dev-site`

## Under-construction holding page

Set `UNDER_CONSTRUCTION=true` (or `1`) when building, and the site is just a holding page at `/`:

- `/` shows the holding page: the masthead, two short paragraphs and the footer, with `<meta name="robots" content="noindex">`.
- Every other path returns 404. Those routes aren't hidden; they aren't built. `vite.config.ts` points SvelteKit at `src/routes-holding/`, which holds only the holding page. No other page and nothing from `src/content` reaches the output or the JavaScript bundles.
- `/admin` (Sveltia CMS) and the other files in `static/` are still served, so you can keep writing content.

Unset or set to anything else, the full site builds from `src/routes/`.

```sh
UNDER_CONSTRUCTION=true pnpm build   # holding page only
UNDER_CONSTRUCTION=true pnpm dev     # preview it locally
```

On Cloudflare it's a build variable, not a `wrangler.jsonc` setting: the site is static, so the flag is read while building, not at runtime. In the dashboard, go to Workers & Pages → phil-the-dev-site → Settings → Build → **Variables and secrets** and add `UNDER_CONSTRUCTION` = `true`. Build variables apply to every branch, so PR previews show the holding page too while it's set.

## Deploying to Cloudflare

The site is fully static: adapter-static prerenders it to `build/`. Unknown paths get `404.html` with a 404 status.

**Workers (recommended).** `wrangler.jsonc` defines a Worker with static assets only and no script. Either:

- run `pnpm exec wrangler login`, then `pnpm run deploy`, or
- connect the repository in the Cloudflare dashboard (Workers & Pages → Create → Import a repository) with build command `pnpm build` and deploy command `npx wrangler deploy`. The build command must be set, or `build/` will not exist when the deploy runs. Builds of other branches run `npx wrangler preview`, which needs the `previews` block in `wrangler.jsonc`.

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
