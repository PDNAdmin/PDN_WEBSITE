# 13 — Sitemap v2 and build rounds (2026-11-14)

The full PDN agency site, page by page, with the reference move each page borrows. All seven reference agencies
(OFF+BRAND, Wildish & Co, Koto, Ramotion, Clay, Humbleteam, Finsweet) gave PDN permission to use their sites as
references. **We borrow layouts, interactions and motion, built in our own code. We never use their images,
client work, logos, copy or code.** Words come from `04-copy.md`; the look is `11-direction-v2.md`.

| Route | Purpose | Key sections | Borrowed moves | Round |
|---|---|---|---|---|
| `/` | Home: hook → proof → offer → book | hero + live demo, logos, pain collage, gold statement, showreel, outcomes, work, audiences, services, proof, process, packages, promise, FAQ, book, closer | all seven | **1** |
| `/contact` | **Sales/booking page** (ads + direct) | promise, 2-step form, reassurance | Humbleteam "Let's talk" | 1 (done) |
| `/thank-you` | Confirmation | mark → check, next steps | — | done |
| `/work` | Portfolio | filter chips, project list | Koto sticky-label list, Clay grid, Finsweet filters | 2 |
| `/work/[slug]` | Case study | full-bleed hero, tags, challenge, what we built, result, next project | Humbleteam case panels, Ramotion device shots | 2 |
| `/services` | All services | 4 service panels, process, FAQ subset | Clay expandable services, Finsweet service cards | 3 |
| `/services/websites` | Website sales page | pain, included, packages, process, FAQ, booking | Ramotion product-UI bento | 3 |
| `/ai-agents` | AI agent sales page | hero, demo chat, use cases, how it works, FAQ, booking | Humbleteam product panels, Ramotion UI | 3 |
| `/about` | Story + team | manifesto, River story, values, leadership, team (when photos exist) | OFF+BRAND manifesto, Koto studio/contact, Humbleteam "Our team" | 4 |
| `/insights`, `/insights/[slug]` | Blog | featured, chips, grid; reading layout | Finsweet resources | 4 |
| `/digital-university` | Products + waitlist | product cards, who it's for, waitlist | Clay / Finsweet product cards | 4 |
| `/privacy`, `/terms` | Legal | plain text, lawyer review | — | 4 |
| `404` | Not found | — | — | done |

## Home, section by section (round 1)

| Section | Borrowed move | Motion |
|---|---|---|
| Header | Finsweet black bar · Koto live "Lagos" clock · full-screen menu (once pages exist) | hide on scroll, Motion menu |
| Hero | Ramotion headline + live UI (the "What are they seeing?" phone) · OFF+BRAND letters that lean from the cursor | CSS load-in, GSAP SplitText cursor + scroll drift |
| Logo strip | Ramotion / Finsweet logo rows | CSS marquee (≥ 4 real logos) |
| Pain | Wildish collage → grid | GSAP scrub (desktop) |
| Gold statement | Wildish colour field · OFF+BRAND manifesto (words light up as you read) | GSAP SplitText scrub |
| Showreel | Koto full-bleed reel, inset → edge, "Play" cursor, fullscreen | GSAP scrub, Motion modal (when the reel exists) |
| What changes | Humbleteam panels · Koto sticky column | sticky stage crossfade (Motion) |
| Selected work | Koto "Our work / client" label · WebGL hover ripple · Clay captions | Motion label swap, `ogl` shader (real projects) |
| Who we build for | Clay expandable rows | native accordion |
| What we do | Koto giant lines · OFF+BRAND cursor-follow preview | Motion springs |
| Proof | Ramotion slider "1 / n" · Finsweet arrows | Motion drag (real testimonials/stats) |
| How it works | Humbleteam / Finsweet sideways run | GSAP pin + horizontal scrub (desktop) |
| Packages | Finsweet cards | Motion price roll |
| Promise, FAQ | Wildish black band · native accordion | reveals |
| Book | Humbleteam "Let's talk" + Ask AI | Motion form steps |
| Closer + footer | OFF+BRAND giant statement + Ask AI · Koto studio + clock · Finsweet mega card | letter scramble, logo reveal |

## Motion stack (one job each)
- **Lenis**: smooth scroll on desktop pointers; phones keep native scroll.
- **GSAP + ScrollTrigger + SplitText**: scroll choreography only; loaded after first paint (`lib/motion/gsap.ts`).
- **Motion** (Framer Motion): component state (menu, cursor, carousels, number swaps, modal).
- **WebGL (`ogl`)**: media hover distortion; loaded on first hover, capable devices only.
- Reduced motion: no smooth scroll, pins, scrubs or WebGL; content is always server-rendered and complete.
