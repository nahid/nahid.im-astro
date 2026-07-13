// Generates the favicon set in public/ from scripts/favicon-source.png.
// Run with `npm run favicons` after replacing the source portrait.
//
// The source is committed alongside this script so the set can be rebuilt
// offline — nothing here reaches out to the old WordPress media library.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'scripts/favicon-source.png';
const PAPER = { r: 242, g: 236, b: 224 }; // --paper

// Flattened onto paper rather than left transparent: the portrait has alpha at
// the edges, and a transparent favicon turns into a smear on a dark tab strip.
const render = (size) =>
	sharp(SRC).resize(size, size, { fit: 'cover' }).flatten({ background: PAPER }).png().toBuffer();

/** ICO wrapping a single PNG. The format has allowed PNG payloads since Vista,
 *  which is why we can hand-roll the 22-byte header instead of pulling a dep. */
function ico(png, size) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(1, 4); // image count

	const entry = Buffer.alloc(16);
	entry.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
	entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
	entry.writeUInt8(0, 2); // palette size
	entry.writeUInt8(0, 3); // reserved
	entry.writeUInt16LE(1, 4); // colour planes
	entry.writeUInt16LE(32, 6); // bits per pixel
	entry.writeUInt32LE(png.length, 8); // payload size
	entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

	return Buffer.concat([header, entry, png]);
}

const outputs = [
	['public/favicon-32.png', 32],
	['public/favicon-192.png', 192],
	['public/favicon-512.png', 512],
	// iOS ignores transparency and composites onto black, so this one must be flat.
	['public/apple-touch-icon.png', 180],
];

for (const [path, size] of outputs) {
	await sharp(await render(size)).toFile(path);
	console.log(`wrote ${path} (${size}×${size})`);
}

const png32 = await render(32);
await writeFile('public/favicon.ico', ico(png32, 32));
console.log('wrote public/favicon.ico (32×32)');
