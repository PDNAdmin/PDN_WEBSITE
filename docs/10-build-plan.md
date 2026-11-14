# 10 — Build Plan, Budgets & Launch Checklist

Work in phases. At the end of each phase, deploy to a Vercel preview, then post a short summary: what shipped, what's still a placeholder (`{{TOKENS}}`, missing manifest assets), and what's next.

---

## Phase 1 · Ad landing page (ship first)

**Goal:** a fast, polished, converting Home page live on a Vercel URL so Meta ads can run. It must already *look* like a global studio, with light motion only and no 3D yet.

1. **Scaffold:** Next.js + TS + Tailwind v4 + ESLint/Prettier, pnpm. Repo layout from CLAUDE.md §2. Copy `/brand/logos` → `/public/brand`. Set up favicons from `png/pdn-favicon-*` and a web manifest (theme `#0f0f10`).
2. **Tokens:** `globals.css` `@theme` from `02` §1–3 and §7. Fonts via `next/font/local` (Quirkfy with fallback, Bricolage).
3. **Asset pipeline:** `scripts/process-assets.mjs` (sharp) → `/public/img`, plus a missing-asset report. Placeholders per the manifest. `scripts/make-grain.mjs` if TEX-01 is missing.
4. **Layout shell:** Header, Footer, MobileCTA, Grain, Lenis (desktop), Reveal + SplitLines utilities. Token pill component for dev.
5. **Icons:** the River icon set from `02` §5 (at least: arrow-right, arrow-up-right, website, ai-agent, digital-product, university, trust, search, phone, chat, calendar, globe, handshake, check, plus, close, menu, star, play).
6. **Home sections** 1–15 from `03` §3 with `04` copy, in order. Hero uses the poster/gradient fallback plus the gold centre-line drawing in SVG (`M-HERO` without 3D). The River scroll path may be a simplified static version in Phase 1.
7. **Booking:** `BookingForm` (chips, 2-step on mobile, currency-aware budgets, UTM capture) → `/api/book` (zod, honeypot, time-trap ≥ 3s, simple rate limit per IP using an in-memory/Upstash fallback) → Resend notification + auto-reply → `/thank-you`.
8. **SEO basics:** metadata, OG image route (`next/og`), JSON-LD Organization, `robots.txt`, `sitemap.xml`.
9. **QA:** budgets below, the mobile checks, and a test booking end-to-end (an email arrives in the `BOOKING_TO_EMAIL` inbox and the auto-reply arrives).
10. **Deploy:** Vercel project, env vars, preview URL. Share it with the team.

**Phase 1 is done when:** the home page works on a real phone over 4G, the form delivers both emails, Lighthouse mobile Performance is ≥ 95 and Accessibility is ≥ 95, there are no console errors, and every visible placeholder is listed in the summary.

---

## Phase 2 · Flagship site

1. **3D hero** (`07` §3): river-points build script, tube geometry with crossing depth, materials per tier, light-flow shader, interactions, lazy-load and fallbacks, FPS guard.
2. **River scroll** (`07` §4) on Home, then on the other pages. M-RIVER-STEPS, M-RIVER-BOOK, M-RIVER-EXIT.
3. **Page transitions**, cursor, magnetic buttons, M-PIN-OUTCOMES, showreel block (with a placeholder video until Remotion renders).
4. **Sanity:** schemas (`09`), embedded Studio, seed script, revalidation webhook. Move Home content to Sanity with a local fallback.
5. **Pages:** `/services`, `/services/websites`, `/ai-agents` (with the animated demo conversation), `/work`, `/work/[slug]`, `/about` (M-STORY), `/insights`, `/insights/[slug]`, `/digital-university` (+ waitlist), `/book`, `/privacy`, `/terms`, 404.
6. **Client import script** and real case studies as the team supplies material.
7. **QA:** budgets on every template, reduced-motion pass, keyboard pass, cross-browser (Chrome, Safari iOS, Samsung Internet, Firefox).

## Phase 3 · Showreel, polish, launch

1. **Remotion project** (`08`): all compositions. Render the outputs into `/public/video` and swap the showreel block and the hero fallback to the real renders.
2. **Ad cuts** delivered to the team for Meta (vertical 30s, feed 30s, 15s).
3. **Real SVG logos** from the designer (same filenames), favicon regeneration.
4. **Domain:** connect `{{DOMAIN}}` in Vercel, redirects from the vercel.app URL, Google Search Console + sitemap submit, Google Business profile link.
5. **Final copy pass:** every `{{TOKEN}}` filled, `pnpm check:tokens` green, placeholders unpublished.
6. **(Optional, later)** a live PDN AI agent on `/ai-agents` and site-wide, using PDN's own agent stack. Out of scope until the team specifies the provider.

---

## Performance budget (hard gates)

Measured on Lighthouse mobile (Moto G Power / 4G throttling) and WebPageTest (Lagos or nearest location, 4G).

| Metric | Home (Phase 1) | Any page (Phase 2+) |
|---|---|---|
| LCP | ≤ 1.8s | ≤ 2.5s |
| INP | ≤ 150ms | ≤ 200ms |
| CLS | ≤ 0.05 | ≤ 0.05 |
| Initial JS (gzip) | ≤ 120 KB | ≤ 170 KB (3D chunk loaded separately, ≤ 180 KB, Home + AI only) |
| Total page weight on first load | ≤ 900 KB | ≤ 1.5 MB (excluding lazy video) |
| Fonts | ≤ 2 files preloaded, woff2, subset Latin | same |
| Lighthouse Performance | ≥ 95 | ≥ 90 |

Rules: AVIF/WebP via `next/image` with explicit sizes, hero poster `priority`, everything else lazy. No third-party scripts except Resend (server-side) and Sanity (server-side fetch). Videos use `preload="none"` until near the viewport. GSAP plugins are imported only where used.

---

## Testing matrix

| Device / browser | Must pass |
|---|---|
| iPhone 12–15 Safari | hero, form 2-step, sticky CTA, video autoplay muted |
| Mid Android (Samsung A-series, Tecno/Infinix) Chrome + Samsung Internet | low/mid tier fallbacks, performance, form |
| Desktop Chrome / Safari / Firefox / Edge at 1280, 1440, 1920 | 3D, River, transitions, cursor |
| Keyboard only | every link, tab, accordion, chip, the form, the modal |
| Screen reader spot-check (VoiceOver) | headings order, form labels, button names |
| Reduced motion | `07` §7 checklist |
| Slow 3G | content readable within 4s, poster shows, nothing blocks |

---

## Launch checklist

**Content**
- [ ] All `{{TOKENS}}` filled (`pnpm check:tokens` passes)
- [ ] Prices, package inclusions and budget bands confirmed by the founders (`04` §2 PRICING, §11)
- [ ] The 3 promises in HOME.GUARANTEE confirmed true by the founders
- [ ] "You own your website" FAQ answer confirmed as company policy
- [ ] Marquee cities and client logos are real and approved
- [ ] Every testimonial is real, approved and has a photo and permission
- [ ] Every stat is real and verifiable
- [ ] Case studies approved by the clients
- [ ] Privacy and Terms reviewed by a lawyer
- [ ] No `[PLACEHOLDER]` Sanity documents published

**Brand**
- [ ] Logo files unaltered; official SVGs from the designer swapped in
- [ ] Quirkfy font licensed for web use and installed
- [ ] All generated imagery passes the `05` §2 review checklist

**Tech**
- [ ] Env vars set in Vercel (Resend, Sanity, booking emails)
- [ ] Resend sending domain verified (SPF/DKIM) on `{{DOMAIN}}` so emails don't land in spam
- [ ] Test booking: internal email + auto-reply received; WhatsApp link works
- [ ] 404 and error pages styled
- [ ] Sitemap, robots, OG images verified (share a link in WhatsApp and check the preview)
- [ ] Performance budgets met on Home, a case study and an article
- [ ] Domain connected, HTTPS, `www` → apex (or the reverse) redirect
