# CLAUDE.md — Pishon Digital Network (PDN) Website

You are building the website for **Pishon Digital Network (PDN)**, a digital company that builds websites, AI agents and digital products, and runs the PDN Digital University.

**The ambition:** a *global* brand site, not "another Nigerian agency site". It must feel like it belongs next to Koto, Clay, Humbleteam and OFF+BRAND.
**The job:** convert. Every page exists to turn a visitor into a booked call. Meta ads send traffic to the home page from tonight.

> The site is the proof. A visitor should *feel* PDN's craft in 3 seconds, then the copy closes the deal.

Read this file fully, then read the docs in `/docs` in order before writing code. When docs and this file disagree, this file wins. When something is not specified, choose the option that (1) converts better, (2) loads faster on a mid-range Android phone, (3) looks more premium — in that order.

---

> **Direction v2 (2026-11-14, decided by PDN):** black, white and gold (≈ 20%), no generated renders.
> `docs/11-direction-v2.md` and `docs/12-asset-brief-v2.md` supersede the palette, imagery and motion parts of
> 02, 05, 07 and 08 wherever they disagree. Copy (04) is unchanged.

## 1. Read these docs (in order)

| # | File | What it gives you |
|---|------|-------------------|
| 01 | `docs/01-brand.md` | Who PDN is, the River Pishon story, logo rules, voice |
| 02 | `docs/02-design-system.md` | Colour, type, spacing, radius, grid, components, icon spec, motion tokens |
| 03 | `docs/03-sitemap-and-components.md` | Every route, every section, component inventory, layout per breakpoint |
| 04 | `docs/04-copy.md` | **All the words.** Every page, section, button, form label, email, meta tag. Use verbatim. |
| 05 | `docs/05-asset-prompts.md` | The ChatGPT prompts the team uses to generate illustrations, textures, 3D stills, showreel layers + the **asset manifest** (exact filenames) |
| 06 | `docs/06-photography.md` | Shot list and art direction for real team / office / client photos, and how to treat them in code |
| 07 | `docs/07-site-motion.md` | Site choreography: preloader, 3D hero, winding river scroll, reveals, hovers, page transitions, performance rules |
| 08 | `docs/08-showreel-remotion.md` | Scene-by-scene Remotion spec for the showreel, hero loop, logo sting and ad cuts |
| 09 | `docs/09-cms-content-model.md` | Sanity schemas for projects, testimonials, posts, team, products, settings |
| 10 | `docs/10-build-plan.md` | Phases, task order, acceptance criteria, performance budget, launch checklist |
| 11 | `docs/11-direction-v2.md` | **Current look:** black, white, gold ≈ 20% |
| 12 | `docs/12-asset-brief-v2.md` | Real material + showreel brief |
| 13 | `docs/13-sitemap-v2.md` | **Current sitemap**, build rounds and the move each page borrows |

---

## 2. Stack (do not substitute without asking)

- **Framework:** Next.js (App Router, latest stable), TypeScript strict, React Server Components by default
- **Styling:** Tailwind CSS v4 with the tokens from `02-design-system.md` defined as CSS variables (`@theme`)
- **Motion:** GSAP + ScrollTrigger + SplitText (scroll choreography, lazy-loaded), Motion / Framer Motion (component state, `LazyMotion` + `m`), Lenis smooth scroll (desktop pointers)
- **WebGL:** `ogl` (approved by PDN 2026-11-14 instead of three.js/R3F for weight), lazy-loaded on capable devices only
- **CMS:** Sanity (embedded Studio at `/studio`), `next-sanity`, ISR / on-demand revalidation via webhook
- **Forms / email:** Next.js Route Handler → **Resend** (env `RESEND_API_KEY`, `BOOKING_TO_EMAIL`, `BOOKING_FROM_EMAIL`), zod validation, honeypot + time-trap spam protection
- **Video:** Remotion project in `/showreel` (separate package in the same repo), renders to `/public/video`
- **Hosting:** Vercel. Images through `next/image`. Fonts self-hosted through `next/font/local`.
- **Analytics:** none for now (client decision). Leave a single `<Analytics />` slot in the root layout, commented out.

### Repo layout to create

```
pdn-website/
├─ CLAUDE.md                  ← this file
├─ docs/                      ← the guides (read-only reference)
├─ brand/                     ← official logos + brand guide PDF + fonts (source of truth)
├─ assets/                    ← raw generated + photographed assets dropped in by the team
├─ app/                       ← Next.js routes
│  ├─ (site)/                 ← public pages
│  ├─ api/book/route.ts       ← booking endpoint
│  └─ studio/[[...tool]]/     ← Sanity Studio
├─ components/
│  ├─ layout/  (Header, Footer, MobileCTA, PageTransition, SmoothScroll)
│  ├─ sections/ (one file per section in 03)
│  ├─ ui/      (Button, Tag, Card, Input, Select, Accordion, Marquee, Counter, Icon)
│  ├─ motion/  (Reveal, SplitLines, RiverPath, Magnetic, Cursor)
│  └─ three/   (HeroMark, RiverTube, Fallbacks)
├─ lib/        (sanity client, queries, motion helpers, device-tier detection)
├─ sanity/     (schemas from 09)
├─ public/
│  ├─ brand/   ← copied from /brand/logos
│  ├─ fonts/
│  ├─ img/     ← optimised copies of /assets
│  └─ video/   ← rendered Remotion outputs
└─ showreel/   ← Remotion project (see 08)
```

**Asset pipeline rule:** the team drops raw files into `/assets/...` using the exact filenames in the manifest (`docs/05-asset-prompts.md` §9). You never edit files in `/assets`. You write a small script `scripts/process-assets.mjs` (sharp) that converts them into `/public/img` as AVIF + WebP at the sizes the components need, and fails loudly listing any missing manifest file. Until an asset exists, render the **placeholder** described next to it in the manifest — never a broken image.

---

## 3. Non-negotiables

1. **Copy is law.** Use `docs/04-copy.md` verbatim. Do not "improve", shorten or add marketing filler. If a layout needs a line that doesn't exist, add it as `{{COPY_NEEDED: description}}` and list it in your summary.
2. **Never invent facts.** No made-up client names, logos, testimonials, statistics, awards, prices or team members. Anything unknown is a `{{TOKEN}}` (see §6) rendered visibly in dev and blocked from production by the launch checklist.
3. **Brand rules** (from the official guide): only Pishon Gold `#d4af37` and Onyx Black `#0f0f10` as brand colours; never tilt, recolour, add transparency to, or place graphics over the logo. Use the files in `/brand/logos` — never redraw the logo.
4. **Fonts:** Headings in **Quirkfy** (file will be placed in `/brand/fonts`), body in **Bricolage Grotesque**. If Quirkfy is missing, fall back to Bricolage Grotesque 800 and log a warning — don't block the build.
5. **Fast first, wow second.** The headline and CTA must be visible and usable before any 3D, video or heavy script loads. Performance budget in `10-build-plan.md` is a hard gate.
6. **Conversion first.** "Book a free call" is reachable within one tap from anywhere: header button, sticky mobile CTA, end of every page.
7. **Accessibility:** WCAG 2.2 AA. All motion respects `prefers-reduced-motion`. Every interactive element works by keyboard. Gold text on onyx only at ≥ 18px or bold ≥ 14px (contrast rules in 02).
8. **Mobile first.** Most traffic arrives from Instagram/Facebook on phones. Design and test at 375 × 812 first, then 768, 1280, 1440, 1920.
9. **No stock photography.** People in imagery are real PDN team members or real clients (see 06). **Exception decided by PDN on 2026-11-14:** realistic generated people may appear as *illustrative scenes* (prompts in `prompt/assets.md`), never next to a testimonial, name, quote or rating, and never presented as PDN's team, clients or results. Replace them with real photos as soon as those exist.

---

## 4. Build order (summary — full detail in `docs/10-build-plan.md`)

**Phase 1 — Ad landing (ship first, today):** design tokens → layout shell → Home page (all sections, copy, static river SVG + light motion, booking form → Resend) → `/thank-you` → deploy to Vercel preview URL.
**Phase 2 — Flagship:** 3D hero mark, scroll-drawn river, page transitions, Services, AI Agents, Work + case studies, About, Insights (blog), Digital University, Sanity CMS, showreel embed.
**Phase 3 — Polish:** Remotion showreel final, ad cuts, OG images, SEO/schema, Lighthouse pass, domain.

Ship each phase to a Vercel preview, list what's placeholder, then continue.

---

## 5. Commands you should set up

```
pnpm dev              # next dev
pnpm build && pnpm start
pnpm assets           # node scripts/process-assets.mjs  (sharp → public/img, reports missing)
pnpm typecheck && pnpm lint
pnpm showreel:studio  # remotion studio (in /showreel)
pnpm showreel:render  # renders all compositions to /public/video (see 08)
pnpm check:tokens     # fails if any {{TOKEN}} remains in rendered production pages
```

---

## 6. Placeholder tokens (fill before production)

Render tokens as a visible amber pill in development (`NODE_ENV !== 'production'`). `pnpm check:tokens` must pass before launch.

| Token | Meaning |
|-------|---------|
| `{{BOOKING_EMAIL}}` | Inbox that receives bookings (env `BOOKING_TO_EMAIL`) |
| `{{PHONE}}` / `{{WHATSAPP}}` | Contact numbers, international format (+234…) |
| `{{ADDRESS}}` | Office address (Lagos) |
| `{{INSTAGRAM}}` `{{LINKEDIN}}` `{{X}}` `{{TIKTOK}}` | Social URLs |
| `{{PRICE_STARTER_NGN}}` `{{PRICE_BUSINESS_NGN}}` `{{PRICE_PREMIUM_NGN}}` | Package prices in naira |
| `{{PRICE_STARTER_USD}}` `{{PRICE_BUSINESS_USD}}` `{{PRICE_PREMIUM_USD}}` | Package prices in USD |
| `{{DELIVERY_DAYS}}` | Typical delivery time for a standard site |
| `{{GUARANTEE}}` | PDN's guarantee wording (if any — section hides if empty) |
| `{{STAT_PROJECTS}}` `{{STAT_CLIENTS}}` `{{STAT_COUNTRIES}}` `{{STAT_YEARS}}` | Real numbers only; stat hides if empty |
| `{{FOUNDER_1_NAME}}` `{{FOUNDER_2_NAME}}` + roles | Co-founders |
| `{{DOMAIN}}` | Final domain (until bought: Vercel URL) |
| `{{RESPONSE_TIME}}` | How fast PDN replies to bookings (default "one business day") |
| `{{EMAIL_PUBLIC}}` | Public contact email shown on the site |
| `{{FOUNDER_n_ROLE}}` `{{FOUNDER_n_BIO}}` | Co-founder role and 2-line bio |

Client projects, testimonials, team members, blog posts and Digital University products come from Sanity (09). Seed Sanity with clearly-marked `[PLACEHOLDER]` documents so layouts can be built; the launch checklist requires them replaced or unpublished.

---

## 7. Definition of done (every page)

- Copy matches `04-copy.md` exactly, no orphaned single words on headline last lines (use `text-wrap: balance`)
- Works and looks intentional at 375, 768, 1280, 1440, 1920 widths
- Lighthouse mobile: Performance ≥ 90 (Phase 1 home ≥ 95), Accessibility ≥ 95, SEO 100
- Reduced-motion mode tested; keyboard tab order tested; no layout shift from fonts or media (CLS < 0.05)
- Meta title/description/OG from `04-copy.md` §13
- Primary CTA visible above the fold on mobile
