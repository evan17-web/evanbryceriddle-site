# Evan Bryce Riddle — personal site

A fast, static personal homepage built with [Astro](https://astro.build/). One
scrolling page: hero, about, what I'm building, the book, free playbooks, latest
videos, and a newsletter signup.

- **Warm, editorial design** — warm paper, warm ink, a single rust accent, a
  high-contrast serif (Fraunces) for headlines + Hanken Grotesk for body, a
  marker-highlight on key words, and a hand-written signature.
- **No backend, no database, no CMS.** Everything is static and deploys anywhere.
- **Curated long-form videos**, shown with a click-to-load "facade" so the page
  stays fast and plays still count as real YouTube views.

---

## ✏️ Editing your content (start here)

**Almost everything you'll want to change lives in one file:**

> [`src/content/site.ts`](src/content/site.ts)

Open it and edit the text between the `back-ticks`. It's organised top-to-bottom
in the same order as the page (hero → about → building → book → resources →
videos → newsletter → footer). Tips:

- To _italicise + highlight_ a word in a heading, wrap it in asterisks:
  `who want *freedom*`.
- Search the file for **`FILL`** to find the three things to paste in once your
  email provider (Kit or Beehiiv) is ready:
  1. `newsletter.embed` — your newsletter form embed code.
  2. The Hiring Playbook `formUrl`.
  3. The Lead Gen Playbook `formUrl`.

  Until those are filled in, the site shows tidy **"Coming soon"** placeholders —
  so you can launch first and wire up forms later.

### Adding your photo

The hero has a portrait slot. Drop a photo at `public/headshot.jpg`, then in
`src/content/site.ts` set `hero.photo` to `/headshot.jpg`. Until then, a tidy
branded monogram shows in its place. (A portrait of you is the single biggest
thing that makes the site feel personal — worth doing.)

### Swapping images

| What | Where | Notes |
| --- | --- | --- |
| Your portrait | `public/headshot.jpg` + set `hero.photo` | ~800px tall JPG is plenty. |
| Book cover | `src/assets/book-cover.jpg` | Optimised automatically at build. |
| Social share image | `public/og-image.jpg` | 1200×630, shown when shared on social. |
| Favicon | `public/favicon.svg` | Browser-tab icon. |
| iOS home-screen icon | `public/apple-touch-icon.png` | 180×180. |

### The videos section

Shorts can't be reliably filtered out of a static build, so the site shows a
**curated long-form list**. In `src/content/site.ts`, under `videos`:

- `mode: 'manual'` (default) shows the videos in the **`longform`** list. When you
  publish a new long-form video, paste a `{ id, title }` at the top of that list
  (the `id` is the part after `watch?v=` in the YouTube URL).
- `mode: 'rss'` instead pulls your newest uploads automatically — but note this
  **also pulls in Shorts**, so it's off by default.
- `count` caps how many show (3–6 looks best).

### The brand cards

The four "What I'm building" cards use clean wordmarks. If you'd like the real
brand logos on them, drop the official logo files in and they can be wired in —
your own assets will look far better than anything scraped.

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

The YouTube feed parser/fallback logic is covered by tests:

```bash
npm test
```

---

## 🚀 Deploying to Vercel

The site deploys to [Vercel](https://vercel.com/) straight from GitHub — every
push auto-publishes.

1. Push this project to a GitHub repository (ask Claude Code to walk you through
   it if you're new to GitHub).
2. In Vercel, click **Add New → Project** and import that GitHub repo.
3. Vercel auto-detects Astro. The defaults are already correct:
   - **Build command:** `astro build` (or `npm run build`)
   - **Output directory:** `dist`
4. Click **Deploy**. You'll get a live URL in about a minute.

After that, every push to GitHub rebuilds and redeploys automatically.

### Pointing your domain (`evanbryceriddle.com`)

Do this last, once you're happy with the live Vercel URL: in Vercel add the
domain under **Settings → Domains**, update the domain's DNS to the records
Vercel gives you, then switch off the old Wix site.

---

## 📁 Project structure

```
src/
  content/site.ts      ← ALL your text, links, video + form settings
  pages/index.astro    ← the page (assembles the sections in order)
  layouts/Layout.astro ← <head>, SEO/Open Graph tags, fonts, nav + footer
  components/          ← one file per section (Hero, About, Book, Videos, …)
  lib/youtube.mjs      ← YouTube feed fetch + parse (+ tests)
  styles/global.css    ← design tokens (colours, fonts, spacing) + base styles
  icons/icons.ts       ← inline SVG icon set (no icon dependency)
public/                ← favicon, icons, og-image, and anything served as-is
```

To tweak the **colours or fonts**, edit the `:root` variables at the top of
[`src/styles/global.css`](src/styles/global.css) (e.g. `--accent` for the rust,
`--marker` for the highlighter colour).

---

## License / credits

Personal site content © Evan Bryce Riddle. Built with Astro; line icons from
Lucide (ISC), brand icons from Simple Icons (CC0), fonts Fraunces, Hanken
Grotesk, and Sacramento (all OFL).
