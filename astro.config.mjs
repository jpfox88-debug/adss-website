// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL is set in Netlify once the production domain is known.
export default defineConfig({
  site: process.env.SITE_URL || process.env.URL || 'https://adss-website.netlify.app',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
