// Generates clearly labelled placeholder images (no fictional photos): abstract, out-of-focus
// "photo-like" fields so layouts can be judged, each with a visible PLACEHOLDER label.
// Run: node scripts/make-placeholders.mjs
import sharp from 'sharp';
const out = 'src/assets/uploads';

const make = async (file, w, h, label, glows, base = ['#1b2a4a', '#0b1222']) => {
  const blur = Math.round(Math.min(w, h) / 15);
  const circles = glows
    .map(([x, y, r, c, o]) => `<circle cx="${x * w}" cy="${y * h}" r="${r * Math.min(w, h)}" fill="${c}" opacity="${o}" filter="url(#b)"/>`)
    .join('');
  const fs = Math.round(Math.min(w, h) / 28);
  const bw = fs * 15, bh = fs * 3.2, bx = w - bw - fs * 1.5, by = h - bh - fs * 1.5;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><filter id="b" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${blur}"/></filter>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${base[0]}"/><stop offset="1" stop-color="${base[1]}"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>${circles}
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${fs / 4}" fill="#faf7f0" opacity=".9"/>
  <text x="${bx + bw / 2}" y="${by + fs * 1.35}" font-family="Helvetica, Arial, sans-serif" font-size="${fs}" font-weight="700" fill="#14213d" text-anchor="middle">PLACEHOLDER</text>
  <text x="${bx + bw / 2}" y="${by + fs * 2.5}" font-family="Helvetica, Arial, sans-serif" font-size="${fs * 0.75}" fill="#14213d" text-anchor="middle">${label}</text></svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`${out}/${file}`);
};

// Only the album placeholder remains: decorative photography is now real Scottish stock
// (src/assets/stock), and committee members without photos get initial tiles.
await make('placeholder-album.jpg', 1200, 800, 'Society event photo needed', [[0.25, 0.3, 0.3, '#e8d9b0', 0.3], [0.7, 0.4, 0.28, '#2f5d4a', 0.45], [0.45, 0.8, 0.3, '#c9a35a', 0.3]], ['#22314f', '#101a30']);
console.log('ok');
