import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIRS = ['public/images', 'src/content/diaries/images'];

async function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const baseName = path.basename(file, ext);
    const webpPath = path.join(dir, `${baseName}.webp`);

    try {
      let pipeline = sharp(filePath);
      const meta = await pipeline.metadata();

      // For bio photo, 340x340 max
      if (file === 'nahid-bin-azhar.png') {
        pipeline = pipeline.resize(340, 340, { fit: 'cover' });
      } else if (meta.width && meta.width > 864) {
        // Post content max width is 50rem (800px)
        pipeline = pipeline.resize({ width: 864, withoutEnlargement: true });
      }

      const buffer = await pipeline.webp({ quality: 80, effort: 6 }).toBuffer();
      fs.writeFileSync(webpPath, buffer);
      console.log(`Converted ${filePath} (${(stat.size / 1024).toFixed(1)}KB) -> ${webpPath} (${(buffer.length / 1024).toFixed(1)}KB)`);
    } catch (err) {
      console.error(`Error converting ${filePath}:`, err);
    }
  }
}

for (const dir of DIRS) {
  await processDir(dir);
}
console.log('WebP conversion finished.');
