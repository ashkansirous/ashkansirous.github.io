// Downscale recommender avatars to a sane retina size for ~40px circles.
// Run: node scripts/resize-avatars.mjs
import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '..', 'public', 'images', 'recommendations');
const SIZE = 96;

for (const file of await readdir(dir)) {
  if (!/\.jpe?g$/i.test(file)) continue;
  const path = join(dir, file);
  const input = await readFile(path);
  const out = await sharp(input)
    .resize(SIZE, SIZE, { fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(path, out);
  console.log(`${file}: ${out.length} bytes @ ${SIZE}x${SIZE}`);
}
