// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fully static personal site. Output goes to dist/ which Vercel auto-detects.
// `site` builds canonical + Open Graph URLs and the sitemap.
export default defineConfig({
  site: 'https://evanbryceriddle.com',
  integrations: [sitemap()],
});
