// Generates public/images/og-default.png — the 1200×630 social card every page
// falls back to. Run with `npm run og` after changing the masthead or palette.
//
// The card is drawn as SVG and rasterized with sharp. It deliberately uses a
// system monospace (not the site's Special Elite woff2) because sharp rasterizes
// SVG text through fontconfig, which cannot load a woff2 — the typewriter feel
// carries fine, and this keeps the script dependency-free.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const W = 1200;
const H = 630;

const PAPER = '#f2ece0';
const INK = '#1c1a17';
const FADED = '#6b6459';
const RULE = '#948a7a';
const ACCENT = '#7a1f12';

const MONO = 'DejaVu Sans Mono, Courier New, monospace';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The house saucer (same drawing as src/components/Ufo.astro). It is repeated
// here rather than imported because this script rasterizes standalone SVG through
// sharp — there is no DOM, and `currentColor` has nothing to inherit from, so the
// strokes take an explicit palette value.
const ufo = (x, y, scale, stroke, opacity) => `
  <g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${stroke}"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">
    <path d="M150 108 L96 226"/>
    <path d="M250 108 L304 226"/>
    <path d="M132 148 L268 148" stroke-dasharray="7 9" stroke-width="1.5"/>
    <path d="M116 187 L284 187" stroke-dasharray="7 9" stroke-width="1.5"/>
    <ellipse cx="200" cy="104" rx="112" ry="26"/>
    <path d="M96 96 Q200 46 304 96"/>
    <path d="M120 88 L128 74" stroke-width="1.5"/>
    <path d="M150 79 L156 65" stroke-width="1.5"/>
    <path d="M244 65 L250 79" stroke-width="1.5"/>
    <path d="M272 74 L280 88" stroke-width="1.5"/>
    <path d="M158 74 Q200 20 242 74"/>
    <path d="M176 70 Q200 40 200 34" stroke-width="1.5"/>
    <circle cx="152" cy="106" r="7"/>
    <circle cx="200" cy="110" r="7"/>
    <circle cx="248" cy="106" r="7"/>
    <path d="M46 54 L46 70 M38 62 L54 62" stroke-width="1.5"/>
    <path d="M352 36 L352 50 M345 43 L359 43" stroke-width="1.5"/>
    <path d="M330 150 L330 162 M324 156 L336 156" stroke-width="1.5"/>
    <path d="M64 158 L64 170 M58 164 L70 164" stroke-width="1.5"/>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <!-- sheet keyline -->
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${RULE}" stroke-width="1"/>

  <!-- House ornament, bleeding off the right margin as it does in the masthead.
       Drawn before the type so the text always sits on top of it. -->
  ${ufo(840, 300, 1.25, INK, 0.1)}

  <!-- folio strip -->
  <text x="60" y="86" font-family="${MONO}" font-size="18" letter-spacing="3" fill="${FADED}">VOL. 38 · NO. 2026</text>
  <text x="${W / 2}" y="86" text-anchor="middle" font-family="${MONO}" font-size="18" letter-spacing="3" fill="${FADED}">THE ALIEN DISPATCH</text>
  <text x="${W - 60}" y="86" text-anchor="end" font-family="${MONO}" font-size="18" letter-spacing="3" fill="${FADED}">EST. 1988</text>
  <line x1="60" y1="106" x2="${W - 60}" y2="106" stroke="${RULE}" stroke-width="1"/>

  <!-- kicker -->
  <text x="${W / 2}" y="176" text-anchor="middle" font-family="${MONO}" font-size="20" letter-spacing="8" fill="${FADED}">MULTIVERSE EDITION</text>

  <!-- nameplate -->
  <text x="${W / 2}" y="286" text-anchor="middle" font-family="${MONO}" font-size="82" font-weight="bold" letter-spacing="2" fill="${INK}">${esc('NAHID | THE ALIEN')}</text>

  <!-- double rule under the nameplate -->
  <line x1="60" y1="330" x2="${W - 60}" y2="330" stroke="${RULE}" stroke-width="2"/>
  <line x1="60" y1="337" x2="${W - 60}" y2="337" stroke="${RULE}" stroke-width="1"/>

  <!-- standfirst -->
  <text x="${W / 2}" y="404" text-anchor="middle" font-family="${MONO}" font-size="27" fill="${INK}">Dispatches on software, business, and the</text>
  <text x="${W / 2}" y="444" text-anchor="middle" font-family="${MONO}" font-size="27" fill="${INK}">occasional experiment.</text>

  <!-- byline -->
  <text x="${W / 2}" y="516" text-anchor="middle" font-family="${MONO}" font-size="22" letter-spacing="4" fill="${ACCENT}">NAHID BIN AZHAR</text>
  <line x1="440" y1="540" x2="760" y2="540" stroke="${RULE}" stroke-width="1"/>
  <text x="${W / 2}" y="574" text-anchor="middle" font-family="${MONO}" font-size="19" letter-spacing="2" fill="${FADED}">DHAKA, BANGLADESH · NAHID.IM</text>
</svg>`;

const out = 'public/images/og-default.png';
await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out} (${W}×${H})`);
