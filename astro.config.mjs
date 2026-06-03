// @ts-check
import { defineConfig } from 'astro/config';

// Fully static personal site. Output goes to dist/ which Vercel auto-detects.
// `site` is used to build canonical + Open Graph URLs.
export default defineConfig({
  site: 'https://evanbryceriddle.com',
});
