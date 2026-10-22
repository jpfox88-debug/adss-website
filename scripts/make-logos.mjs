// Builds the website logo files from the Society's supplied JPEGs (src/assets/brand/*-source.jpg):
//  - logo-<variant>.png           white background removed (colour-to-alpha), trimmed
//  - logo-<variant>-reversed.png  for navy backgrounds: black → cream #F5F0E8, blue → sky #7FB2FF,
//                                 green and red unchanged
//  - logo-thistle(.png|-reversed.png)  the thistle alone, cropped from the stacked logo
// Run: node scripts/make-logos.mjs
import sharp from 'sharp';

const dir = 'src/assets/brand';
const CREAM = [0xf5, 0xf0, 0xe8];
const SKY = [0x7f, 0xb2, 0xff];

/** GIMP-style colour-to-alpha against white, then un-premultiply. */
function whiteToAlpha(data) {
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    let a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (a < 0.08) a = 0; // JPEG noise on the white background
    if (a > 0) {
      data[i] = Math.round(255 - (255 - r) / a);
      data[i + 1] = Math.round(255 - (255 - g) / a);
      data[i + 2] = Math.round(255 - (255 - b) / a);
    }
    data[i + 3] = Math.round(a * 255);
  }
}

function reverse(data) {
  for (let i = 0; i < data.length; i += 4) {
    if (!data[i + 3]) continue;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const isDark = max < 120 && max - min < 60;
    const isBlue = b > 120 && b - r > 50 && b - g > 30;
    const to = isDark ? CREAM : isBlue ? SKY : null;
    if (to) [data[i], data[i + 1], data[i + 2]] = to;
  }
}

async function build(src, out, { crop } = {}) {
  let img = sharp(`${dir}/${src}`).ensureAlpha();
  if (crop) img = img.extract(crop);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  whiteToAlpha(data);
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  const normal = await sharp(Buffer.from(data), raw).png().toBuffer();
  await sharp(normal).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(`${dir}/${out}.png`);
  reverse(data);
  const rev = await sharp(Buffer.from(data), raw).png().toBuffer();
  await sharp(rev).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(`${dir}/${out}-reversed.png`);
}

await build('logo-arched-source.jpg', 'logo-arched');
await build('logo-stacked-source.jpg', 'logo-stacked');
await build('logo-horizontal-source.jpg', 'logo-horizontal');
// Thistle only: the stacked logo above its line of lettering.
await build('logo-stacked-source.jpg', 'logo-thistle', { crop: { left: 380, top: 0, width: 840, height: 625 } });
console.log('ok');
