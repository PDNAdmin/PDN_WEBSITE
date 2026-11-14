# 11 — Direction v2: Black, White & Gold (supersedes parts of 02, 05, 07)

Decided by PDN on 2026-11-14 after rejecting v1 ("it looks AI-generated").
Where this file disagrees with `02-design-system.md`, `05-asset-prompts.md` or `07-site-motion.md`, **this file wins**.
Copy (`04-copy.md`) is unchanged and still law.

## Why v1 failed

v1 leaned on glossy generated 3D gold renders, glows, gradients, film grain and small tracked-caps labels.
Those are exactly the tells of generated pages. Every reference site PDN admires looks real for one reason:
**it shows real work, real screens and real people.** Their type and layout are restrained.

## The idea

The home page asks: *"What are they seeing?"* So it **shows** what a customer sees.
Every picture is an interface PDN actually builds (a website on a phone, a search result, a WhatsApp enquiry,
an AI agent reply), built in code and personalised with the visitor's own business name.
No generated renders on the site. Real photography and real client work replace them as the team supplies them.

## Palette (20% gold)

| Role | Value | Use |
|---|---|---|
| White ground | `#ffffff` | Default field |
| Ink | `#0a0a0a` | All running text on white; black fields |
| Black field | `#0a0a0a` | Alternating sections, booking, footer |
| Grey | `#6e6e6a` on white · `#9a9a95` on black | Secondary lines only (the second tone of two-tone headings) |
| Tone | `#f3f3f1` on white · `#161616` on black | Surfaces (cards, rows). No borders, no shadows |
| **Pishon Gold** | `#d4af37` | Primary buttons, the gold field, the highlighter behind gold phrases, the mark |

**Gold text on white is not allowed** (contrast ≈ 2:1). The `**gold phrase**` in copy renders as black text
on a gold highlighter, on any ground. Gold area target: about 20% of the page (the gold field band, buttons, highlights).

## Type

Bricolage Grotesque only (Quirkfy replaces the display face when its licensed files arrive).
Display weight 600, tracking −0.045em, leading 0.92. Body 18px / 1.55, weight 400. Five sizes on the page:
display, heading, statement, body, small. Sentence case everywhere: no tracked uppercase labels.
Eyebrow copy renders as a sentence-case line at body size in grey, never as a tiny label.

## Shapes

Square corners on buttons and media. The only rounded shapes are device frames and the logo's own tile.
No 1px divider lines (except inside form fields and interface fragments), no shadows at rest, no gradients, no glass, no grain.

## Steal sheet (one move per reference, made our own)

| Reference | The move | Where it lives |
|---|---|---|
| Ramotion | Hero = big headline with real product interface directly beneath it | Hero: the live "What are they seeing?" phone, before / with PDN |
| Koto | Two-tone headings; sticky label left, large content scrolling right; their showreel | Pain, Services; the brief for the real showreel (see 12) |
| Wildish & Co | One full field of colour carrying a single centred statement | The bridge line on a solid gold field |
| Humbleteam | Full-height case panels (big visual + name + one line + actions); "Let's talk" card on a dark field | Outcomes (Trust / Found / Paid); Booking |
| Clay | Large expandable list rows | "Built for people like you" |
| Finsweet | Solid black nav bar; flat tone cards with small square accent arrow buttons | Header; Pricing |
| OFF+BRAND | Giant closing statement with letters that scramble into place; huge wordmark footer | Closer and footer |

## Motion

One signature move: the hero phone flipping between *Today* and *With PDN* as the visitor types their name.
Section entrances (heading → text → picture, 70ms stagger, 24px rise), the closer's letter scramble,
press/hover feedback on every control. Transform and opacity only; everything has a reduced-motion fallback.

## The showreel

Still wanted (Koto-style: hard cuts on the beat, full-bleed real work, kinetic type). It is built from real
screen recordings of client sites plus type, not from generated stills. Brief and shot list: `12-asset-brief-v2.md`.
The home showreel block stays hidden until the edit exists.
