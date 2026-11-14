/**
 * Site settings: the values behind every {{TOKEN}} in CLAUDE.md §6.
 * Phase 1 local fallback (docs/09: same shape as the Sanity `siteSettings` singleton).
 *
 * RULE: real values only. Leave a field "" until PDN confirms it.
 * Empty = amber {{TOKEN}} pill on dev/preview, and the dependent sentence hides on production.
 * `pnpm check:tokens` fails while any required value is empty.
 */
export const settings = {
  phone: "", // {{PHONE}}  international format, e.g. +234 …
  whatsapp: "", // {{WHATSAPP}} international format
  emailPublic: "", // {{EMAIL_PUBLIC}}
  address: "", // {{ADDRESS}} (Lagos office)
  domain: "", // {{DOMAIN}} e.g. "pishondigital.com" (no protocol). Until bought: the Vercel URL is used.
  socials: {
    instagram: "", // {{INSTAGRAM}}
    linkedin: "", // {{LINKEDIN}}
    x: "", // {{X}}
    tiktok: "", // {{TIKTOK}}
  },
  /** {{RESPONSE_TIME}}: copy default is "one business day" until PDN confirms. */
  responseTime: "one business day",
  /** {{DELIVERY_DAYS}} e.g. "14" or "10–14" */
  deliveryDays: "",
  /** {{GUARANTEE}} optional: the line hides when empty (no pill: it is optional by design). */
  guarantee: "",
  /** {{STAT_*}} real numbers only. Empty hides the stat; the row hides with fewer than 2. */
  stats: {
    projects: "",
    clients: "",
    countries: "",
    years: "",
  },
  /** {{PRICE_*}} include the currency symbol, e.g. "₦350,000" / "$450" */
  prices: {
    starterNgn: "",
    businessNgn: "",
    premiumNgn: "",
    starterUsd: "",
    businessUsd: "",
    premiumUsd: "",
  },
  founders: [
    { name: "", role: "", bio: "" }, // {{FOUNDER_1_*}}
    { name: "", role: "", bio: "" }, // {{FOUNDER_2_*}}
  ],
};

/** Real client content (Sanity in Phase 2). Sections hide while these are empty. */
export const realContent = {
  /** Client logos for HOME.MARQUEE (hidden until ≥ 4). */
  clientLogos: [] as { name: string; src: string; url?: string }[],
  /** Featured case studies for HOME.WORK (hidden until ≥ 3, max 6). */
  featuredProjects: [] as {
    slug: string;
    client: string;
    result: string;
    tags: string[];
    image: string;
  }[],
  /** Real, approved testimonials with photo + permission (HOME.PROOF). */
  testimonials: [] as {
    quote: string;
    name: string;
    role: string;
    company: string;
    photo: string;
    rating?: number;
  }[],
  /** Showreel renders exist in /public/video (Phase 3). */
  showreel: false,
};
