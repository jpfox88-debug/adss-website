// Rewrites content YAML/front matter in the style Sveltia CMS writes (single quotes only where
// needed, no line wrapping), so the first CMS save of a seed file doesn't produce a noisy diff.
// Run: node scripts/normalise-content.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { parse, stringify } from 'yaml';

const opts = { singleQuote: true, lineWidth: 0 };
for (const file of globSync('src/content/**/*.{yaml,md}')) {
  const text = readFileSync(file, 'utf8');
  let out;
  if (file.endsWith('.yaml')) {
    out = stringify(parse(text), opts);
  } else {
    const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) continue;
    out = `---\n${stringify(parse(m[1]), opts)}---\n${m[2]}`;
  }
  if (out !== text) {
    writeFileSync(file, out);
    console.log('normalised', file);
  }
}
