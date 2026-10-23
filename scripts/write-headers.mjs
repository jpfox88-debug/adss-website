// Runs after `astro build`. Until launch (SITE_LAUNCHED=true in the Cloudflare Pages
// production environment), every response carries "X-Robots-Tag: noindex", alongside the
// noindex meta tag and the Disallow-all robots.txt.
import { appendFileSync, existsSync } from 'node:fs';

if (!existsSync('dist/_headers')) throw new Error('dist/_headers is missing: public/_headers was not copied.');
if (process.env.SITE_LAUNCHED !== 'true') {
  appendFileSync('dist/_headers', '\n# Pre-launch (added by scripts/write-headers.mjs)\n/*\n  X-Robots-Tag: noindex\n');
  console.log('Pre-launch: added X-Robots-Tag: noindex to dist/_headers');
}
