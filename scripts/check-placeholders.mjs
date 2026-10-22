// Launch gate (BRIEF §13B): fails if any built public page still shows [PLACEHOLDER] text.
// Run after a build: node scripts/check-placeholders.mjs
import { readFileSync, globSync } from 'node:fs';

let found = 0;
for (const file of globSync('dist/**/*.html')) {
  if (file.startsWith('dist/admin/')) continue;
  const html = readFileSync(file, 'utf8');
  const hits = [...html.matchAll(/<mark class="ph"[^>]*>([^<]*)<\/mark>/g)].map((m) => m[1]);
  if (hits.length) {
    found += hits.length;
    console.log(`${file.replace(/^dist/, '')}: ${[...new Set(hits)].join(', ')}`);
  }
}
if (found) {
  console.error(`\n${found} placeholder(s) still on public pages. Resolve them (see MISSING-CONTENT.md) before launch.`);
  process.exit(1);
}
console.log('No placeholder text on public pages.');
