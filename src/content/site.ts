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
  /** FILL: Kit/Beehiiv form URL that captures the email and delivers the file.
   *  Leave as null to show a clearly-marked "Coming soon" button. */
  formUrl: string | null;
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
    { label: `Building`, href: `#building` },
    { label: `Book`, href: `#book` },
    { label: `Resources`, href: `#resources` },
    { label: `Videos`, href: `#videos` },
    { label: `Newsletter`, href: `#newsletter` },
  ] satisfies NavLink[],

  // ── 1. Hero ────────────────────────────────────────────────────────────────
  hero: {
    kicker: `Founder · Writer · Builder`,
    headline: `I build companies for founders who want *freedom*, not just growth.`,
    subhead: `Art of Mondays, Founder Sports Club, WLTH WLKS, and Monday Hires. Plus a book about building a business and a life you can't wait to wake up to.`,
    primary: { label: `Read the book`, href: `https://books.artofmondays.com/freedom/` } satisfies LinkButton,
    secondary: { label: `Join the newsletter`, href: `#newsletter` } satisfies LinkButton,
    /** Portrait shown in the hero. Replace public/headshot.jpg to change it. */
    photo: `/headshot.jpg` as string | null,
    photoAlt: `Evan Bryce Riddle outdoors by the coast`,
    /** Short, human status line under the hero (edit freely). */
    currently: `building four companies, writing, and helping founders trade hustle for freedom.`,
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
      `So I build companies around what I actually value. Art of Mondays works because Jai and I built it for ourselves, so we're always, in a way, building for the people we are.`,
    ],
    /** Shown as a short aside (the interlude after What I'm building). */
    creativeLine: `And when I'm not building businesses... I make videos, take photos, and write. Travel writing, mostly.`,
    /** A few of my own photos, shown as a strip under the creative line. */
    gallery: [
      { src: `/life-1.jpg`, alt: `Roadside coffee with the mountains behind` },
      { src: `/life-2.jpg`, alt: `A slow morning in Greece` },
      { src: `/life-3.jpg`, alt: `Mapping out values at an offsite` },
    ],
    /** Things I'm driven by — shown as chips. */
    values: [`Health`, `Travel`, `People`, `Ambition`, `Adventure`, `Play`, `Freedom`, `Community`],
    pullquote: `My version of rest isn't sitting still. It's swapping one kind of focus for another.`,
    signoff: `Evan`,
    /** A video of me talking, so people can hear me, not just read about me. */
    featuredVideo: { id: `N0PYho3UnKM`, title: `What stepping away showed me about my life` } satisfies VideoItem,
    /** Photo slots. Drop a file in public/ and set `src` (e.g. `/team.jpg`). */
    photos: [
      { src: `/team.jpg` as string | null, label: `Part of the Art of Mondays community`, href: `https://founderfamily.artofmondays.com/` as string | null },
      { src: `/work-view.jpg` as string | null, label: `Offices are overrated, am I right?`, href: null as string | null },
    ],
  },

  // ── 3. What I'm building ───────────────────────────────────────────────────
  building: {
    heading: `What I'm *building*.`,
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
      },
      {
        title: `The Lead Gen Playbook`,
        description: `The system I use to bring in leads without burning out on content.`,
        buttonLabel: `Get the playbook`,
        formUrl: `https://just-clef-a0c.notion.site/Lead-Generation-Playbook-83f8440a5c574e328762aa77645428ff?source=copy_link`,
      },
    ] satisfies Resource[],
  },

  // ── 6. Latest videos ───────────────────────────────────────────────────────
  videos: {
    heading: `Latest from *YouTube*.`,
    body: `Longer videos on building companies, and a life you actually want.`,
    /** 'manual' → show the curated long-form list below (recommended).
     *  'rss'    → pull the newest uploads automatically, but note this ALSO
     *             pulls in Shorts (which can't be reliably filtered out of a
     *             static build without the YouTube Data API). */
    mode: `manual` as VideoMode,
    channelId: `UCi0vJUP7Gxm39b0BojUWB3g`,
    channelUrl: `https://www.youtube.com/@EvanBryceRiddle`,
    /** How many to show (up to this many from the list below). */
    count: 6,
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
    heading: `Behind the *build*.`,
    body: `The behind-the-scenes of building the companies, plus business tips and tricks from me and my Founder Family. All free, no spam, no daily hustle takes.`,
    /** Klaviyo embed form (loaded by the klaviyo.js script in Layout via site.klaviyo). */
    embed: `<div class="klaviyo-form-VkFAzM"></div>` as string | null,
  },

  // ── 8. Footer ──────────────────────────────────────────────────────────────
  social: {
    linkedin: `https://www.linkedin.com/in/evan-bryce/`,
    instagram: `https://www.instagram.com/evan.bryce/`,
    youtube: `https://www.youtube.com/@EvanBryceRiddle`,
  },
  contactEmail: `Evan@artofmondays.com`,
  copyright: `© Evan Bryce Riddle`,
};

export type Site = typeof site;
