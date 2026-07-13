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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <!-- sheet keyline -->
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${RULE}" stroke-width="1"/>

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
