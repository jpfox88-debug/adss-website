// Launch build only: removes the files that belong to the demonstration entries left out by
// EXCLUDE_PLACEHOLDERS (the placeholder PDF in public/documents and the placeholder album image),
// so they are not published even though nothing links to them.
import { globSync, rmSync } from 'node:fs';

for (const file of globSync('dist/{documents,_astro}/placeholder-*')) {
  rmSync(file);
  console.log(`Removed demonstration file ${file.replace(/^dist/, '')}`);
}
