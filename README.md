# Evan Bryce Riddle — personal site

A fast, static personal homepage built with [Astro](https://astro.build/). One
scrolling page: hero, about, what I'm building, the book, free playbooks, latest
YouTube videos, and a newsletter signup.

- **Warm, editorial design** — cream background, warm ink, a single gold accent,
  Lora serif headlines + Inter body.
- **No backend, no database, no CMS.** Everything is static and deploys anywhere.
- **Latest videos pull in automatically** from the YouTube channel feed at build
  time, using a click-to-load "facade" so the page stays fast and plays still
  count as real views.

---

## ✏️ Editing your content (start here)

**Almost everything you'll want to change lives in one file:**

> [`src/content/site.ts`](src/content/site.ts)

Open it and edit the text between the `back-ticks`. It's organised top-to-bottom
in the same order as the page (hero → about → building → book → resources →
videos → newsletter → footer). Tips:

- To _italicise_ a word in a heading, wrap it in asterisks: `who want *freedom*`.
- Search the file for **`FILL`** to find the three things to paste in once your
  email provider (Kit or Beehiiv) is ready:
  1. `newsletter.embed` — your newsletter form embed code.
  2. The Hiring Playbook `formUrl`.
  3. The Lead Gen Playbook `formUrl`.

  Until those are filled in, the site shows tidy **"Coming soon"** placeholders —
  so you can launch first and wire up forms later.

### Swapping images

| What | Where | Notes |
| --- | --- | --- |
| Book cover | `src/assets/book-cover.jpg` | Optimised automatically at build. |
| Social share image | `public/og-image.jpg` | 1200×630. The preview when shared on social. |
| Favicon | `public/favicon.svg` | The little browser-tab icon. |
| Headshot (optional) | add `public/headshot.jpg` | Then ask to place it in the hero/about. |

### The videos section

In `src/content/site.ts`, under `videos`:

- `mode: 'rss'` (default) pulls your **newest uploads automatically** every time
  the site is rebuilt. If the feed is ever unreachable, it quietly falls back to
  the `fallbackIds` list, so the section never breaks.
- `mode: 'manual'` always shows exactly the videos in `fallbackIds`.
- `count` controls how many show (3–6 looks best).
- `channelId` / `channelUrl` are already set to the channel.

---

## 🧑‍💻 Running it locally

You'll need [Node.js](https://nodejs.org/) version **20 or newer**.

```bash
npm install      # one-time: install dependencies
npm run dev      # start a local preview at http://localhost:4321
```

Leave `npm run dev` running and edit files — the browser refreshes automatically.
Press `Ctrl+C` to stop.

### Build & preview the production site

```bash
npm run build    # outputs the finished static site to dist/
npm run preview  # serve the built dist/ locally to check it
```

### Tests

The only real logic is parsing the YouTube feed, which is covered by tests:

```bash
npm test
```

---

## 🚀 Deploying to Vercel

The site is set up to deploy to [Vercel](https://vercel.com/) straight from
GitHub — every push auto-publishes.

1. Push this project to a GitHub repository (a one-time setup step; ask Claude
   Code to walk you through it if you're new to GitHub).
2. In Vercel, click **Add New → Project** and import that GitHub repo.
3. Vercel auto-detects Astro. The defaults are already correct:
   - **Build command:** `astro build` (or `npm run build`)
   - **Output directory:** `dist`
4. Click **Deploy**. Done — you'll get a live URL in about a minute.

After that, every time you push a change to GitHub, Vercel rebuilds and
redeploys automatically (which also refreshes the latest-videos list).

### Pointing your domain (`evanbryceriddle.com`)

Do this last, once you're happy with the live Vercel URL: in Vercel add the
domain under **Settings → Domains**, then update the domain's DNS to the records
Vercel gives you, and switch off the old Wix site.

---

## 📁 Project structure

```
src/
  content/site.ts      ← ALL your text, links, video + form settings
  pages/index.astro    ← the page (assembles the sections in order)
  layouts/Layout.astro ← <head>, SEO/Open Graph tags, fonts, nav + footer
  components/          ← one file per section (Hero, About, Book, Videos, …)
  lib/youtube.mjs      ← build-time YouTube feed fetch + parse (+ tests)
  styles/global.css    ← design tokens (colours, fonts, spacing) + base styles
  icons/icons.ts       ← inline SVG icon set (no icon dependency)
public/                ← favicon, og-image, and anything served as-is
```

To tweak the **colours or fonts**, edit the `:root` variables at the top of
[`src/styles/global.css`](src/styles/global.css).

---

## License / credits

Personal site content © Evan Bryce Riddle. Built with Astro; line icons from
Lucide (ISC), brand icons from Simple Icons (CC0), fonts Lora + Inter (OFL).
