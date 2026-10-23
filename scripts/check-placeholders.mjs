// Launch gate (BRIEF §13B). Run after the launch build (npm run build:launch); a preview build fails it by design.
// Fails if the built public site still contains any of:
//   - placeholder text: highlighted [PLACEHOLDER] marks, or [SQUARE BRACKET] text anywhere in a page,
//     including alt text, titles and meta tags;
//   - demonstration or test entries: pages or files whose path contains "placeholder" or "test";
//   - preview-only content: elements marked data-preview-only, deploy-preview links, noindex tags;
//   - missing launch essentials: no committee members, or no current constitution.
import { readFileSync, globSync } from 'node:fs';

const problems = [];
const report = (file, what, items) => {
  if (items.length) problems.push(`${file.replace(/^dist/, '')}: ${what}: ${[...new Set(items)].join(', ')}`);
};

const isPublic = (f) => !f.startsWith('dist/admin/');
const demoPath = /placeholder|(^|[-_/])test([-_./]|$)/i;

for (const file of globSync('dist/**/*').filter(isPublic)) {
  if (demoPath.test(file.replace(/^dist\//, ''))) report(file, 'demonstration or test file', [file.split('/').pop()]);
}

for (const file of globSync('dist/**/*.html').filter(isPublic)) {
  const html = readFileSync(file, 'utf8');
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

  report(file, 'placeholder text', [...text.matchAll(/<mark class="ph"[^>]*>([^<]*)<\/mark>/g)].map((m) => m[1]));
  const unmarked = text.replace(/<mark class="ph"[^>]*>[^<]*<\/mark>/g, '');
  report(file, 'bracketed text', [...unmarked.matchAll(/\[[A-Z][^\]<>"]{2,}\]/g)].map((m) => m[0]));
  report(file, 'link to a demonstration entry', [...text.matchAll(/href="([^"]*placeholder[^"]*)"/gi)].map((m) => m[1]));
  report(file, 'preview-only content', text.includes('data-preview-only') ? ['data-preview-only element'] : []);
  report(file, 'deploy-preview link', [...text.matchAll(/https?:\/\/[^"'\s]*(deploy-preview|--adss-website)[^"'\s]*/g)].map((m) => m[0]));
  report(file, 'noindex tag (set SITE_LAUNCHED=true)', /<meta name="robots" content="[^"]*noindex/.test(text) && !file.endsWith('404.html') ? ['robots noindex'] : []);
}

// At launch every absolute address (canonical, share image, sitemap, robots) must use the Society's domain.
for (const file of globSync('dist/{**/*.html,sitemap-*.xml,robots.txt}').filter(isPublic)) {
  report(file, 'hosting address instead of the Society domain (set SITE_URL)', readFileSync(file, 'utf8').match(/https?:\/\/[^"'\s<]*(netlify\.app|pages\.dev)[^"'\s<]*/g) ?? []);
}

// Launch essentials that must be present, not merely free of placeholders.
const page = (p) => {
  try {
    return readFileSync(`dist/${p}`, 'utf8');
  } catch {
    return '';
  }
};
if (!page('committee/index.html').includes('class="person"')) problems.push('/committee/: no committee members published');
if (!/aria-labelledby="constitution"[\s\S]*?Current version/.test(page('downloads/index.html'))) {
  problems.push('/downloads/: no current constitution published');
}

if (problems.length) {
  console.log(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) on public pages. Resolve them (see MISSING-CONTENT.md) before launch.`);
  process.exit(1);
}
console.log('Launch gate passed: no placeholder text, demonstration entries, test files or preview-only content.');
