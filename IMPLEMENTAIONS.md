# nahid.im — Rebuild Implementation Plan

> Rebuild of https://nahid.im (currently WordPress) as a static Astro site with a
> typewriter / legacy-newspaper design ("The Alien Dispatch").
> This document is the source of truth for Claude Code. Work phase by phase.
> Complete each phase's acceptance criteria before moving to the next.

---

## 0. Project Overview

**Owner:** Nahid Bin Azhar — software engineer, CTO/co-founder of JoulesLabs, Dhaka.
**Goal:** Replace WordPress with a git-based static site: write posts in Markdown,
`git push` to publish. Zero database, zero admin panel, minimal maintenance.

**Design direction (already approved — see `design/nahid-newspaper.html`):**
- Old-school broadsheet newspaper + typewriter aesthetic
- **Content is Bengali-first.** Most posts are in Bangla; the design must carry the
  old-newspaper identity in Bengali script, not just Latin. Typewriter fonts have
  no Bengali glyphs, so the Bengali register is *old letterpress Bangla daily*
  (Ittefaq / Anandabazar circa letterpress era) rather than literal typewriter.
- Fonts:
  - Latin display/UI chrome: **Special Elite** — masthead, section labels, nav
  - Latin body (English posts): **Cutive Mono**
  - Bengali body & headlines: **Noto Serif Bengali** (broad weights, excellent
    rendering) — evaluate **Tiro Bangla** and **Baloo Da 2** as alternatives;
    pick whichever reads most like old newsprint at body sizes
  - Bengali UI strings (if any): same Bengali face, small-caps effect is not
    available in Bengali — use letter-spacing + rules for hierarchy instead
- Palette: paper `#f2ece0`, ink `#1c1a17`, faded `#6b6459`, rule `#2a2722`, accent oxblood `#7a1f12`
- Furniture: folio strip, masthead, dateline bar, double rules, hairline column rules,
  drop caps (Latin only — see Phase 3 for the Bengali equivalent), justified text,
  grayscale images, labelled section heads with flanking rules
- No border-radius, no shadows (except the paper sheet edge), no gradients

**Tech stack:**
- Astro 5.x + Content Collections (type-safe frontmatter)
- TypeScript strict
- Plain CSS (no Tailwind — the design system is small and bespoke; use CSS custom properties)
- MDX integration for the occasional interactive post
- Deploy: Cloudflare Pages (static output), custom domain nahid.im
- RSS + sitemap + SEO via official Astro integrations

---

## 1. Current Site Inventory (migration source)

WordPress site at https://nahid.im. Structure discovered:

| Piece | Current state |
|---|---|
| Home | Bio, photo, subscription form, categories sidebar, socials |
| Blog archive | `/diaries` |
| Categories | `/diaries/category/{slug}` — ai, business, operation, productivity, software-development (children: laravel, php, programming, tips), whats-new (child: whats-new-in-php) |
| About | `/about` |
| Contact | `/contact` (form) |
| Images | `/wp-content/uploads/...` |
| Socials | Facebook, Twitter/X, LinkedIn, GitHub, Threads |
| Newsletter | WP subscription form plugin |

**URL preservation is mandatory:** keep `/diaries` and `/diaries/category/{slug}`
and existing post slugs so inbound links and SEO survive. Post URLs on the old site
must be verified during export (Phase 2) — match whatever pattern WP used
(likely `/{slug}` or `/diaries/{slug}`) and replicate or 301-redirect.

---

## 2. Target Site Map

```
/                          Home: title/masthead → nav → bio+photo → achievements
                           → social links → recent posts (latest 3–6) → footer
/diaries/                  All posts, newest first, paginated (10/page)
/diaries/page/2/ …         Pagination
/diaries/category/[slug]/  Category archives (incl. nested slugs)
/diaries/[slug]/           Single post (confirm against WP URLs; add redirects if different)
/about/                    About page (long-form, markdown)
/contact/                  Contact (form via provider, see Phase 6)
/rss.xml                   RSS feed
/sitemap-index.xml         Sitemap
/404                       Newspaper-styled "story not found" page
```

---

## 3. Repository Layout

```
nahid.im/
├── CLAUDE.md                  ← condensed version of this plan + conventions
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── design/
│   └── nahid-newspaper.html   ← approved static design reference (do not ship)
├── public/
│   ├── fonts/                 ← self-host Special Elite + Cutive Mono (woff2)
│   ├── images/                ← migrated wp-content uploads
│   └── favicon.svg
├── src/
│   ├── styles/
│   │   ├── tokens.css         ← :root custom properties (palette, spacing, rules)
│   │   └── global.css         ← base typography, paper texture, sheet layout
│   ├── layouts/
│   │   ├── Base.astro         ← <head>, fonts, SEO component, sheet wrapper
│   │   └── Post.astro         ← article layout: byline, drop cap, prose styles
│   ├── components/
│   │   ├── Folio.astro        ← top strip (vol/no, tagline, est.)
│   │   ├── Masthead.astro     ← kicker + THE ALIEN DISPATCH + dateline bar
│   │   ├── Nav.astro
│   │   ├── SectionHead.astro  ← label with flanking rules
│   │   ├── PostCard.astro     ← tag, headline, excerpt, meta
│   │   ├── Bio.astro
│   │   ├── Achievements.astro
│   │   ├── SocialBar.astro
│   │   ├── Newsletter.astro
│   │   ├── Pagination.astro
│   │   └── Footer.astro
│   ├── content/
│   │   └── diaries/           ← one .md/.mdx per post
│   ├── content.config.ts      ← collection schema (below)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   └── diaries/
│   │       ├── [...page].astro          ← paginated archive
│   │       ├── [slug].astro             ← single post
│   │       └── category/[...slug].astro ← category archives (handles nesting)
│   └── utils/
│       ├── categories.ts      ← category tree, labels, slugs
│       └── format.ts          ← newspaper date formatting ("Saturday, July 11, 2026")
└── scripts/
    └── migrate/               ← one-off WP export conversion scripts
```

### Content schema (`src/content.config.ts`)

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const diaries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/diaries' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      'ai', 'business', 'operation', 'productivity',
      'software-development', 'laravel', 'php', 'programming', 'tips',
      'whats-new', 'whats-new-in-php',
    ]),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['bn', 'en']).default('bn'),   // most posts are Bengali
  }),
});

export const collections = { diaries };
```

**Language handling rules:**
- `lang` defaults to `'bn'`; English posts must opt in with `lang: 'en'`.
- Set `lang` on the `<article>` element; `<html lang>` per page follows the
  dominant content (post pages: the post's lang; index/archive: `bn`).
- Font stack switches on lang: `bn` → Noto Serif Bengali body; `en` → Cutive Mono.
  Mixed content inside a Bengali post (English technical terms, names) should
  render from the Bengali face's built-in Latin so x-height stays consistent;
  code blocks always use the mono stack regardless of lang.
- **Slugs stay ASCII.** Bengali titles get transliterated or English slugs.
  The migration must preserve whatever slug WP already used per post.
  Never ship percent-encoded Bengali URLs.

---

## 4. Phases

### Phase 1 — Scaffold & design system
1. `npm create astro@latest` (empty template, TypeScript strict), add `@astrojs/mdx`,
   `@astrojs/rss`, `@astrojs/sitemap`.
2. Download Special Elite + Cutive Mono + **Noto Serif Bengali** (400/700) as
   woff2 into `public/fonts/`, write `@font-face` rules with `font-display: swap`.
   Self-hosting avoids Google Fonts requests (performance + privacy).
   **Bengali fonts are large** (full Bengali block + conjuncts): subset with
   `pyftsubset`/`glyphhanger` keeping Bengali + Basic Latin + punctuation;
   target < 120KB per weight. Preload the Bengali body weight — it renders
   most of every page.
2b. Build a Bengali type specimen page (`/dev/specimen`, excluded from prod
   build) rendering a real Bangla paragraph at body size in Noto Serif Bengali,
   Tiro Bangla and Baloo Da 2 side by side on the paper background — pick the
   winner by eye before committing. Check conjunct rendering (ক্ষ, জ্ঞ, ন্ত্র)
   and Bengali punctuation (দাঁড়ি ।) specifically.
3. Port `design/nahid-newspaper.html` styles into `tokens.css` + `global.css`.
4. Build `Base.astro` and every component in §3 as static pieces with the
   design reference open side-by-side. Match it pixel-close.
5. Homepage `index.astro` assembled in the approved order:
   Title → Menus → Bio → Achievements → Social → Recent posts → Footer.

**Acceptance:** `npm run dev` renders homepage visually equivalent to
`design/nahid-newspaper.html`, responsive at 375px / 768px / 1280px,
keyboard focus visible, `prefers-reduced-motion` respected, zero client JS.

### Phase 2 — WordPress export & migration
1. From WP admin: Tools → Export → All content → `export.xml`.
   Place at `scripts/migrate/export.xml`.
2. `npx wordpress-export-to-markdown --input scripts/migrate/export.xml
   --output src/content/diaries --post-folders false --prefix-date false --save-images attached`
   (flags may need adjusting; inspect output and iterate).
3. Write `scripts/migrate/fix-frontmatter.ts` to map WP fields → schema:
   categories to the enum slugs, excerpt → description (generate from first
   paragraph if missing). **Language detection:** if > 30% of body characters
   fall in the Bengali Unicode block (U+0980–U+09FF) → `lang: 'bn'`, else `'en'`;
   log a per-post language report for manual spot-check.
   Preserve WP slugs exactly, including transliterated Bengali slugs.
4. Move images to `public/images/`, rewrite in-post image URLs from
   `/wp-content/uploads/...` → `/images/...`.
5. Record every old post URL → new URL pair into `scripts/migrate/redirects.csv`.

**Acceptance:** every published WP post exists as a valid .md file passing the
zod schema (`npm run build` fails on schema violations — that's the check);
images render locally; redirects.csv complete.

### Phase 3 — Archive, post, category pages
1. `/diaries/[...page].astro` — paginated list using `paginate()`, 10/page,
   PostCard grid with column rules like the design.
2. `[slug].astro` — Post layout: eyebrow (category), headline (Special Elite
   for `en`, Noto Serif Bengali bold for `bn`), byline bar (date · category ·
   reading time), justified prose, grayscale images with italic captions,
   prev/next links styled as "Continued from / Continues on".
   **Bengali typography specifics:**
   - Drop caps are a Latin device; for `bn` posts replace with a bold
     oxblood **first-line** treatment (`::first-line`) or an ornamental
     opening rule — implement one, keep it subtle.
   - Justification: `text-align: justify` is fine for Bengali, but do NOT
     enable `hyphens: auto` for `bn` (Bengali hyphenation support is poor
     and word-breaking mid-conjunct looks broken). Use `word-break: normal`
     and slightly looser `line-height` (1.9–2.0 for Bengali vs 1.7 Latin —
     Bengali script has taller stacked conjuncts and needs the air).
   - Font-size bump: Bengali at the same px reads smaller; set `bn` body
     ~1.06–1.1× the Latin body size.
   - Byline/meta for `bn` posts in Bengali: "লিখেছেন নাহিদ বিন আজহার",
     dates in Bengali format (see Phase 3 item 4b).
3. Category pages: build the nested tree in `utils/categories.ts`
   (software-development → laravel/php/programming/tips, etc.). Parent category
   pages include child-category posts.
4. Reading time: compute at build. For `bn`, split on whitespace after
   stripping markdown — Bengali words are whitespace-delimited so word count
   works; use ~180 wpm for Bengali vs ~220 for English. Label per lang:
   "৫ মিনিট" / "5 min".
4b. Dates: `utils/format.ts` gets two formatters. English:
   "Saturday, July 11, 2026". Bengali: "শনিবার, ১১ জুলাই ২০২৬" — use
   `Intl.DateTimeFormat('bn-BD', ...)` which handles Bengali numerals and
   month names natively (no manual mapping). Decide once whether the sitewide
   dateline bar is Bengali or English and keep it consistent; per-post
   bylines follow the post's lang.
5. 404 page: "STORY NOT FOUND — the correspondent has no dispatch at this address."

**Acceptance:** all migrated posts render; category counts match WP;
prev/next navigation correct; a Bengali post and an English post reviewed
side by side — correct fonts, line-height, no broken conjuncts, Bengali
dates/reading-time labels, no `hyphens` applied to Bengali text.

### Phase 4 — SEO, feeds, redirects
1. `<SEO>` partial in Base.astro: canonical, OG tags (og:image from heroImage
   or a default masthead card), twitter card, article meta on posts.
2. `rss.xml.ts` with full-content feed — set per-item `language` and channel
   default `bn`; `@astrojs/sitemap` config. (One feed for both languages is
   fine; optionally add a filtered `/rss-en.xml` later.)
2b. Per-post `og:locale` (`bn_BD` / `en_US`) and correct `<html lang>` —
   this matters for Bengali-language search ranking.
3. Generate `public/_redirects` (Cloudflare Pages format) from redirects.csv —
   301s for any URL that changed, plus `/feed → /rss.xml` (WP feed URL).
4. JSON-LD: `BlogPosting` on posts, `Person` on home/about.

**Acceptance:** `npm run build` clean; validate one post URL in an OG debugger;
every row of redirects.csv covered.

### Phase 5 — Deploy
1. Push repo to GitHub. Create Cloudflare Pages project, connect repo,
   build command `npm run build`, output `dist/`.
2. Verify preview deploy fully, then point nahid.im DNS to Pages.
   Keep WP host alive (paused) for ~2 weeks as rollback.
3. Post-cutover: crawl old sitemap URLs against the new site (script it:
   fetch each, assert 200 or 301→200).

**Acceptance:** nahid.im serves the new site over HTTPS; old URLs resolve;
Lighthouse ≥ 95 across the board (static + no JS should make this easy).

### Phase 6 — Dynamic bits (forms), kept minimal
- **Newsletter:** replace WP plugin with Buttondown or Listmonk (self-hosted on
  your existing infra if preferred). Simple POST form, styled as a
  "SUBSCRIBE TO THE DISPATCH" coupon box with dashed border.
- **Contact:** Formspree / Cloudflare Pages Functions endpoint (a single
  function is fine; the rest of the site stays static). Honeypot field, no captcha.
- **Comments (optional):** Giscus (GitHub Discussions) — fits the git-based
  workflow, zero database. Style the container minimally; skip if not wanted.

**Acceptance:** subscribe + contact submissions verified end-to-end.

### Phase 7 — Authoring workflow
1. `npm run new -- "Post Title"` script: scaffolds a .md with today's date,
   slugified filename, frontmatter template.
2. `CLAUDE.md` in repo root documenting: schema fields, category slugs,
   image conventions, "drafts have `draft: true` and are excluded from builds",
   deploy = merge to main.
3. Optional later: TinaCMS on top of the same Markdown files if visual
   editing is ever wanted. Do not build this now.

---

## 5. Conventions for Claude Code

- Zero client-side JS unless a task explicitly requires it; prefer CSS.
- All colors/spacing via custom properties in `tokens.css` — never hardcode hex in components.
- Newspaper date format everywhere: `Saturday, July 11, 2026` (see `utils/format.ts`).
- Images: grayscale via CSS filter (keep originals in color), 1px ink border, italic caption.
- Commits: conventional (`feat:`, `fix:`, `content:`, `chore:`); one phase = one PR.
- After any layout change, check 375px width first — the broadsheet look degrades
  to single column and every rule/border must still make sense.
- **Bengali is the default content language.** When generating any sample/test
  post, write it in Bangla. When touching typography, test against a Bengali
  post first, English second. Never apply `hyphens: auto`, `text-transform`,
  `letter-spacing` tricks, or `font-variant: small-caps` to Bengali text.
- Bengali UI copy lives in one place (`utils/strings.ts`), not scattered in
  components — makes the bn/en label pairs auditable.
- Run `npm run build` before every commit; the content schema is the content linter.

## 6. Suggested Claude Code kickoff prompts

```
Phase 1: "Read CLAUDE.md and design/nahid-newspaper.html. Scaffold the Astro
project per §3 and implement the design system and homepage per Phase 1.
Stop when acceptance criteria are met and show me a diff summary."

Phase 2: "export.xml is in scripts/migrate/. Run the migration per Phase 2,
show me 3 sample converted posts for review before converting the rest."
```

---

## 7. Out of scope (explicitly)

- No admin dashboard, no database, no user accounts
- No dark mode in v1 (paper is the identity; revisit later if desired)
- No search in v1 (add Pagefind later if the archive grows — verify its Bengali
  word segmentation when you do; whitespace-delimited Bangla generally works)
- No analytics in v1 (consider Cloudflare Web Analytics later — no cookies)

