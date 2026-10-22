// Generates clearly labelled placeholder images (no fictional photos). Run: node scripts/make-placeholders.mjs
import sharp from 'sharp';
const out = 'src/assets/uploads';
const make = (file, w, h, label, top = h / 2 - 60) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><pattern id="t" width="80" height="80" patternUnits="userSpaceOnUse">
    <rect width="80" height="80" fill="#1b2a47"/><rect x="0" y="30" width="80" height="20" fill="#2a4a3a" opacity=".55"/>
    <rect x="30" y="0" width="20" height="80" fill="#2a4a3a" opacity=".55"/><rect x="0" y="39" width="80" height="2" fill="#b3263a" opacity=".7"/>
    <rect x="39" y="0" width="2" height="80" fill="#b3263a" opacity=".7"/></pattern></defs>
  <rect width="100%" height="100%" fill="url(#t)"/>
  <rect x="${w*0.08}" y="${top}" width="${w*0.84}" height="120" rx="8" fill="#faf7f0" opacity=".92"/>
  <text x="50%" y="${top+52}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(Math.min(w,h)/14)}" font-weight="700" fill="#14213d" text-anchor="middle">PLACEHOLDER</text>
  <text x="50%" y="${top+92}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(Math.min(w,h)/26)}" fill="#14213d" text-anchor="middle">${label}</text>
</svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(`${out}/${file}`);
};
await make('placeholder-hero.jpg', 1600, 900, 'Approved society event photo needed', 60);
await make('placeholder-portrait.jpg', 600, 750, 'Committee photo needed');
await make('placeholder-event.jpg', 1200, 800, 'Event image needed');
await make('placeholder-album.jpg', 1200, 800, 'Album photo needed');
