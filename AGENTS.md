# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> `CLAUDE.md` is a symlink to `AGENTS.md` — editing either updates both. Keep it that way.

## What this repo is

Static personal site for **nahid.im** (Nahid Bin Azhar), rebuilt from WordPress as an
Astro static site with a legacy-newspaper / typewriter aesthetic ("The Alien Dispatch").
Write posts in Markdown, `git push` to publish — no database, no admin panel.

`IMPLEMENTAIONS.md` is the phase-by-phase source of truth for the rebuild. The code
currently on disk is still largely the stock Astro **blog** starter (e.g. `src/consts.ts`
says `'Astro Blog'`, content lives in `src/content/blog/`); the target layout, component
set, and content schema in `IMPLEMENTAIONS.md` §3 have not fully landed yet. When a task
touches design, routing, content, or conventions, read the relevant phase there first and
prefer its target names over what stock scaffolding currently uses.

## Commands

- `npm run dev` — dev server at `localhost:4321`. Per project preference, start it in
  background mode: `astro dev --background`, then manage with `astro dev stop`,
  `astro dev status`, `astro dev logs`.
- `npm run build` — production build to `./dist/`. **Run before every commit** — the
  content-collection schema is the content linter; there is no separate test suite.
- `npm run preview` — serve the built `./dist/` locally.
- `npm run astro check` — type-check `.astro` files and content frontmatter.

Requires Node `>=22.12.0`.

## Architecture

- **Astro** (v7, `package.json`) with `output: static`. Integrations: `@astrojs/mdx`,
  `@astrojs/sitemap`. RSS via `@astrojs/rss`. `sharp` for image optimization.
- **Content Collections** (`src/content.config.ts`) — the `blog`/`diaries` collection is
  loaded with the `glob` loader over `src/content/**/*.{md,mdx}` and its frontmatter is
  validated by a Zod schema (`title`, `description`, `pubDate`, optional `updatedDate`,
  optional `heroImage`). Retrieve posts with `getCollection()`. Schema failures fail the build.
- **Pages/routing** — files in `src/pages/` map to routes; `[...slug].astro` /
  `[...page].astro` handle dynamic post, paginated archive, and (nested) category routes.
- **Fonts** are self-hosted and declared in `astro.config.mjs` via `fontProviders.local()`.
- **TypeScript** extends `astro/tsconfigs/strict`.
- **Deploy** target is Cloudflare Pages (static). Redirects go in `public/_redirects`
  (Cloudflare format).

## Conventions (from IMPLEMENTAIONS.md §5 — follow these)

- **Bengali is the default content language.** Any sample/test post you generate must be
  in Bangla; test typography against a Bengali post first, English second. Never apply
  `hyphens: auto`, `text-transform`, `letter-spacing` tricks, or `font-variant: small-caps`
  to Bengali text.
- **Zero client-side JS** unless a task explicitly requires it — prefer CSS. No Tailwind;
  the design system is bespoke plain CSS with custom properties.
- **No hardcoded hex/spacing in components** — all colors and spacing come from CSS custom
  properties (target: `src/styles/tokens.css`). Palette: paper `#f2ece0`, ink `#1c1a17`,
  faded `#6b6459`, rule `#2a2722`, accent oxblood `#7a1f12`. No border-radius, no shadows
  (except the paper sheet edge), no gradients.
- **Newspaper date format everywhere**: `Saturday, July 11, 2026` (via a `format` util).
- **Images**: grayscale via CSS filter (keep originals in color), 1px ink border, italic caption.
- **Responsive**: after any layout change, check 375px width first — every rule/border must
  still make sense when the broadsheet collapses to a single column.
- **Bengali UI copy** lives in one place (`utils/strings.ts`), not scattered across components.
- **Commits**: conventional (`feat:`, `fix:`, `content:`, `chore:`); one rebuild phase = one PR.

## Documentation

Full docs: https://docs.astro.build. Consult before related work:
[routing](https://docs.astro.build/en/guides/routing/) ·
[components](https://docs.astro.build/en/basics/astro-components/) ·
[framework components](https://docs.astro.build/en/guides/framework-components/) ·
[content collections](https://docs.astro.build/en/guides/content-collections/) ·
[styling](https://docs.astro.build/en/guides/styling/) ·
[i18n](https://docs.astro.build/en/guides/internationalization/)
