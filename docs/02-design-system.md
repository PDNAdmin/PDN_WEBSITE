# 02 — Design System

Dark-only. Two brand colours. One motif: the River. If an element doesn't feel like it belongs to Onyx and Gold, it doesn't ship.

**Art direction in one line:** *Gold light moving through onyx darkness.* Think a jeweller's display case at night: deep black surfaces, one warm gold light source, objects that feel heavy and precious, and lots of negative space.

---

## 1. Colour tokens

Define as CSS variables in `app/globals.css` under Tailwind v4 `@theme`.

```css
@theme {
  /* Brand */
  --color-gold:        #d4af37;  /* Pishon Gold — official */
  --color-onyx:        #0f0f10;  /* Onyx Black — official */

  /* Gold ramp (tints/shades of the official gold; use for states, glows, gradients) */
  --color-gold-50:  #fbf6e6;
  --color-gold-100: #f4e7bd;
  --color-gold-200: #ead38a;
  --color-gold-300: #e0c160;
  --color-gold-400: #d4af37;  /* = brand */
  --color-gold-500: #b8962a;
  --color-gold-600: #957821;
  --color-gold-700: #6f5918;
  --color-gold-800: #4a3b10;
  --color-gold-900: #261e08;

  /* Onyx ramp (surfaces & lines) */
  --color-onyx-950: #0a0a0b;  /* footer, deepest wells */
  --color-onyx-900: #0f0f10;  /* = brand, page canvas */
  --color-onyx-850: #141416;  /* raised surface 1 */
  --color-onyx-800: #19191c;  /* raised surface 2 (cards) */
  --color-onyx-700: #222226;  /* inputs, hover surfaces */
  --color-onyx-600: #2e2e33;  /* hairlines, borders */
  --color-onyx-500: #45454c;  /* strong borders, disabled */

  /* Text */
  --color-ivory:  #f5f1e8;    /* primary text — warm white, never pure #fff for body */
  --color-stone:  #b4afa4;    /* secondary text */
  --color-ash:    #7d7970;    /* tertiary, captions, placeholders */

  /* Feedback (UI only, never decorative) */
  --color-success: #7fcf9a;
  --color-error:   #ff8f7a;
  --color-warning: #f0b44c;   /* also the dev-only {{TOKEN}} pill */
}
```

**Usage ratios (per screen):** about 85% onyx surfaces, 10% ivory/stone text, ≤ 5% gold. Gold is precious. If more than one gold *filled* element is visible at once (excluding the River line), remove one.

**Contrast rules (AA):**
- Ivory on onyx-900: 17.4:1. Use for all body text.
- Stone on onyx-900: about 8.9:1. Fine for secondary text.
- Ash on onyx-900: about 4.6:1. Captions ≥ 14px only.
- Gold on onyx-900: about 9.2:1. OK for text, but use it for *emphasis words, labels, links*, not paragraphs.
- Onyx on gold (buttons): about 9.2:1.

**Gradients (official radial plus derivatives):**
```css
--grad-brand: radial-gradient(circle at 50% 50%, #0f0f10 0%, #2a2209 38%, #8a7124 72%, #d4af37 100%); /* official: onyx centre → gold edge */
--grad-glow:  radial-gradient(closest-side, rgba(212,175,55,.28), rgba(212,175,55,.06) 55%, transparent); /* hero/section light */
--grad-sheen: linear-gradient(115deg, transparent 30%, rgba(244,231,189,.55) 50%, transparent 70%); /* gold sheen sweep on hover */
```

**Film grain:** a fixed full-screen overlay using `/public/img/textures/grain.png` (from `assets/textures/TEX-01_grain-tile.png`), `opacity: .06`, `mix-blend-mode: overlay`, `pointer-events:none`. It gives the onyx a tactile, filmic surface and is a big part of the premium feel. Turn it off on low-tier devices.

---

## 2. Typography

```css
--font-display: "Quirkfy", "Bricolage Grotesque", system-ui, sans-serif;
--font-body:    "Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", sans-serif;
```

- Load **Quirkfy** with `next/font/local` from `/brand/fonts/` (team will add `Quirkfy-*.woff2/otf`; convert to woff2 if needed). `display: swap`, preload the heading weight.
- Load **Bricolage Grotesque** with `next/font/local` (download the variable font from Google Fonts into `/public/fonts`) or `next/font/google`. Weights 300–800, opsz axis on.

**Fluid scale** (mobile 375 → desktop 1440):

| Token | Font | Size (clamp) | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | Quirkfy | `clamp(3rem, 1.6rem + 6vw, 7.5rem)` | 0.95 | -0.035em | Home hero headline |
| `display-l` | Quirkfy | `clamp(2.5rem, 1.5rem + 4.2vw, 5.5rem)` | 1.0 | -0.03em | Page heroes, big statements |
| `h1` | Quirkfy | `clamp(2.25rem, 1.6rem + 2.8vw, 4rem)` | 1.05 | -0.025em | Section headlines |
| `h2` | Quirkfy | `clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)` | 1.1 | -0.02em | Sub-sections |
| `h3` | Bricolage 700 | `clamp(1.25rem, 1.1rem + .6vw, 1.625rem)` | 1.2 | -0.01em | Card titles |
| `lead` | Bricolage 400 | `clamp(1.125rem, 1rem + .5vw, 1.375rem)` | 1.5 | 0 | Intro paragraphs |
| `body` | Bricolage 400 | `1.0625rem` (17px) | 1.65 | 0 | Default |
| `small` | Bricolage 400 | `0.9375rem` | 1.55 | 0 | Meta, captions |
| `eyebrow` | Bricolage 600 | `0.75rem` | 1 | 0.22em, UPPERCASE | Section labels (gold, preceded by a 28px gold rule) |
| `numeral` | Quirkfy | `clamp(3rem, 2rem + 4vw, 6rem)` | 1 | -0.04em | Stats, step numbers, prices |

Rules: headlines use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Max line length 62ch for body, 18ch for display. **Gold emphasis:** a headline may have *one* phrase in gold (wrap in `<em>`; style `font-style: normal; color: var(--color-gold)`). Copy marks this with `**`.

---

## 3. Space, grid, radius, depth

**Spacing scale (4px base):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 200.
**Section padding (vertical):** `clamp(80px, 12vw, 180px)`. Hero top padding: `clamp(48px, 8vw, 120px)` below the header.
**Container:** max 1320px content, gutters `clamp(20px, 4vw, 48px)`. A wide variant (1600px) for work grids and the showreel.
**Grid:** 4 columns mobile, 8 tablet, 12 desktop. Gap 16 / 24 / 24.
**Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.

**Radius:** `--r-sm 10px` (inputs, tags), `--r-md 18px` (cards), `--r-lg 28px` (feature panels, form card, media), `--r-pill 999px` (buttons). The logo tile's rounded square is the reference shape. Media and cards use `--r-lg`.

**Depth (no grey drop-shadows on dark):**
- `--shadow-card: 0 1px 0 rgba(245,241,232,.04) inset, 0 30px 60px -30px rgba(0,0,0,.8)`
- `--glow-gold: 0 10px 40px -12px rgba(212,175,55,.55)` (primary buttons, featured cards)
- Borders: 1px `--color-onyx-600`. On hover, borders go to `rgba(212,175,55,.5)`.

---

## 4. Components (visual spec)

Build these in `components/ui`. Every one has hover, focus-visible (2px gold outline, 3px offset), active and disabled states.

**Button**
- `primary`: gold fill, onyx text, Bricolage 700 16px, padding 18×30, pill, `--glow-gold`. Hover: lifts 2px, a `--grad-sheen` sweeps across once (500ms), and the arrow icon nudges 4px right. Desktop only: magnetic, following the cursor up to 8px within a 60px radius.
- `secondary`: transparent, 1.5px onyx-600 border, ivory text. Hover: gold border and gold text.
- `ghost-link`: ivory text with a gold underline drawn left-to-right on hover (scaleX 0→1, 400ms).
- Sizes: `md` (header, 12×22, 15px), `lg` (default), `xl` (hero and final CTA, 22×38, 18px).
- Primary CTAs always carry the right-arrow icon (`icon-arrow-right`).

**Header:** 76px tall (64 mobile), sticky, `rgba(15,15,16,.72)` with backdrop blur 16px. A 1px bottom border fades in after 10px of scroll. It hides on scroll-down after 400px and returns on scroll-up. Layout: logo left, nav centre (Work, Services, AI Agents, About, Insights), a "Book a free call" primary `md` button on the right. On mobile the burger opens a full-screen onyx menu: links in `display-l` stacked, staggered in, with the River line drawing behind them and contact details at the bottom.

**Eyebrow:** a 28px × 2px gold rule, 10px gap, then the uppercase label in gold.

**Tag / chip:** pill with a 1px onyx-600 border, small 13px stone text. Selected state: gold fill, onyx text.

**Card (base):** onyx-800 surface, 1px onyx-600 border, `--r-md`, padding 28–36px. Hover: border goes gold-50%, the card lifts 4px, and an inner gold glow follows the cursor (radial at cursor position, 20% opacity).

**Case study card:** media first (4:3 or 16:10, `--r-lg`, image scales 1.04 on hover), then a tag row, the client name (h3), a one-line result (stone) and an arrow link. On desktop hover, a short muted video preview replaces the still if one exists.

**Testimonial card:** a large gold opening quote glyph (Quirkfy, 64px), the quote (lead size, ivory), then the person row: 48px circular real photo, name in bold, role and company in stone, plus an optional 5-star row in gold.

**Stat:** a `numeral` in ivory with the unit or suffix in gold, then a stone label underneath. It counts up once on enter (1.6s, ease-out-expo). Hide the stat entirely if its token is empty.

**Logo marquee:** client logos in monochrome ivory at 60% opacity (100% on hover), scrolling continuously at 40px/s. It pauses on hover and goes static under reduced motion. Edge fades are onyx gradients.

**Pricing card:** see Home §8 in copy. The featured card has a gold 1.5px border, `--grad-glow` at the top, and a "Most popular" gold badge. Price uses `numeral`. A currency toggle (NGN / USD) sits above the grid, remembered in localStorage.

**Accordion (FAQ):** an onyx-850 row with a 1px border. The question is h3-size, and a "+" icon rotates to "×" when open. The answer animates its height (300ms) and fades in. Only one item is open at a time.

**Form controls:** inputs on onyx-900 with a 1.5px onyx-600 border, `--r-sm`, 16px text (prevents iOS zoom) and 52px height. Focus state: gold border plus a 4px gold-at-15% ring. Labels sit above, Bricolage 600 14px stone. Errors show inline in `--color-error` under the field. Selects use a custom gold chevron. Any field with set choices (audience, service, budget, source) shows as **tappable chips** instead of a dropdown on mobile, which is faster on phones.

**Sticky mobile CTA:** below 768px, a full-width primary button floating 12px from the bottom. It appears after the hero leaves view and hides while the booking form is in view.

**Cursor (desktop, pointer:fine only):** a 10px gold dot plus a 36px ring that lags behind (lerp 0.15). Over links the ring grows to 64px. Over media it shows "View" in a 72px gold disc. Over the showreel it shows "Play". Never hide the native cursor on form fields.

---

## 5. Iconography: the "River" icon set

Custom icons, built **in code as SVG** by Claude Code (crisp, themeable, animatable), following this spec. They feel like they were drawn with the same pen as the logo mark.

- **Grid:** 24×24, 2px live-area padding
- **Stroke:** 1.75px, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, `currentColor`
- **Signature:** every icon includes **one small loop or one continuous flowing curve** taken from the mark's vocabulary (a teardrop loop, or a curve that runs off one edge). Where the metaphor allows, draw the main shape as a single continuous line.
- **Corners:** soft (2px radius on rectangles). No sharp mitres.
- **Animation:** on hover, draw the stroke from 0 to 100% (`stroke-dasharray` with `pathLength="1"`), over 600ms with ease-river.
- Sizes: 20, 24 (default), 32, 48. At 48 and up, use a 2px stroke.

**Icons to build** (file: `components/ui/icons/*.tsx`, export names in brackets):

| Icon | Concept (continuous line + loop) |
|---|---|
| `arrow-right` [ArrowRight] | A horizontal line that makes a tiny loop before the arrowhead |
| `arrow-up-right` [ArrowUpRight] | A diagonal stroke with a small loop at its tail |
| `website` [IconWebsite] | Browser window; the address bar line runs out of the frame on the right |
| `ai-agent` [IconAgent] | Chat bubble whose tail is a loop; three dots inside |
| `digital-product` [IconProduct] | Stacked card/box; a single line wraps around it like a ribbon |
| `university` [IconUniversity] | An open book whose spine curls into a loop |
| `growth` [IconGrowth] | A rising line with one loop mid-way, ending in an arrowhead |
| `search` [IconSearch] | Magnifier whose handle is a flowing curve |
| `trust` [IconTrust] | Shield; a check mark drawn as one stroke with a loop |
| `phone` [IconPhone] | Smartphone outline; the home bar is a small loop |
| `whatsapp-chat` [IconChat] | A rounded speech bubble with a loop tail (generic, not the WhatsApp logo) |
| `calendar` [IconCalendar] | Calendar with one date circled by a loop |
| `globe` [IconGlobe] | Globe whose meridian is the river curve |
| `speed` [IconSpeed] | Gauge; the needle's base is a loop |
| `code` [IconCode] | `< / >`; the slash is a flowing S-curve |
| `design` [IconDesign] | Pen nib; the ink line trails into a loop |
| `automation` [IconAutomation] | Two nodes joined by the double-loop "network" curve |
| `handshake` [IconPartner] | Two interlocking loops (from the network symbol) |
| `play` [IconPlay] | Triangle inside a circle that is drawn as an open loop |
| `plus` / `close` / `menu` / `check` / `star` | Utility icons; plain, same stroke spec |

---

## 6. Illustration & imagery system

All generated imagery follows **one art direction**, described fully in `05-asset-prompts.md` §1: **"Onyx & Gold Sculpture"**. That means photoreal 3D still-life of matte onyx stone and polished or brushed gold, with the gold usually taking the form of the **River tube** (a gold tube shaped like the mark's flowing line). Lighting is a single warm key light in deep darkness, shot on a high-end studio camera, with fine grain.

- Illustrations sit on onyx and are exported with the background matched to `#0f0f10` or transparent PNG, so they melt into the page with no visible box.
- Real photos (team, office, clients) follow `06-photography.md`: warm low-key light, deep shadows, and a subtle gold grade that matches the art direction.
- **Treatment in code:** media radius `--r-lg`; an optional 1px onyx-600 border; images fade from 1.06 scale to 1 on reveal.

---

## 7. Motion tokens

```css
--ease-river:    cubic-bezier(0.65, 0, 0.35, 1);   /* signature: in-out, flowing — line draws, page transitions */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);    /* reveals, counters, entrances */
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);/* tiny playful pops (badges, cursor) — sparingly */
--dur-1: 150ms;  /* hovers, colour */
--dur-2: 300ms;  /* small UI (accordion, menu items) */
--dur-3: 600ms;  /* reveals, icon draws */
--dur-4: 900ms;  /* headline line reveals */
--dur-5: 1400ms; /* hero/preloader, page transition total */
--stagger: 80ms;
```
GSAP equivalents: `"power2.inOut"`-like custom eases registered as `river` (CustomEase `M0,0 C0.65,0 0.35,1 1,1`) and `expo.out`. Choreography is in `07-site-motion.md`.

---

## 8. Layout principles

1. **One idea per screen** on mobile. Sections breathe.
2. **Asymmetry with a spine.** Content alternates left and right of the River line on desktop, and the River runs through the gutter. On mobile, the River runs down the left edge (16px in).
3. **Big type, small UI.** Headlines dominate; UI elements stay quiet and precise.
4. **Every section has one primary action** or flows naturally into the next.
5. **Numbers and proof are visual.** Stats, logos and results are designed elements, not paragraphs.
