# 09 — CMS (Sanity) Content Model

The team updates work, testimonials, posts, team and products **without a developer**. Studio is embedded at `/studio` (Next.js route, `noindex`, protected by Sanity login).

**Setup:** `npm create sanity@latest` (TypeScript), `next-sanity`, `@sanity/image-url`, `@portabletext/react`. Env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`. Queries use GROQ with tag-based revalidation. A Sanity webhook → `/api/revalidate?secret=` calls `revalidateTag(type)`.

**Phase 1 note:** the Home page must not *depend* on Sanity to launch. Ship Phase 1 with a local `content/` TypeScript fallback (same shapes as the schemas below), and switch to Sanity queries in Phase 2. Sections that need real content (marquee, work, testimonials) hide automatically when there's no real data.

---

## Document types

### `siteSettings` (singleton)
| Field | Type | Notes |
|---|---|---|
| phone, whatsapp, emailPublic, address | string | fills `{{PHONE}}` etc. |
| socials | object {instagram, linkedin, x, tiktok} (url) | |
| responseTime | string | "one business day" |
| deliveryDays | string | e.g. "14" or "10–14" |
| guarantee | text | optional, hides the line if empty |
| stats | array of {value:number, suffix:string, label:string} | real only; 0/empty hides |
| prices | object {starterNgn, businessNgn, premiumNgn, starterUsd, businessUsd, premiumUsd} (string) | |
| bookingBudgetsNgn / bookingBudgetsUsd | array of string | form chips |
| announcement | object {enabled, text, link} | optional top bar |

### `project` (case study)
| Field | Type | Notes |
|---|---|---|
| title (client name) | string, required | |
| slug | slug from title | `/work/[slug]` |
| headline | string, required | result-led (see writing guide in 04 §4) |
| summary | text (max 160) | card and meta description |
| services | array of reference → `service` | |
| industry | reference → `industry` | |
| year | number | |
| liveUrl | url | |
| featured | boolean | shows on Home (max 6, ordered by `order`) |
| order | number | |
| cardImage | image (hotspot), required | 4:3 |
| heroMedia | image or file (mp4) | |
| previewVideo | file (mp4, ≤ 3 MB) | hover preview |
| snapshot | array (max 3) of {value, label} | real numbers only |
| challenge | portable text | |
| solution | portable text + array of `gallery` items (image, caption, device: 'desktop'\|'mobile'\|'none') | |
| result | portable text | |
| testimonial | reference → `testimonial` | |
| seo | object {title, description, ogImage} | optional overrides |
| isPlaceholder | boolean | **true = blocked from production build** |

### `testimonial`
quote (text, required, 25–60 words recommended) · name (required) · role · company · photo (image, required for publish) · rating (1–5, optional) · project (reference) · permissionConfirmed (boolean, **required true to publish**, enforced by validation) · isPlaceholder

### `client` (for the logo marquee)
name · logo (svg/png) · url · showInMarquee (boolean) · order

### `service`
title · slug (`websites`, `ai-agents`, `digital-products`, `digital-university`) · oneLiner · icon (string enum of icon names) · illustration (image) · order

### `industry`
title · slug

### `post` (Insights)
title · slug · excerpt (max 200) · cover (image) · category (enum: websites, ai, growth, case-notes) · author (reference → `teamMember`) · publishedAt · body (portable text: h2, h3, normal, blockquote, bullet and number lists, image with caption/alt, `callout` {tone: tip|note|cta}, `codeBlock`, `ctaBlock` {heading, buttonLabel, href}) · readTime (computed on save from word count) · seo · isPlaceholder

### `teamMember`
name · slug · role · bio (text, 2 lines) · photo (image, required) · photoCandid (image) · isFounder (boolean) · order · linkedin (url) · showOnAbout (boolean)

### `product` (Digital University)
title · slug · cover (image; if empty, auto-generate on TEX-03 with the title) · format (enum: course, template, ebook, toolkit, live) · price (string, e.g. "₦25,000" or "Free") · status (enum: available, coming-soon) · externalUrl (checkout or platform link) · description (portable text) · order

### `galleryImage` (About "Inside PDN")
image · caption · order

### `faq`
question · answer (portable text) · pages (array of enum: home, websites, ai-agents, digital-university) · order
(The home FAQ copy in `04` seeds these.)

---

## Studio structure (desk)
```
PDN
├─ Site settings          (singleton)
├─ Work
│  ├─ Projects            (ordered by "order")
│  ├─ Clients (logos)
│  └─ Testimonials
├─ Insights (posts)
├─ Digital University (products)
├─ Team
├─ Inside PDN (gallery)
├─ FAQs
└─ Taxonomies: Services · Industries
```

**Validation rules worth enforcing**
- Testimonials can't publish without `permissionConfirmed = true` and a photo.
- Images require `alt`.
- `project.snapshot[].value` must be filled if `label` is filled.
- Documents with `isPlaceholder = true` show a red badge in Studio. `pnpm check:tokens` also fails the production build if any published placeholder is referenced by a page.

**Seeding:** a script `scripts/seed-sanity.ts` creates siteSettings from the `04` copy defaults, the 4 services, the FAQ items, and **3 placeholder projects, 3 placeholder testimonials and 2 placeholder posts** (all `isPlaceholder: true`, titles prefixed `[PLACEHOLDER]`) so layouts can be built and reviewed.

**Importing real clients:** `scripts/import-client.ts <slug>` reads `assets/clients/<slug>/brief.md` and its images (see `06` §3), uploads them, and creates a draft `project` for the team to review and publish.
