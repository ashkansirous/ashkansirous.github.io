// One-off generator for the 1200x630 Open Graph image -> public/og.png
// Run: node scripts/make-og.mjs  (regenerate when the headshot or copy changes)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;
const NAVY = '#102a43';
const CLAY = '#de5b3b';
const BAND_SUB = '#afc4da';
const PHOTO = 360;
const PHOTO_X = W - PHOTO - 80;
const PHOTO_Y = (H - PHOTO) / 2;

const display = 'Space Grotesk, Arial, Helvetica, sans-serif';
const mono = "'IBM Plex Mono', Consolas, monospace";

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="80%" cy="10%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.07" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${NAVY}" />
  <rect width="${W}" height="${H}" fill="url(#glow)" />

  <text x="80" y="170" font-family="${mono}" font-size="24" letter-spacing="5"
        fill="${CLAY}" font-weight="500">STAFF SOFTWARE ENGINEER</text>

  <text x="78" y="280" font-family="${display}" font-size="92" font-weight="700"
        fill="#ffffff">Ashkan Sirous</text>

  <rect x="82" y="312" width="64" height="4" rx="2" fill="${CLAY}" />

  <text x="80" y="372" font-family="${display}" font-size="34" font-weight="500"
        fill="${BAND_SUB}">C#/.NET · Azure · Kubernetes · Enterprise AI</text>

  <text x="80" y="560" font-family="${mono}" font-size="26" letter-spacing="1"
        fill="${BAND_SUB}">ashkan.sirous.uk</text>

  <circle cx="${PHOTO_X + PHOTO / 2}" cy="${PHOTO_Y + PHOTO / 2}" r="${PHOTO / 2 + 8}"
          fill="none" stroke="${CLAY}" stroke-width="2" opacity="0.6" />
</svg>`);

const circleMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}" fill="#fff"/></svg>`,
);

const photo = await sharp(join(root, 'public', 'ashkan.jpg'))
  .resize(PHOTO, PHOTO, { fit: 'cover' })
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(background)
  .composite([{ input: photo, left: PHOTO_X, top: Math.round(PHOTO_Y) }])
  .png()
  .toFile(join(root, 'public', 'og.png'));

console.log('Wrote public/og.png (1200x630)');
