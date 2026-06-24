/**
 * ───────────────────────────────────────────────────────────────────────────
 *  EDIT YOUR SITE HERE
 * ───────────────────────────────────────────────────────────────────────────
 *  This is the ONLY file you need to touch to change copy, links, videos,
 *  forms, and social handles. Everything on the page reads from here.
 *
 *  Tips:
 *   • Text inside `back-ticks` can contain apostrophes freely.
 *   • In headings/headline, wrap a word in *asterisks* to italicise it
 *     (e.g. `who want *freedom*`).
 *   • Search for "FILL" to find the three things to paste in once your
 *     email provider (Kit / Beehiiv) forms are ready.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type VideoMode = 'rss' | 'manual';

export interface NavLink {
  label: string;
  href: string;
}

export interface LinkButton {
  label: string;
  href: string;
}

export interface BrandCard {
  name: string;
  tagline: string;
  href: string;
  /** Optional background image (rendered faded behind the card). */
  image?: string | null;
}

export interface Resource {
  title: string;
  description: string;
  buttonLabel: string;
  /** The playbook link. Used as the fallback destination and the place your
   *  Klaviyo gate form should redirect to after capturing the email. */
  formUrl: string | null;
  /** Klaviyo EMBED form id that gates this playbook (in Klaviyo, set the form's
   *  success action to redirect to formUrl). Null = link straight to the playbook. */
  klaviyoFormId?: string | null;
  /** 3D ebook cover accent. */
  accent?: 'rust' | 'teal';
}

export interface VideoItem {
  id: string;
  title: string;
}

export const site = {
  // ── Identity & SEO ───────────────────────────────────────────────────────
  name: `Evan Bryce Riddle`,
  /** Used for canonical + Open Graph URLs. Update if the domain changes. */
  url: `https://evanbryceriddle.com`,
  /** Meta description + OG description (drawn from the hero subhead). */
  description: `Art of Mondays, Founder Sports Club, WLTH WLKS, and Monday Hires. Plus a book about building a business and a life you can't wait to wake up to.`,
  /** Replace /public/og-image.jpg with a 1200×630 image to change the social card. */
  ogImage: `/og-image.jpg`,

  // ── Sticky nav ─────────────────────────────────────────────────────────────
  nav: [
    { label: `About`, href: `#about` },
    { label: `Creating`, href: `#building` },
    { label: `Book`, href: `#book` },
    { label: `Free stuff`, href: `#resources` },
    { label: `Videos`, href: `#videos` },
    { label: `Newsletter`, href: `#newsletter` },
  ] satisfies NavLink[],

  // ── 1. Hero ────────────────────────────────────────────────────────────────
  hero: {
    kicker: `Founder · Writer · Traveller · Human`,
    headline: `Hi, I'm Evan. I build things for founders who want *freedom*, not just growth.`,
    subhead: `Four companies right now, run from a laptop wherever I happen to be in the world. Plus a book, and a lot of trying to actually enjoy this crazy thing called life.`,
    primary: { label: `Read the book`, href: `https://books.artofmondays.com/freedom/` } satisfies LinkButton,
    secondary: { label: `Join the newsletter`, href: `#newsletter` } satisfies LinkButton,
    /** Portrait shown in the hero. Replace public/headshot.jpg to change it. */
    photo: `/headshot.jpg` as string | null,
    photoAlt: `Evan Bryce Riddle outdoors by the coast`,
    /** Short, human status line under the hero (edit freely). */
    currently: `in the South of France in a heat wave, prepping Camp Mondays (100 founders taking over a village), and sneaking in beach reading when I can.`,
  },

  /** Bold statement line for the manifesto band (sits after What I'm building). */
  manifesto: `Build a business you don't need a *holiday* from.`,

  /** Nostalgic link to the old, pre-companies site. IMPORTANT: update this URL once
   *  the old site is rehosted somewhere other than evanbryceriddle.com (that domain
   *  will point to THIS new site). */
  oldSite: {
    url: `https://evanbryceriddle.wixsite.com/portfolio`,
    label: `And here's who I was before the companies. The janky old website, the side hustles, the creative projects.`,
  },

  /** Klaviyo onsite JS company ID (your Public API Key) — powers the newsletter form. */
  klaviyo: { companyId: `RP2BpB` },

  // ── 2. About ───────────────────────────────────────────────────────────────
  about: {
    eyebrow: `Who I am`,
    heading: `More than the *companies*.`,
    paragraphs: [
      `I grew up between Melbourne and Hollywood, and these days I don't really live anywhere. I travel full-time, hosting events around the world for founders who'd rather build a life than just a company.`,
      `Twenty years of soccer, ten of Aussie footy, and an only-child's habit of needing a bit of space to recharge. I want to see the world and make memories while I'm young enough to enjoy them.`,
      `In my twenties I tried a lot of things. Photography, video, a travel blog, freelance writing, even a health supplement brand I got ready to launch and then shelved. There was always passion, but never a hell yes, always an almost. You have to try a bunch of things to find the one, and when you find it, you go all in.`,
      `So I build companies around what I actually value. Art of Mondays works because Jai and I built it for ourselves, so we're always, in a way, building for the people we are.`,
    ],
    /** Shown as a short aside (the interlude after What I'm building). */
    creativeLine: `And when I'm not building businesses... I make videos, take photos, pet kitties, drink matcha (I'm off the coffee), and write. About travel, usually.`,
    /** A few of my own photos, shown as a strip under the creative line. */
    gallery: [
      { src: `/life-1.jpg`, alt: `Roadside coffee with the mountains behind` },
      { src: `/life-2.jpg`, alt: `A slow morning in Greece` },
      { src: `/life-3.jpg`, alt: `Mapping out values at an offsite` },
    ],
    /** Things I'm driven by — shown as chips. */
    values: [`Health`, `Travel`, `People`, `Ambition`, `Adventure`, `Play`, `Freedom`, `Community`],
    pullquote: `Health, travel, good people. Everything I build comes back to those three.`,
    signoff: `Evan`,
    /** Videos of me, so people can hear me, not just read about me. The first leads. */
    featuredVideos: [
      { id: `7iOMPj8xNgU`, title: `Freedom wasn't what I expected` },
      { id: `N0PYho3UnKM`, title: `What stepping away showed me about my life` },
    ] satisfies VideoItem[],
    /** Photo slots. Drop a file in public/ and set `src` (e.g. `/team.jpg`). */
    photos: [
      { src: `/team.jpg` as string | null, label: `Part of the Art of Mondays community`, href: `https://founderfamily.artofmondays.com/` as string | null },
      { src: `/work-view.jpg` as string | null, label: `Offices are overrated, am I right?`, href: null as string | null },
    ],
  },

  // ── Where this is all going ────────────────────────────────────────────────
  dream: {
    heading: `Where this is all *going*.`,
    body: [
      `I want to build a life where I wake up calm and excited at the same time. Driven, but not running on empty. A reality where I'm constantly inspired, where I get paid to learn and to be around good people.`,
      `And I want whatever I build to send out ripples, more abundance, happiness, health, and adventure in other people's lives, the same way it's brought all of that into mine.`,
    ],
    note: `The right people can change everything.`,
  },

  // ── 3. What I'm building ───────────────────────────────────────────────────
  building: {
    heading: `What I'm *creating* at the moment.`,
    intro: `Build for yourself. The right people follow.`,
    cards: [
      {
        name: `Art of Mondays`,
        tagline: `A community for ambitious founders building meaningful, profitable companies on their own terms.`,
        href: `https://artofmondays.com/`,
        image: `/team.jpg`,
      },
      {
        name: `Founder Sports Club`,
        tagline: `Founders connecting through sport, health, and real friendship. Not networking events, not warm beer.`,
        href: `https://www.artofmondays.com/founder-sports-club`,
        image: `/fsc.jpg`,
      },
      {
        name: `WLTH WLKS`,
        tagline: `A community for ambitious women in business, connecting locally on monthly walks and globally online.`,
        href: `https://wlthwlks.com/`,
        image: `/wlth.jpg`,
      },
      {
        name: `Monday Hires`,
        tagline: `Pre-vetted, top 1% global talent for founders, at up to 70% less than hiring locally.`,
        href: `https://mondayhires.com/`,
        image: `/hires.jpg`,
      },
    ] satisfies BrandCard[],
  },

  // ── 4. The book ────────────────────────────────────────────────────────────
  book: {
    heading: `The *Freedom First* Founder.`,
    body: `Success without the sacrifice. Hustle culture lied. Build a business and a life you can't wait to wake up to. The field manual for founders who want both.`,
    cta: { label: `Get the book · $20`, href: `https://books.artofmondays.com/freedom/` } satisfies LinkButton,
    coverAlt: `The Freedom First Founder book cover`,
  },

  // ── 5. Free resources ──────────────────────────────────────────────────────
  resources: {
    heading: `Free *playbooks*.`,
    body: `Some of the systems I actually use, written up so you can use them too. Drop your email and I'll send them over.`,
    items: [
      {
        title: `The Hiring Playbook`,
        description: `How I hire people who raise the average, not just fill a seat.`,
        buttonLabel: `Get the playbook`,
        formUrl: `https://artofmondays.notion.site/How-to-Hire-and-empower-A-Players-1ef381deb0c780ca87bee7cb324237a3?source=copy_link`,
        accent: `rust`,
        // FILL: paste your Klaviyo gate form id to require an email before the playbook opens.
        klaviyoFormId: null,
      },
      {
        title: `The Lead Gen Playbook`,
        description: `The system I use to bring in leads without burning out on content.`,
        buttonLabel: `Get the playbook`,
        formUrl: `https://just-clef-a0c.notion.site/Lead-Generation-Playbook-83f8440a5c574e328762aa77645428ff?source=copy_link`,
        accent: `teal`,
        // FILL: paste your Klaviyo gate form id to require an email before the playbook opens.
        klaviyoFormId: null,
      },
    ] satisfies Resource[],
  },

  // ── 6. Latest videos ───────────────────────────────────────────────────────
  videos: {
    heading: `Latest from *YouTube*.`,
    body: `I film and write as I go. Partly to help other founders, partly because I want to remember it. We're building something while we're young enough to enjoy it, and that feels worth keeping.`,
    /** If the YOUTUBE_API_KEY env var is set (on Vercel), videos AUTO-UPDATE:
     *  newest long-form uploads are fetched at build and Shorts are filtered out
     *  by duration. Otherwise it falls back to the curated list below.
     *  'manual' = curated list. 'rss' = newest uploads, but includes Shorts. */
    mode: `manual` as VideoMode,
    channelId: `UCi0vJUP7Gxm39b0BojUWB3g`,
    channelUrl: `https://www.youtube.com/@EvanBryceRiddle`,
    /** How many to show. */
    count: 6,
    /** Auto-mode: anything shorter than this (seconds) is treated as a Short. */
    minDurationSeconds: 90,
    /** Curated long-form videos, newest first. When you publish a new long-form
     *  video, paste a `{ id, title }` at the top. (id = the part after
     *  watch?v=  in the YouTube URL.) */
    longform: [
      { id: `ZE9mhafjW5c`, title: `You can't fake this kind of pressure...` },
      { id: `N0PYho3UnKM`, title: `What stepping away showed me about my life.` },
      { id: `CVRzKV1gGao`, title: `Why You Keep Hiring B-Players` },
      { id: `8YB3_aOqw9o`, title: `i moved my team to a remote japanese village` },
    ] satisfies VideoItem[],
  },

  // ── 7. Newsletter ──────────────────────────────────────────────────────────
  newsletter: {
    heading: `Join 50k+ curious minds reading my *Monday Mail* newsletter`,
    body: `(and the occasional raw journal entry too)`,
    /** Klaviyo embed form (loaded by the klaviyo.js script in Layout via site.klaviyo). */
    embed: `<div class="klaviyo-form-VkFAzM"></div>` as string | null,
  },

  // ── 8. Footer ──────────────────────────────────────────────────────────────
  social: {
    linkedin: `https://www.linkedin.com/in/evan-bryce/`,
    instagram: `https://www.instagram.com/evan.bryce/`,
    youtube: `https://www.youtube.com/@EvanBryceRiddle`,
  },
  copyright: `© Evan Bryce Riddle`,
};

export type Site = typeof site;
