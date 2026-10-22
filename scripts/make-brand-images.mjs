// Generates the default social share image and favicon from the society logo.
// Run: node scripts/make-brand-images.mjs
import sharp from 'sharp';
const logo = 'src/assets/brand/adss-logo.png';
const tartan = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<defs><pattern id="t" width="46" height="46" patternUnits="userSpaceOnUse">
<rect width="46" height="46" fill="#14213d"/>
<rect x="0" y="0" width="46" height="12" fill="#2f5d4a" opacity=".75"/><rect x="0" y="34" width="46" height="12" fill="#2f5d4a" opacity=".75"/>
<rect x="0" y="0" width="12" height="46" fill="#2f5d4a" opacity=".75"/><rect x="34" y="0" width="12" height="46" fill="#2f5d4a" opacity=".75"/>
<rect x="0" y="22" width="46" height="2" fill="#b3263a" opacity=".85"/><rect x="22" y="0" width="2" height="46" fill="#b3263a" opacity=".85"/>
</pattern></defs><rect width="100%" height="100%" fill="url(#t)"/>
<rect x="${w * 0.08}" y="${h * 0.14}" width="${w * 0.84}" height="${h * 0.72}" rx="6" fill="#faf8f3"/></svg>`;

const card = await sharp(Buffer.from(tartan(1200, 630))).png().toBuffer();
const logoSized = await sharp(logo).resize({ height: 300 }).toBuffer();
const meta = await sharp(logoSized).metadata();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="300">
<text x="0" y="120" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#14213d">Scottish Society</text>
<text x="0" y="190" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#14213d">Abu Dhabi</text></svg>`);
await sharp(card)
  .composite([
    { input: logoSized, left: 140, top: 165 },
    { input: text, left: 160 + meta.width, top: 165 },
  ])
  .jpeg({ quality: 85 })
  .toFile('public/og-default.jpg');

await sharp(logo).resize(64, 64, { fit: 'contain', background: '#faf8f3' }).png().toFile('public/favicon.png');
console.log('ok');
