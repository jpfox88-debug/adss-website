// Runs after `astro build`. Until launch (SITE_LAUNCHED=true in the Cloudflare Pages
// production environment), every response carries "X-Robots-Tag: noindex", alongside the
// noindex meta tag and the Disallow-all robots.txt.
// Cloudflare applies only one rule per identical path, so the header is added inside the existing
// "/*" rule rather than as a second "/*" rule.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const file = 'dist/_headers';
if (!existsSync(file)) throw new Error('dist/_headers is missing: public/_headers was not copied.');
if (process.env.SITE_LAUNCHED !== 'true') {
  const headers = readFileSync(file, 'utf8');
  if (!/^\/\*$/m.test(headers)) throw new Error('dist/_headers has no "/*" rule to add noindex to.');
  writeFileSync(file, headers.replace(/^\/\*$/m, '/*\n  X-Robots-Tag: noindex'));
  console.log('Pre-launch: added X-Robots-Tag: noindex to the /* rule in dist/_headers');
}
