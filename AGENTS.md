# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> `CLAUDE.md` is a symlink to `AGENTS.md` — editing either updates both. Keep it that way.

## What this repo is

Static personal site for **nahid.im** (Nahid Bin Azhar), rebuilt from WordPress as an
Astro static site with a legacy-newspaper / typewriter aesthetic ("The Alien Dispatch").
Write posts in Markdown, `git push` to publish — no database, no admin panel.

`IMPLEMENTAIONS.md` is the phase-by-phase source of truth for the rebuild. When a task
touches design, routing, content, or conventions, read the relevant phase there first.
For **SEO / AEO / GEO** and authoring, the rules in this file are mandatory on every
article and every site change that affects pages, meta, or structured data.

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
- **Content Collections** (`src/content.config.ts`) — the `diaries` collection is
  loaded with the `glob` loader over `src/content/diaries/**/*.{md,mdx}` and its
  frontmatter is validated by a Zod schema. Retrieve posts with `getCollection()` /
  `getPublishedPosts()`. Schema failures fail the build.
- **Pages/routing** — files in `src/pages/` map to routes; diaries live under
  `/diaries/`. Single post: `diaries/[slug].astro`. Paginated archive and category
  archives use `[...page].astro` / `category/[...slug].astro`.
- **SEO helpers** — `src/utils/seo.ts` builds Person / Organization / WebSite /
  BlogPosting / FAQPage / ProfilePage / BreadcrumbList JSON-LD. Do not invent a
  parallel structured-data path in components.
- **Fonts** are self-hosted under `public/fonts/` (`fonts.css`).
- **TypeScript** extends `astro/tsconfigs/strict`.
- **Deploy** target is Cloudflare Pages (static). Redirects go in `public/_redirects`
  (Cloudflare format). Headers (incl. `llms.txt` charset) in `public/_headers`.

## Conventions (from IMPLEMENTAIONS.md §5 — follow these)

- **Bengali is the default content language.** Any sample/test post you generate must be
  in Bangla; test typography against a Bengali post first, English second. Never apply
  `hyphens: auto`, `text-transform`, `letter-spacing` tricks, or `font-variant: small-caps`
  to Bengali text. Technical terms, product names, and APIs stay in **English**.
- **Zero client-side JS** unless a task explicitly requires it — prefer CSS. No Tailwind;
  the design system is bespoke plain CSS with custom properties. FAQ `<details>` is OK.
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

## SEO, AEO, and GEO (mandatory)

These apply to **every new or edited diary** and to **any site change** that touches
pages, head meta, About/author, feeds, or crawler files. AEO = Answer Engine
Optimization; GEO = Generative Engine Optimization (citation by AI answer engines).
Not geographic SEO.

### Every diary post must include

1. **Frontmatter** (see `src/content.config.ts`):
   - `title`, `description` (≤200 chars, entity-clear: who/what/why), `pubDate`,
     `category`, `tags`, `lang` (`bn` default; English posts set `lang: en`)
   - `heroImage` + `heroImageAlt` when an image exists (path under `public/images/`, ASCII)
   - **`summaryEn`**: short English topic line (≤220 chars) for `/llms.txt` and
     global AEO — required for Bengali posts so English queries can match
   - **`keyTakeaways`**: 2–4 bullets, grounded only in claims already in the body
     (max 6, each ≤220 chars). Renders as the “মূল কথা / Key takeaways” box.
   - **`faq`**: 2–4 `{ question, answer }` pairs grounded in the body (max 8).
     Renders as FAQ UI and emits `FAQPage` JSON-LD. Answers ≤500 chars.
2. **Answer-first body**: open with a direct definition or verdict in the first
   paragraph (or immediately after a short greeting). Do not bury the answer.
3. **Tone**: keep the author’s voice. No AI-ish filler, no inventing facts that are
   not in the post or in `src/consts.ts` / About.
4. **Slug**: ASCII only under `src/content/diaries/`. Never percent-encoded Bengali URLs.
5. After editing posts, `npm run build` must pass (schema is the linter).

New posts inherit Post layout features automatically: breadcrumbs, takeaways, FAQ,
author card → `/about/`, enriched `BlogPosting` JSON-LD. Do not strip these.

### Site / page updates must preserve

- **JSON-LD graph** via `src/utils/seo.ts` + `Base.astro`: stable `@id`s
  (`#person`, `#website`, `#jouleslabs`). Posts: `BlogPosting` + `FAQPage` when FAQ
  exists. About: `ProfilePage` + Person. Archives: `BreadcrumbList`.
- **About / author entity** (`src/pages/about.astro`, `BIO` / `KNOWS_ABOUT_DISPLAY`
  in `src/consts.ts`): answer-first summary, facts list, milestones, `sameAs` socials.
  If bio facts change, update `consts.ts` and About together — never only one place.
- **`/llms.txt`** (`src/pages/llms.txt.ts`): keep working; it is generated at build
  from published posts plus Expertise, Open Source, Achievements, and Speaking &
  Media from `src/consts.ts`. Diaries include Bengali description + `summaryEn`.
  Do not delete. `public/_headers` must keep
  `Content-Type: text/plain; charset=utf-8` for `/llms.txt`.
- **`public/robots.txt`**: allow search + common AI/answer crawlers; keep Sitemap and
  the llms.txt pointer. Do not blanket-`Disallow` GPTBot / ClaudeBot / PerplexityBot
  / Google-Extended unless the owner explicitly asks.
- **Head meta** on pages using `Base.astro`: canonical, description, robots
  (`max-image-preview:large`), `rel=author` → `/about/`, OG/Twitter, `og:locale` +
  alternate. Article pages pass `article` (dates, section, tags) and breadcrumbs.
- **UI strings** for takeaways / FAQ / author card stay in `src/utils/strings.ts`.

### Do not

- Ship a diary without `keyTakeaways` and `faq` (empty defaults fail the intent —
  fill them).
- Duplicate Person/BlogPosting JSON-LD by hand in a page when `seo.ts` already covers it.
- Add client-side SEO widgets, Tailwind, or third-party “AI SEO” scripts.
- Soften or remove author attribution, About links, or `llms.txt` for convenience.

## Documentation

Full docs: https://docs.astro.build. Consult before related work:
[routing](https://docs.astro.build/en/guides/routing/) ·
[components](https://docs.astro.build/en/basics/astro-components/) ·
[framework components](https://docs.astro.build/en/guides/framework-components/) ·
[content collections](https://docs.astro.build/en/guides/content-collections/) ·
[styling](https://docs.astro.build/en/guides/styling/) ·
[i18n](https://docs.astro.build/en/guides/internationalization/)
