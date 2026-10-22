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
// Hero: a dark, photo-like placeholder so text-over-photo layouts can be judged. Abstract only.
{
  const w = 2400, h = 1350;
  const glows = [[0.18, 0.35, 260, '#c9a35a', 0.35], [0.72, 0.3, 340, '#e8d9b0', 0.22], [0.55, 0.62, 220, '#b3263a', 0.18], [0.85, 0.7, 300, '#2f5d4a', 0.3], [0.35, 0.75, 380, '#3d5a8a', 0.35]]
    .map(([x, y, r, c, o]) => `<circle cx="${x * w}" cy="${y * h}" r="${r}" fill="${c}" opacity="${o}" filter="url(#b)"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><filter id="b" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="90"/></filter>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b2a4a"/><stop offset="1" stop-color="#0b1222"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>${glows}
  <rect x="${w - 760}" y="60" width="700" height="96" rx="6" fill="#faf7f0" opacity=".9"/>
  <text x="${w - 410}" y="104" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#14213d" text-anchor="middle">PLACEHOLDER</text>
  <text x="${w - 410}" y="140" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#14213d" text-anchor="middle">Approved society event photo needed</text></svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`${out}/placeholder-hero.jpg`);
}
await make('placeholder-portrait.jpg', 600, 750, 'Committee photo needed');
await make('placeholder-event.jpg', 1200, 800, 'Event image needed');
await make('placeholder-album.jpg', 1200, 800, 'Album photo needed');
