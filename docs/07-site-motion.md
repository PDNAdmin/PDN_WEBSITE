# 07 — Site Motion & Choreography

**Motion idea:** *the River.* Everything flows the way the PDN mark flows: one continuous line, in-out easing, nothing snaps. Motion guides attention toward the next action, and is never decoration for its own sake.

**Principles**
1. **Content first.** Text is readable before any animation finishes. Nothing important waits on a scroll trigger to become visible longer than 600ms.
2. **One hero moment per screen.** If two things animate in, one leads and the other follows (stagger).
3. **Flow, don't bounce.** Default easing is `river` (in-out) for lines and transitions, and `expo.out` for entrances. Back easing only on tiny pops.
4. **Scroll-linked = scrubbed and reversible**, never one-shot jank. Entrance reveals happen once.
5. **Respect people:** `prefers-reduced-motion` disables Lenis, the 3D float, parallax, scrubbed effects and the cursor. Reveals become a 200ms opacity fade, and the River line renders fully drawn.

Tokens: see `02-design-system.md` §7. Register GSAP eases once in `lib/motion.ts`:
```ts
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("river", "M0,0 C0.65,0 0.35,1 1,1");
CustomEase.create("expoOut", "M0,0 C0.16,1 0.3,1 1,1");
```

---

## 1. Device tiers (`lib/device-tier.ts` → `useDeviceTier()`)

| Tier | Detect | 3D hero | River scroll | Lenis | Grain | Cursor | Video autoplay |
|---|---|---|---|---|---|---|---|
| **high** | `pointer:fine` and `hardwareConcurrency ≥ 8` and (`deviceMemory ≥ 8` or unknown) and not `saveData` | Full: physical gold, env lighting, light-flow shader, DPR up to 2 | Full path with loops | on | on | on | on |
| **mid** | everything else not low | Matcap gold (`3D-01`), no post-processing, DPR ≤ 1.5 | Full path | desktop on, touch native | on | if pointer:fine | on (muted) |
| **low** | `saveData` or `deviceMemory ≤ 4` or `hardwareConcurrency ≤ 4` or `effectiveType` in `2g`/`3g` | **No WebGL.** Poster `ILL-01`/`01m`, or `VID-hero-loop` if connection allows | Simplified line | off | off | off | poster only, tap to play |

Detection runs on the client after hydration. SSR always renders the **low-tier markup** (poster + static SVG), then progressively enhances. That's why Phase 1 is fast by default.

---

## 2. Global choreography

### M-PRELOAD (first visit only, per session)
Purpose: a 1-second signature moment that never delays content.
- Shows only if fonts + hero poster aren't ready within 300ms, or on the first visit (sessionStorage flag). **Hard cap 1.2s.** Skipped completely under reduced motion and on low tier.
- 0–700ms: on full-screen onyx, the River centre-line (`#pdn-river`, gold, stroke-width scaled) draws from the top edge (`strokeDashoffset 1→0`, ease `river`).
- 700–1000ms: the panel slides up (`yPercent 0→-100`, ease `river`) and reveals the hero. The drawn line stays in place and hands over to the hero mark (crossfade).
- Never shows a percentage counter.

### M-HERO (Home)
Timeline starts when fonts are ready (`document.fonts.ready`), or at 0ms if the preloader ran.
| t (ms) | Element | Animation |
|---|---|---|
| 0 | Eyebrow | opacity 0→1, x −12→0, 500, expoOut |
| 80 | Headline lines | SplitLines: each line in an `overflow:hidden` mask, `yPercent 110→0`, 900, expoOut, stagger 80. The gold phrase also gets a one-time `--grad-sheen` sweep at +900ms |
| 450 | Lead | opacity 0→1, y 16→0, 700 |
| 600 | Buttons | opacity 0→1, y 16→0, 600, stagger 80 |
| 750 | Trust ticks | each tick's check draws (stroke), the text fades, stagger 60 |
| 300→ | 3D mark | see §3. Fades in only after the timeline starts **and** the model is ready; never blocks |

Scroll-out (scrubbed, desktop): the headline moves up at 0.85× speed (subtle parallax), and the 3D mark rotates 15° on Y and drifts right as the hero leaves.

### Header
Hides on scroll down after 400px (`yPercent -100`, 300, river) and shows on scroll up. A border fades in at 10px. The active nav link has a small gold loop underline drawn with SVG.

### Mobile menu
Opening: the panel clips open from the top-right (clip-path circle from the burger, 600, river). Links stagger in (`yPercent 100→0`, 500, expoOut, stagger 60). The River line draws down the left edge behind them. The burger morphs into a close icon with two strokes that loop.

### M-REVEAL (default for section content)
- Trigger: `start: "top 85%"`, once.
- Headings (`h1`, `h2`, display): SplitLines mask reveal as in the hero, 900, stagger 80.
- Paragraphs / lists: opacity 0→1, y 24→0, 700, expoOut, stagger 60 for list items.
- Cards in grids: same as paragraphs, stagger 80, batched with `ScrollTrigger.batch`.
- Media: a wrapper `clip-path: inset(8% 8% 8% 8% round 28px) → inset(0 round 28px)` with the inner image scaling 1.12→1, 1200, expoOut.

### Smooth scroll (Lenis)
`new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false })`. Drive it from the GSAP ticker and call `ScrollTrigger.update` on scroll. Disable it on low tier and under reduced motion. Anchor links use `lenis.scrollTo(target, { offset: -80, duration: 1.2, easing: riverFn })`.

### Page transitions (Phase 2)
Use App Router `template.tsx` plus a `<PageTransition>` overlay. Total ≤ 900ms.
1. **Leave (450ms):** an onyx panel with a **gold leading edge drawn as a curve** (a wide SVG path, the bottom edge of the panel bowed like a river bend) sweeps up from the bottom (`yPercent 100→0`, river). As it covers the screen, the gold mark centre-line draws small in the centre (300ms).
2. Route change.
3. **Enter (450ms):** the panel continues up and off (`0→-100`), and the new page's hero timeline starts at 60% of the exit.
Skip transitions for same-page hash links and under reduced motion (instant swap).

### Cursor (pointer:fine only)
A dot follows exactly; the ring lerps at 0.15. States via `data-cursor="link|view|play|drag|hide"`. "View" and "Play" show a gold disc with text in onyx at 13px/600. Hide the custom cursor over inputs and textareas.

### Micro-interactions
- **Primary button:** hover lifts −2px plus a single sheen sweep (500ms), the arrow moves +4px, and it's magnetic within 60px (max 8px pull, `gsap.quickTo`, 0.4s). Press: scale 0.97.
- **Links:** an underline draws on hover (`scaleX 0→1`, origin left, 400, river). On leave it retracts to the right.
- **Icons:** the stroke draws on parent hover (`pathLength`, 600, river).
- **Cards:** the border goes gold-50%, the card lifts −4px, and a radial glow follows the cursor via CSS vars `--mx/--my` (no React re-render).
- **Chips:** select = gold fill grows from the centre (`scale 0→1` of a pseudo-element, 250, back ease).
- **Form focus:** a gold ring fades in. On valid, a tiny gold check draws at the right of the field.
- **Submit:** the button shrinks to a circle, the River loop spins inside it (loader), then success redirects.

---

## 3. The 3D hero mark (`components/three/HeroMark.tsx`)

**Goal:** the PDN mark as a real object: a polished gold tube that floats, catches light, responds to the visitor and has light "flowing" along it like a river.

**Geometry**
1. Parse `brand/logos/pdn-mark-centerline.svg` → path `#pdn-river` (viewBox 756×780, stroke width ≈ 57).
2. Sample points along the path every ~4 units with the SVG path API (`getPointAtLength`) at build time. Write a script, `scripts/build-river-points.mjs`, that outputs `lib/river-points.json`, so there's no DOM parsing at runtime.
3. Centre and normalise (fit the height to 2 world units). Flip Y.
4. **Add depth at the crossings** so loops pass over and under each other like a real sculpture. Where the path crosses itself (3 crossings), give one pass `z = +0.08` and the other `z = −0.08`, eased smoothly (sine) over ±40 samples. Give the whole path a gentle overall S-curve in z (±0.15) so it reads as 3D when rotated.
5. `CatmullRomCurve3(points, false, "centripetal")` → `TubeGeometry(curve, 900 tubularSegments, radius = 0.5 × 57/780 × 2 ≈ 0.073, 24 radialSegments)`.
6. Extend both ends 1.5 units straight along their tangents so the tube **exits the viewport**. The river never ends on screen.

**Material**
- High tier: `MeshPhysicalMaterial({ color: #d4af37, metalness: 1, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.15, envMapIntensity: 1.4 })` with a drei `<Environment resolution={256}>` built from `<Lightformer>`s: a large warm softbox top-right (intensity 3, colour `#ffe9b0`), a thin rim strip left (intensity 2, `#d4af37`), and a dim fill below (0.4). No HDR download needed.
- Mid tier: `MeshMatcapMaterial({ matcap: 3D-01 texture })` with an `onBeforeCompile` patch for the flow highlight.
- **Light-flow shader (both tiers):** add an emissive band along the tube's length: `uv.x` runs 0→1 along the curve. In the fragment shader, `band = smoothstep(0.0, 0.04, 0.04 - abs(fract(uv.x*1.0 - uTime*0.08) - 0.5 + 0.46))`, then add `band * vec3(1.0, 0.86, 0.55) * 0.9`. One soft bright pulse travels from the top end to the right exit every ~12s, like light moving down the river.

**Scene and camera**
- Canvas fixed to the hero section's right 60% on desktop (behind text on mobile), `dpr={[1, tier==='high'?2:1.5]}`, `gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}`.
- PerspectiveCamera fov 30, z = 6. The mark is scaled so the loops fill about 70% of the canvas height, and is offset so the right exit runs off the canvas edge.
- Background is transparent; the page's `--grad-glow` sits behind the canvas.
- A soft contact glow below is a plane with a radial alpha texture (gold, 15%). No real-time shadows.

**Behaviour**
| Interaction | Response |
|---|---|
| Idle | Float: `y = sin(t*0.6)*0.04`, rotation Y oscillates ±6° over 10s, X ±2° |
| Pointer move (desktop) | Rotate toward the pointer: target rotY = pointerX × 14°, rotX = −pointerY × 8°, damped (`MathUtils.damp`, λ = 3) |
| Touch (mobile high/mid) | Drag rotates ±20°, then springs back on release. No gyroscope (permission prompts hurt conversion) |
| Scroll (hero leaving) | Scrubbed: rotY +15°, x +0.6, opacity 1→0 over the last 30% |
| Enter | After the model is ready: tube `drawRange` animates 0→100% along the length in 1.4s (ease river), as if the river is drawn in gold, then the light pulse starts |

**Performance rules**
- Lazy-load with `next/dynamic(..., { ssr:false })` after `requestIdleCallback` (fallback 1500ms) **and** only if tier ≠ low.
- The poster `ILL-01` (desktop) / `ILL-01m` (mobile) is the SSR'd LCP image (`priority`, AVIF). The canvas crossfades over it (600ms) once the first frame renders.
- `frameloop="demand"` when the hero is off-screen (IntersectionObserver), and pause when `document.hidden`.
- The JS budget for three + R3F + drei is ≤ 180 KB gzip, loaded only on Home and AI Agents. Import only `Environment`, `Lightformer`, `useTexture` from drei.
- Target 60fps on an M1 MacBook and ≥ 45fps on a mid Android (Pixel 6a class). If the average FPS is under 40 for 2s, drop to the matcap material, then to the poster.

---

## 4. The River line (`components/motion/RiverPath.tsx`): M-RIVER

A single continuous gold line that runs the length of each page, connecting sections like the river connecting the land. **It's the signature of the site.**

**Construction (desktop ≥ 1024px)**
1. Sections that the river should pass through carry `data-river-node="left|right|center"` and optional `data-river-loop="true"`.
2. On mount and on (debounced) resize, measure each node's anchor point: the vertical centre of the section's heading, and an x position in the gutter (`left` = container left − 40px, `right` = container right + 40px, `center` = 50%).
3. Build an SVG path (absolute, full document height, `pointer-events:none`, z-index under content but over backgrounds):
   - It starts **off-screen top** (y = −40) continuing the hero mark's exit.
   - Between nodes: smooth cubic Béziers (control points at 45% of the vertical distance), drifting between gutters.
   - At nodes with `data-river-loop`: insert a **teardrop loop** using the mark's own loop proportions. Take the loop segment from `pdn-mark-centerline.svg` (the lower-right loop, between the 2nd and 3rd crossings), scale it to 120–180px, and rotate it to match the travel direction.
   - It ends **off-screen right** after the final section (`HOME.CLOSER`: the river exits).
4. Stroke: `#d4af37`, width 1.5px (desktop), `stroke-linecap: round`, opacity 0.9. A second blurred copy (`filter: blur(6px)`, opacity 0.35) gives a soft glow.

**Animation**
- `strokeDasharray = strokeDashoffset = totalLength`. ScrollTrigger on `document.body` with `start: "top top"`, `end: "bottom bottom"`, `scrub: 0.6`. Map progress → `dashoffset = totalLength × (1 − p)`, but **lead the viewport**: the drawn head sits at 65% of the viewport height, so the line is always drawing just ahead of where the reader is looking.
- **Head glow:** a 10px gold dot plus a 40px radial glow positioned at `getPointAtLength(drawnLength)` every scroll tick (rAF-throttled).
- At each loop node, when the head passes through, the section's eyebrow rule (the 28px gold line) "lights up" (opacity .4→1, 400ms). The river visibly connects to the content.

**Mobile (< 1024px):** a 1px line 16px from the left edge, running straight down with a small loop (40px) at the start of each `data-river-node` section, drawn with the same scrub logic. The head glow is 6px. On low tier it renders static and fully drawn at 40% opacity.

**Per-page node plan**
| Page | Nodes (in order, side, loop?) |
|---|---|
| Home | PAIN (left, loop) → SHOWREEL (center) → SHIFT 01/02/03 (right/left/right, loop at 02) → AUDIENCE (left) → WORK (right, loop) → PROCESS (center: special, see M-RIVER-STEPS) → PRICING (right) → FAQ (left) → BOOK (left, **big loop encircling the form card**) → CLOSER (exit right) |
| Services | each service panel alternates sides, loop at each |
| About | STORY (the river becomes the landscape river in ILL-13, see M-STORY) → VALUES → TEAM → exit |
| Case study | HERO → CHALLENGE → SOLUTION (loop) → RESULT (loop) → NEXT (exit) |
| Insights / Article | simplified: left gutter only, no loops (reading comfort) |

### M-RIVER-STEPS (Home process)
In the process section, the River switches to a horizontal run on desktop (vertical on mobile): it enters at step 1, **loops around each step number** (a circle drawn as a loop), and travels to the next. Scrubbed from `top 70%` to `bottom 60%`. Each number fills gold when its loop completes.

### M-RIVER-EXIT (Home closer)
As the closer enters, the River sweeps across under the display line (an underline that becomes the river) and exits off the right edge. The brand line fades in after it.

### M-RIVER-BOOK
Around the booking form card, the river draws a full encircling loop (a rounded rectangle with one teardrop flourish at the top-right corner) as the section enters. It's the "your business, encircled by PDN" moment, drawn once, not scrubbed.

---

## 5. Section-specific choreography

### Showreel block (Home)
ScrollTrigger scrub from `top bottom` to `top 20%`: wrapper `scale 0.86→1`, `border-radius 28px→0` (desktop; mobile 0.92→1, radius 20→12). The video plays only while in view (IntersectionObserver) and pauses outside. On click, a FLIP animation expands the frame to a fullscreen modal (600ms, river), sound on, using `VID-showreel-full`.

### M-PIN-OUTCOMES (Home, desktop ≥ 1024)
Pin the section for 300vh. Left column: the 3 text blocks scroll naturally. Right column (pinned): the 3 illustrations stacked. Each crossfades with a mask wipe that follows the river direction (`clip-path` polygon sweeping diagonally, 800ms) when its text block reaches the centre. A slow scale of 1.05→1 runs on the active image. The numerals 01/02/03 count in. On mobile there's no pin: stacked, with each image revealed with M-REVEAL.

### Pain cards
Desktop: cards tilt toward the cursor (max 4°, perspective 1000px, `quickTo`). Mobile: a horizontal snap carousel with momentum, and the active card scales 1 while others are 0.94. A swipe hint (a small arrow nudge) shows once.

### Audience tabs
Tab change: the outgoing panel fades and slides 12px left (250ms), the incoming panel slides from 12px right (400ms, expoOut). The gold active pill slides between tabs (shared layout with a FLIP).

### Work grid
Card images parallax inside their frames (`yPercent −8→8`, scrubbed). Hover (desktop): the image scales 1.04, and a muted preview video crossfades in if `previewVideo` exists in Sanity.

### Services strip
Desktop hover on a row: the row's illustration (transparent PNG) follows the cursor within the row bounds (`quickTo`, 0.5s), rotating ±6° with velocity. Other rows dim to 40%. The arrow draws.

### Stats
Count up from 0 with `expoOut`, 1600ms, on enter, using tabular numbers to avoid jitter.

### Testimonials
Embla carousel (or similar), drag with momentum, autoplay off. Active slide 100%, others 50% opacity.

### Logo marquee
CSS-only (transform: translateX), duplicated track, 40px/s, pauses on hover, static under reduced motion.

### M-STORY (About: the River story)
Pin for 400vh. `ILL-13` full-bleed, with a slow camera push (scale 1.0→1.15 across the pin). Four text beats fade in and out (each ~25% of the pin). Beat 2 crossfades to `ILL-14`. Beat 3 draws the mark centre-line huge over the image (stroke 2px, gold). Beat 4 shrinks the drawn mark into the page River line, which carries on down the page. A seamless handover.

### Thank-you
The mark centre-line draws (1.2s), then the end of the line continues into a check mark (an extra path segment), and the headline reveals. Confetti-free: elegant, not playful.

### 404
`ILL-02` with a slow parallax on pointer, and a small River line wandering in a random gentle loop (Perlin offset) that never settles.

---

## 6. Video on the site

| ID | File (rendered by Remotion, `08`) | Where | Specs |
|---|---|---|---|
| `VID-hero-loop` | `/public/video/hero-loop-1920x1080.{webm,mp4}`, `hero-loop-1080x1920.{webm,mp4}` | Hero fallback (mid-low tier with good connection) | 8s seamless, silent, ≤ 1.5 MB |
| `VID-showreel-loop` | `/public/video/showreel-loop-1920x1080.{webm,mp4}`, `showreel-loop-1080x1350.{webm,mp4}` | Home showreel block | 12s seamless, silent, ≤ 3 MB |
| `VID-showreel-full` | `/public/video/showreel-1920x1080.mp4` (+ HLS optional) | Modal | 60s, with audio |
| `SR-POSTER` | `/public/video/showreel-poster.avif` | Poster for both | `renderStill` at frame 640 |

Use `<video muted playsInline loop preload="none" poster=...>` and set `src` when the element is within 1 viewport (IntersectionObserver). Use `<source>` with WebM first, then MP4.

---

## 7. Reduced motion & accessibility checklist
- [ ] `prefers-reduced-motion: reduce` → no Lenis, no preloader, no 3D float/rotation (static poster), the River fully drawn, no parallax/scrub/pin (sections stack normally), reveals become a 200ms opacity fade, carousels have no autoplay, the cursor is off
- [ ] Every pinned section also works without pinning (content order intact)
- [ ] Focus is never trapped by the cursor or overlays. The modal traps focus correctly and Esc closes it
- [ ] No content flashes more than 3 times per second
- [ ] Videos have a pause control. The showreel modal has captions (`.vtt` from the VO/super text)
