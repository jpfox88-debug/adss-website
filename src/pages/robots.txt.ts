import type { APIRoute } from 'astro';

// Until launch (SITE_LAUNCHED=true in Netlify), ask search engines not to index the
// placeholder site. After launch, allow everything except the CMS.
export const GET: APIRoute = ({ site }) => {
  const launched = process.env.SITE_LAUNCHED === 'true';
  const body = launched
    ? `User-agent: *\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
    : `# Pre-launch: the site still contains placeholder content.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
