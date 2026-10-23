// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypePlaceholders from './src/lib/rehype-placeholders.mjs';

// SITE_URL is set in Cloudflare Pages (production environment) once the Society domain is live.
export default defineConfig({
  site: process.env.SITE_URL || 'https://adss-website.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin/') })],
  markdown: { rehypePlugins: [rehypePlaceholders] },
});
