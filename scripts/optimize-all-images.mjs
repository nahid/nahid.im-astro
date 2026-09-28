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
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    const originalSize = stat.size;
    try {
      const image = sharp(filePath);
      const meta = await image.metadata();

      let pipeline = sharp(filePath);

      // Scale down if wider than 1200px (except portrait / avatar if custom)
      if (file === 'nahid-bin-azhar.png') {
        pipeline = pipeline.resize(340, 340, { fit: 'cover' });
      } else if (meta.width && meta.width > 1200) {
        pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
      }

      let buffer;
      if (ext === '.png') {
        buffer = await pipeline.png({ quality: 80, palette: true, compressionLevel: 9 }).toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        buffer = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      } else if (ext === '.webp') {
        buffer = await pipeline.webp({ quality: 82 }).toBuffer();
      }

      if (buffer && buffer.length < originalSize) {
        fs.writeFileSync(filePath, buffer);
        console.log(`Optimized ${filePath}: ${(originalSize / 1024).toFixed(1)}KB -> ${(buffer.length / 1024).toFixed(1)}KB`);
      } else {
        console.log(`Kept ${filePath}: ${(originalSize / 1024).toFixed(1)}KB`);
      }
    } catch (err) {
      console.error(`Failed to process ${filePath}:`, err);
    }
  }
}

for (const dir of DIRS) {
  await processDir(dir);
}
console.log('Image optimization complete.');
