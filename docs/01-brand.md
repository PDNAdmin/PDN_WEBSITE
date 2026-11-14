# 01 — Brand

Source of truth: `/brand/Pishon_Digital_Network_Brand_Guide.pdf` (by Zoekraft Studio). This doc translates it for the web and adds positioning, audience and voice.

---

## 1. Who PDN is

**Pishon Digital Network (PDN)** turns ideas into digital experiences that grow businesses. PDN designs and builds websites and web apps, builds and deploys AI agents, creates digital products, and runs the **PDN Digital University**, its in-house platform for digital products and learning.

**Brand statement (official):** In a world shaped by digital possibilities, Pishon Digital Network transforms ideas into impactful digital experiences. From website development to innovative digital solutions, we help businesses build, connect, and grow in an ever-evolving digital landscape.

**Brand line (official):** **Because the future belongs to businesses built for it.**
Use it as the closing line of the site, the footer statement and the showreel end card. Never edit it.

---

## 2. The name and the mark: the River Pishon

The River Pishon appears in Genesis 2:11. Its exact location is a mystery, but its path is described as **winding, wrapping and encircling** the whole land of Havilah. That land was known for **good gold**, bdellium and **onyx stone**.

The logo mark comes from that story:

- **The P loop** stands for **Pishon**.
- **The d stroke** stands for **Digital**.
- **The double loop** stands for a **Network** (two connections), and also reads as an artsy "n".
- Together they form **one continuous line, like a river,** that runs past the edge of its tile and never ends. That shows how far PDN's capabilities reach.

**Colour meaning:** **Pishon Gold** and **Onyx Black** (a softer jet black) stand for **strength and excellence**.

### How the story drives the website

| Brand idea | Where it lives on the site |
|---|---|
| A river that winds through a land | **The River Line**: a single gold stroke (`brand/logos/pdn-mark-centerline.svg`) that draws itself through every page as you scroll, connecting the sections |
| Encircles everything | Section "nodes": the river loops around key moments (proof, process, booking) |
| Doesn't end at the border | The line always exits off-screen; it never ends inside the viewport |
| Gold and onyx from the land | Strict two-colour palette; gold is light and value, onyx is depth |
| A network with two connections | Two-part layouts: problem and solution, before and after, client and PDN |

---

## 3. Positioning

**Category:** a digital studio for websites, AI agents and digital products.
**Ambition:** a global brand from Lagos, held to the standard of the world's best studios.
**Promise to clients:** *We build the digital presence that makes customers trust you, find you and pay you.*

**What makes us different (use these as pillars):**
1. **Built to convert, not just to look good.** Every page we build has one job: turn visitors into customers.
2. **World-class craft, local understanding.** We design to global standards, and we know how African and diaspora customers actually buy, on phones, through WhatsApp and Instagram, with trust as the first hurdle.
3. **One team for the whole digital journey.** Website, AI agent and digital product, all from one partner.
4. **We pick up the phone.** Clear timelines, written agreements and a team that stays after launch. This answers the biggest fear in the market: developers who disappear.

---

## 4. Who we're talking to

| Audience | What they say (in their words) | What they really want |
|---|---|---|
| **Small business owners** (fashion, food, beauty, retail, Instagram/WhatsApp sellers) | "When customers ask for my website I send my Instagram link." / "People think my prices are too high." | Look legit, get taken seriously, sell beyond their followers |
| **Professionals** (lawyers, doctors, consultants, coaches, creatives) | "I'm good at what I do, but when people Google me, nothing shows up." | Authority, a premium personal brand, referrals that turn into clients |
| **Established companies / SMEs** | "We have a website. It just doesn't bring in a single enquiry." | Leads, credibility with bigger clients, modern systems (AI agents, automation) |
| **Diaspora and international clients** | "I need a team I can trust to deliver, without chasing them across time zones." | Reliability, communication, global quality at a fair price |

**The primary emotion to resolve is trust.** The secondary emotion to spark is ambition.

---

## 5. Voice

**Bold. Clear. Warm. Global.** We speak like a confident senior partner who has seen it all and genuinely wants you to win.

**Rules:**
1. **Speak from the customer's side (the zobo rule).** Don't sell the hibiscus, sell the cold drink on a hot day. Lead with their pain or desire, in words they'd use, then show how PDN solves it.
2. **One idea per sentence. Short lines.** Most sentences under 15 words. Fragments are fine.
3. **Concrete beats clever.** "Customers find you on Google," not "Optimised digital discoverability."
4. **Confident, never arrogant.** We state, we don't hype. No "world-leading", "revolutionary", "cutting-edge", "synergy", "leverage", "solutions provider".
5. **A little edge.** One line per page can turn away the wrong client ("If you want the cheapest website in Lagos, we're not it."). That makes the right client trust us more.
6. **Global English.** Clear international English that a Lagos founder, a London CFO and a Houston dentist all read the same way. Spell British/Commonwealth (colour, organise) to match the brand guide. Local warmth comes through in examples, not slang.
7. **Every section ends with a reason to act.**

**Words we use:** build, grow, trust, customers, clients, real, clear, fast, proper, premium, results, partner, launch, own.
**Words we avoid:** solutions, leverage, synergy, cutting-edge, revolutionary, world-class (show it, don't say it), cheap, affordable (say "worth it" or show value), "kindly".

**Formatting:** sentence case for headings and buttons. No exclamation marks in headlines. Numbers as digits. Use the ₦ symbol and $ for prices.

---

## 6. Logo usage on the web

Files (in `/brand/logos`; copy to `/public/brand`):

| File | Use |
|---|---|
| `pdn-logo-horizontal-white.svg` | **Default header and footer logo** on the onyx site. White tile with the mark cut out, plus the white wordmark. |
| `pdn-logo-horizontal-gold.svg` | Special moments: preloader end state, showreel end card, 404 |
| `pdn-logo-horizontal-onyx.svg` | On gold or white surfaces only (e.g. a gold CTA band, light email templates) |
| `pdn-icon-gold.svg` / `-onyx` / `-white` | App-icon tile (mark cut out of a rounded square). Mobile header when space is tight, social avatars |
| `pdn-mark-gold.svg` / `-white` / `-onyx` | The loop mark on its own, as a filled outline. Decorative large-scale use, 404, loaders |
| `pdn-mark-centerline.svg` | **The River.** One single stroke path (`#pdn-river`) through the centre of the mark. Stroke width about 57 in its 756×780 viewBox recreates the mark exactly. Used for draw-on animation, the scroll river, and as the spine for the 3D tube. |
| `png/pdn-favicon-{32,180,512}.png` | Favicon / apple-touch / PWA icons (onyx tile, gold mark) |

> These SVGs were traced from the brand guide. Before Phase 3, ask the designer (Zoekraft, Figma link in the guide) for the original vector exports and swap them in with identical filenames.

**Rules (from the official guide):** never tilt, never use non-brand colours, never add transparency or opacity to the logo, never put illustrations or graphics over it. Keep clear space equal to the height of the "P" loop on all sides. Minimum header logo height: 28px mobile, 36px desktop.

The *mark* (not the logo) may be animated, scaled huge, cropped by the viewport edge, rendered in 3D gold, or drawn as a line. That's the River and it's encouraged. The *logo lockup* is always static and complete.

---

## 7. Brand colours

| Name | Hex | Role |
|---|---|---|
| **Pishon Gold** | `#d4af37` | Value, light, action. CTAs, the River, highlights, key words |
| **Onyx Black** | `#0f0f10` | Depth. The site's canvas |
| **Gradient** | radial: Onyx centre → Gold edge | The official brand gradient, for hero glows, the CTA band and showreel backgrounds |

Supporting neutrals for UI are defined in `02-design-system.md`. They're tints of onyx and gold, never new hues.

## 8. Typography (official)

- **Quirkfy**: clear, modern, versatile Swiss-style sans with personality. Headlines and display.
- **Bricolage Grotesque**: a refined neo-grotesque that's warm and readable. Body, UI, long-form.
