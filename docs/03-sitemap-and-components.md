# 03 — Sitemap, Page Structures & Components

Copy for every block is in `04-copy.md`, keyed by the same IDs (e.g. `HOME.HERO`). Asset IDs (e.g. `ILL-01`) refer to the manifest in `05-asset-prompts.md` §9. Motion IDs (e.g. `M-HERO`) refer to `07-site-motion.md`.

---

## 1. Sitemap

```
/                          Home (sales page; Meta ads land here)           Phase 1
/thank-you                 Booking confirmation                            Phase 1
/work                      Portfolio grid                                  Phase 2
/work/[slug]               Case study                                      Phase 2
/services                  Services overview                               Phase 2
/services/websites         Websites & web apps                             Phase 2
/ai-agents                 AI Agents (dedicated sales page)                Phase 2
/digital-university        Digital University (products & learning)        Phase 2
/about                     About PDN (story, team, values)                 Phase 2
/insights                  Blog index                                      Phase 2
/insights/[slug]           Article                                         Phase 2
/book                      Standalone booking page (same form; for links)  Phase 2
/privacy  /terms           Legal (simple)                                  Phase 2
/studio                    Sanity Studio (noindex)                         Phase 2
/404                       Not found                                       Phase 2
```

**Primary nav:** Work · Services · AI Agents · About · Insights, plus the **[Book a free call]** button.
**Footer nav:** the same links plus Digital University, Book a call, Privacy and Terms.
**Every "Book a free call" link** goes to `#book` on the current page if a booking section exists, otherwise to `/book`. Buttons may carry `data-service` / `data-package` / `data-audience` to pre-select form chips.

---

## 2. Global layout (every page)

`<SmoothScroll>` (Lenis) → `<Grain />` overlay → `<Header />` → `<RiverPath page="..."/>` (desktop, Phase 2) → `<main>` → `<CTABand />` (except Home, /book and /thank-you, which have their own) → `<Footer />` → `<MobileCTA />` → `<Cursor />` (pointer:fine) → `<PageTransition />`.

---

## 3. Home `/` (the sales page)

The order follows a classic conversion arc: **hook → pain → shift → proof → offer → objections → action.** On mobile, every section fits one idea per screen.

| # | Section ID | Component | Content / layout | Assets | Motion |
|---|---|---|---|---|---|
| 1 | `HOME.HERO` | `HeroHome` | Eyebrow, display-xl headline (one gold phrase), lead, two CTAs (primary "Book a free call" → `#book`, secondary "See our work" → `#work`), and a micro-trust line. Right side / background: the **3D gold River mark** (`HeroMark`), cropped by the right edge. Mobile: the mark sits *behind* the headline at 25% opacity and scales with scroll. Bottom: a row of 4 trust ticks. | 3D (Phase 2); fallback `ILL-01` / `ILL-01m` poster or `VID-hero-loop` | `M-PRELOAD`, `M-HERO` |
| 2 | `HOME.MARQUEE` | `LogoMarquee` | "Trusted by businesses in Lagos, London and beyond", with client logos from Sanity. **Hidden until at least 4 real logos exist.** | client logos | marquee |
| 3 | `HOME.PAIN` | `PainSection` | Eyebrow plus h1. Six quote cards in a 3×2 grid on desktop; on mobile, a horizontal snap carousel with peeking cards. Each card is the customer's own words, with "who says this" underneath. Ends with the bridge line (h2) and a text CTA. | none (type-only, by design) | `M-REVEAL` stagger, cards tilt slightly toward the cursor (desktop) |
| 4 | `HOME.SHOWREEL` | `ShowreelBlock` | A full-bleed 16:9 (mobile 4:5) muted autoplay loop of the showreel (`VID-showreel-loop`). The cursor shows "Play". On click, a fullscreen modal plays the full showreel with sound. A small caption sits under it. | `VID-showreel-loop`, `VID-showreel-full`, poster `SR-POSTER` | scale 0.86→1 and radius 28→0 scrubbed as it enters |
| 5 | `HOME.SHIFT` | `OutcomesSection` | "What changes when PDN builds it". 3 large outcome panels (Trust / Found / Paid), alternating image left/right on desktop and stacked on mobile. Each has a numeral (01, 02, 03), h2, body, and an illustration. The River line passes *through* each illustration. | `ILL-03`, `ILL-04`, `ILL-05` | `M-PIN-OUTCOMES` (desktop: pinned, images crossfade as text scrolls) |
| 6 | `HOME.AUDIENCE` | `AudienceTabs` | "Built for people like you." 4 tabs (chips): Business owners, Professionals, Companies, Clients abroad. Each panel has an h2, body, 3 benefit rows and a CTA that pre-selects the audience in the form. | icons | panel crossfade |
| 7 | `HOME.WORK` (`id="work"`) | `WorkGrid` (featured) | "Real work. Real businesses." 3–6 featured case study cards from Sanity in an asymmetric masonry grid (first card large). "See all work" link. | client screenshots | `M-REVEAL`, image parallax |
| 8 | `HOME.SERVICES` | `ServicesStrip` | "One partner for your whole digital journey." 4 service rows (Websites, AI Agents, Digital Products, Digital University) as large hover rows: index, title, one-liner, arrow. On hover, the illustration follows the cursor (desktop). Mobile: stacked cards with the illustration on top. | `ILL-06`–`ILL-09` | hover image follow |
| 9 | `HOME.PROOF` | `TestimonialsStats` | A stats row (only real numbers; any empty token hides that stat; the row hides if fewer than 2 stats) plus a testimonial carousel (3 visible on desktop, 1 on mobile, swipe). | real client photos | counters, carousel |
| 10 | `HOME.PROCESS` | `ProcessSteps` | "From first call to launch in 3 steps." 3 steps connected by the River line, which loops around each step number. A delivery-time note sits below. | icons | `M-RIVER-STEPS` (line draws between steps on scroll) |
| 11 | `HOME.PRICING` | `Pricing` | Currency toggle (NGN/USD), 3 plan cards (Starter, Business = featured, Premium). Each CTA pre-selects the package in the form. Footnote underneath. | none | `M-REVEAL` |
| 12 | `HOME.GUARANTEE` | `PromiseBand` | A gold-bordered band with 3 promises. The `{{GUARANTEE}}` line shows only if that token is filled. | `icon-trust`, `icon-handshake`, `icon-phone` | none |
| 13 | `HOME.FAQ` | `FAQ` | 8 questions in an accordion, two columns on desktop (heading left, sticky). | none | accordion |
| 14 | `HOME.BOOK` (`id="book"`) | `BookingSection` | Left: h1, lead, "what happens next" (3 steps) and contact alternatives. Right: the booking form card (see §11). Background: the official radial brand gradient, faint. | `TEX-04` gold smoke, very faint | form micro-interactions |
| 15 | `HOME.CLOSER` | `CloserStatement` | A huge display line, the brand line, and the River exits off-screen right. | none | `M-RIVER-EXIT` |

**Mobile above-the-fold check (375×812):** eyebrow, headline, lead (or first line of it) and the primary button must all be visible without scrolling. If not, reduce the hero top padding before shrinking type.

---

## 4. `/thank-you`

A centred layout on onyx. The gold mark draws itself, then a check forms (the River ends in a check). h1, body, "What happens next" (3 steps), a secondary CTA to see the work, and "Add PDN to your contacts" (vCard download, `public/pdn.vcf`). `noindex`. Reads `?name=` to personalise the headline.

---

## 5. `/work` and `/work/[slug]`

**`/work`:** a page hero (display-l), filter chips (All, Websites, AI Agents, Digital Products, plus industry chips from Sanity), and a masonry grid of case cards with infinite reveal. A CTA band sits at the end.

**`/work/[slug]` case study template:**
1. `CASE.HERO`: client name (eyebrow), the result-led headline (display-l), a meta row (Industry · Services · Year · Live site link), and full-bleed hero media (video if available).
2. `CASE.SNAPSHOT`: 3 stat tiles (results). Hide any that are empty.
3. `CASE.CHALLENGE`: "The challenge", 2 short paragraphs on the left, a pull-quote from the client on the right.
4. `CASE.SOLUTION`: "What we built", a feature list plus a large media gallery (desktop and mobile screenshots in device frames built in code, alternating).
5. `CASE.PROCESS` (optional): a short timeline.
6. `CASE.RESULT`: "The result", a paragraph plus a testimonial.
7. `CASE.NEXT`: a next case study card (full-width hover reveal) plus a CTA band ("Want results like {{client}}?").

---

## 6. `/services` and `/services/websites`

**`/services`:** a page hero, then 4 service blocks (each with an anchor `#websites`, `#ai-agents`, `#digital-products`, `#digital-university`) laid out as large alternating panels: illustration, h2, the customer problem, what you get (bullets), "best for", and a CTA. Then "How we work" (the process, reused), the FAQ (services subset) and the CTA band.

**`/services/websites`:** a dedicated deep page (good for Google and for ads about websites): hero, pain, what's included (feature grid with icons), packages (the same Pricing component), process, featured websites from Work, FAQ, then booking.

---

## 7. `/ai-agents`

A second sales page with its own arc: hero ("Your customers message at 11pm. Who's answering?"), a live demo block (Phase 3: a real PDN agent chat; Phase 2: an animated mock conversation), use cases (6 cards by industry), how it works (3 steps), what you get, results (when real data exists), FAQ, and booking (the form pre-selects "AI agent"). Hero visual: `ILL-15` (agent orb) with subtle 3D parallax.

---

## 8. `/digital-university`

Hero (`ILL-09`), "What's inside" (product/course cards from Sanity: cover, title, format, price or "Coming soon", CTA), "Who it's for", a waitlist email capture (Resend audience, or emails to `BOOKING_TO_EMAIL` with subject "DU waitlist"), and an FAQ. Product cover template: Sanity image, or a generated cover on `TEX-03` with the title set in Quirkfy.

---

## 9. `/about`

1. Hero: display-l statement.
2. **The River story** (scroll story, `M-STORY`): 4 pinned beats over `ILL-13` (the river landscape) and `ILL-14` (gold and onyx): *the river, the land of gold, the line that never ends, what that means for you.* The mark draws itself at the end.
3. Mission and what we believe: 4 values as cards.
4. Leadership: co-founder cards with real photos (06), name, role and a 2-line bio.
5. The team: a grid of real portraits. On hover, a candid shot replaces the formal one.
6. Inside PDN: a horizontal-scroll gallery of real office and work photos.
7. The CTA band.

---

## 10. `/insights` and `/insights/[slug]`

**Index:** hero, a featured post (large), category chips, a grid of posts (cover, category, title, read time), and a newsletter capture.
**Article:** a reading layout at 68ch: title, meta, cover, rich text (Portable Text with callouts, images, quotes, code), a share row, an author card, related posts, and an inline CTA block after the 3rd section ("Want this done for you? Book a free call.").

---

## 11. Booking form (shared component `BookingForm`)

Fields in order (labels and help text in `04-copy.md` §11):

1. **Your name**: text, required
2. **Business or brand name**: text, optional
3. **Email**: email, required
4. **Phone / WhatsApp**: tel, required, with a country code selector defaulting to +234 (pre-detect from timezone)
5. **I am a…**: chips, single-select: Business owner · Professional · Company / SME · Client outside Nigeria
6. **I need…**: chips, multi-select: New website · Website redesign · Online store · AI agent · Digital product · Not sure yet
7. **Budget**: chips, single-select. Bands change with the currency toggle (NGN or USD, see copy)
8. **When do you want to launch?**: chips: ASAP · Within a month · 1–3 months · Just exploring
9. **Tell us about your project**: textarea, optional
10. **How did you hear about us?**: select: Instagram · Facebook · Google · Referral · LinkedIn · TikTok · AI assistant (ChatGPT, Claude, etc.) · Other. *This is the only ad-attribution signal we have, so it's important.*
11. Hidden: `package` (pre-selected by pricing CTAs), `utm_*` params captured from the URL into sessionStorage on landing, `page`, `timestamp`, and honeypot `company_website`.

Submit → `POST /api/book` → zod validation → Resend: (a) an internal notification to `BOOKING_TO_EMAIL` (table layout, subject `New booking: {name} · {need} · {budget}`), (b) an auto-reply to the client (copy §12). On success, redirect to `/thank-you?name=`. On error, show an inline message and keep the form state. **Mobile:** the form becomes 2 steps (step 1 is fields 1–4; step 2 is the rest) with a gold progress bar, which raises completion.

---

## 12. Component inventory

`layout/`: Header, MobileMenu, Footer, MobileCTA, SmoothScroll, PageTransition, Grain, Cursor
`sections/`: HeroHome, PageHero, LogoMarquee, PainSection, ShowreelBlock, OutcomesSection, AudienceTabs, WorkGrid, CaseCard, ServicesStrip, ServicePanel, TestimonialsStats, ProcessSteps, Pricing, PromiseBand, FAQ, BookingSection, BookingForm, CloserStatement, CTABand, StoryScroll, ValuesGrid, TeamGrid, Gallery, PostGrid, PostCard, ArticleBody, ProductGrid, WaitlistForm, AgentDemo, UseCaseGrid
`ui/`: Button, Eyebrow, Tag, Chip, ChipGroup, Card, Input, Textarea, Select, PhoneInput, Accordion, Marquee, Counter, CurrencyToggle, Modal, VideoPlayer, DeviceFrame (phone/laptop, built in CSS/SVG), Icon set
`motion/`: Reveal, SplitLines, RiverPath, RiverDraw, Magnetic, ScrollScale, Parallax
`three/`: HeroMark (R3F), RiverTube geometry util, GoldMaterial, `useDeviceTier()`, Fallback poster
