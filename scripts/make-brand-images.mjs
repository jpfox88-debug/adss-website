// Social share image, favicon and apple-touch-icon from the Society's logo.
// Run after scripts/make-logos.mjs: node scripts/make-brand-images.mjs
import sharp from 'sharp';
const brand = 'src/assets/brand';
const CREAM = '#F5F0E8';

// Share image: the arched logo on cream with a navy rule along the bottom.
const arched = await sharp(`${brand}/logo-arched.png`).resize({ height: 500 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: CREAM } })
  .composite([
    { input: arched, gravity: 'centre' },
    { input: { create: { width: 1200, height: 14, channels: 3, background: '#14213d' } }, left: 0, top: 616 },
  ])
  .jpeg({ quality: 88 })
  .toFile('public/og-default.jpg');

// Icons: the thistle alone, centred with a little breathing room.
const icon = async (size, file, bg) => {
  const pad = Math.round(size * 0.08);
  const mark = await sharp(`${brand}/logo-thistle.png`).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png()
    .toFile(file);
};
await icon(64, 'public/favicon.png', { r: 0, g: 0, b: 0, alpha: 0 });
await icon(180, 'public/apple-touch-icon.png', CREAM);
console.log('ok');
