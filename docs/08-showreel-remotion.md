# 08 — Showreel & Video (Remotion)

Everything video is built in **Remotion** in `/showreel`, from:
- ChatGPT image layers (`assets/showreel/stills`, `assets/illustrations`), see `05` §7
- Real client screen recordings and team b-roll (`06`)
- Code: the River line, the 3D gold tube (same geometry as the site hero), type, device frames, transitions, grain
- Licensed music (§6)

**Creative idea:** *"What are they seeing?"* The reel opens on the question the home page asks, follows the gold river through PDN's work, and resolves into the mark and the brand line. It's both a capability showcase and an ad.

---

## 1. Compositions to build

| ID | Size | FPS | Duration | Audio | Purpose | Output |
|---|---|---|---|---|---|---|
| `Showreel` | 1920×1080 | 30 | 60s (1800f) | music (+ optional VO) | Flagship reel: site modal, pitches, YouTube | `public/video/showreel-1920x1080.mp4` |
| `ShowreelVertical` | 1080×1920 | 30 | 30s (900f) | music + burned-in captions | Reels, Stories, TikTok, Meta ads | `public/video/showreel-1080x1920.mp4` |
| `ShowreelFeed` | 1080×1350 | 30 | 30s (900f) | music + captions | Instagram/Facebook feed ads (4:5) | `public/video/showreel-1080x1350.mp4` |
| `AdCut15` | 1080×1920 | 30 | 15s (450f) | music + captions | Conversion ad, direct to "Book a free call" | `public/video/ad-15s-1080x1920.mp4` |
| `ShowreelLoop` | 1920×1080 and 1080×1350 | 30 | 12s (360f) | none | Home showreel block (silent, seamless) | `public/video/showreel-loop-*.{webm,mp4}` |
| `HeroLoop` | 1920×1080 and 1080×1920 | 30 | 8s (240f) | none | Hero fallback for mid/low tier | `public/video/hero-loop-*.{webm,mp4}` |
| `LogoSting` | 1920×1080 and 1080×1920 | 30 | 4s (120f) | sting SFX | Intros and outros for social videos | `public/video/logo-sting-*.mp4` |
| `Poster` (still) | 1920×1080 | — | frame 640 of `Showreel` | — | Video posters | `public/video/showreel-poster.avif` |

Shared props schema (zod, `src/schema.ts`): `{ clients: ClientClip[]; stats: Stat[]; domain: string; showVO: boolean; captions: boolean }`. Load the default props from `showreel/data/reel.json`. The team edits this file (client names, one-line results, which recordings to use) without touching code.

```jsonc
// showreel/data/reel.json (example — fill with REAL clients only)
{
  "domain": "{{DOMAIN}}",
  "showVO": false,
  "captions": true,
  "clients": [
    { "slug": "client-one", "name": "Client One", "tag": "Website", "result": "{{one-line real result}}",
      "desktop": "screen-recordings/client-one-desktop.mp4", "mobile": "screen-recordings/client-one-mobile.mp4" }
  ],
  "stats": [ { "value": 0, "suffix": "+", "label": "Projects delivered" } ]  // hide stats with value 0
}
```

---

## 2. Project setup

```
showreel/
├─ package.json            # remotion, @remotion/cli, @remotion/paths, @remotion/three,
│                          # @remotion/transitions, @remotion/media-utils, @remotion/zod-types,
│                          # three, @react-three/fiber, zod
├─ remotion.config.ts      # Config.setVideoImageFormat('jpeg'); Config.setConcurrency(…)
├─ public/ → symlink or copy of ../assets (staticFile() reads from here)
│   + brand/ (logos, fonts)
├─ data/reel.json
└─ src/
   ├─ index.ts             # registerRoot(Root)
   ├─ Root.tsx             # all <Composition>s and the <Still> poster
   ├─ tokens.ts            # re-export colours/eases from ../../lib/tokens (single source of truth)
   ├─ timing.ts            # BPM grid helpers (§6)
   ├─ fonts.ts             # load Quirkfy + Bricolage via FontFace + delayRender
   ├─ compositions/        # Showreel.tsx, ShowreelVertical.tsx, ShowreelFeed.tsx, AdCut15.tsx,
   │                       # ShowreelLoop.tsx, HeroLoop.tsx, LogoSting.tsx
   ├─ scenes/              # S1ColdOpen … S9Resolve (each takes durationInFrames + layout: 'h'|'v'|'f')
   └─ components/
      ├─ RiverLine.tsx      # draws #pdn-river via @remotion/paths evolvePath()
      ├─ GoldTube3D.tsx     # @remotion/three <ThreeCanvas> reusing ../../components/three geometry
      ├─ KineticType.tsx    # line/word mask reveals
      ├─ DeviceFrame.tsx    # laptop + phone frames (same design as site), <OffthreadVideo> inside
      ├─ Parallax.tsx       # 2.5D layer stack with per-layer depth
      ├─ LightLeak.tsx      # TEX-05 with mixBlendMode 'screen', animated x/opacity
      ├─ GoldDust.tsx       # procedural particles (seeded random) or SR-05 overlay
      ├─ Grain.tsx          # animated grain (TEX-01, offset per frame, opacity .07, overlay)
      ├─ Counter.tsx
      ├─ LogoReveal.tsx
      ├─ Captions.tsx       # burned-in captions for vertical/feed cuts
      └─ transitions/riverWipe.tsx  # custom TransitionPresentation (§4)
```

**Fonts** (`fonts.ts`): `new FontFace('Quirkfy', `url(${staticFile('brand/fonts/Quirkfy.woff2')})`)`. Wrap in `delayRender`/`continueRender` and do the same for Bricolage Grotesque. Fall back to Bricolage 800 for display if Quirkfy is missing (log a warning).

**Motion vocabulary in Remotion**
- Easing: `Easing.bezier(0.65, 0, 0.35, 1)` = **river** (lines, camera, wipes). `Easing.bezier(0.16, 1, 0.3, 1)` = **expoOut** (type and element entrances).
- Springs only for small pops: `spring({ frame, fps, config: { damping: 200, mass: 0.8 } })` (no overshoot).
- **Camera** is never static. Every still layer has a slow drift (scale +3–6% over the shot, or x/y 20–40px), so the reel always breathes.
- **Type:** Quirkfy display for supers, ivory `#f5f1e8`, with the one gold phrase per super. Lines reveal by mask (`translateY 110%→0`, 18 frames, expoOut, stagger 4 frames). Exits are a fast mask-up (10 frames).
- **Grain** on every frame (top layer). A slight vignette (radial onyx 0→35% at the edges).

**RiverLine.tsx**
```tsx
import { evolvePath } from "@remotion/paths";
// d = the #pdn-river path string from brand/logos/pdn-mark-centerline.svg (viewBox 756x780)
const progress = interpolate(frame, [start, end], [0, 1], { easing: river, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);
// <path d={d} stroke="#d4af37" strokeWidth={57} fill="none" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}/>
// Add a glow copy: same path, strokeWidth 57, filter blur(18px), opacity .45
// Head glow: getPointAtLength(getLength(d) * progress) → radial gold circle
```
At `progress = 1` with stroke width 57, the line *is* the mark. That's the logo resolve trick in S9.

**GoldTube3D.tsx:** import the tube geometry builder and material from the website (`../../components/three/river-geometry.ts`) so the reel and the site hero are the same object. Use `<ThreeCanvas linear width height>`. Animate rotation and the flow-shader `uTime` **from `useCurrentFrame()`**, never from a clock, so renders are deterministic. Use the matcap material for render speed, with an optional physical material for final renders.

---

## 3. `Showreel`: scene by scene (60s @ 30fps)

Times are in seconds and frames. "Beat" = one music beat (see §6). Final cut points snap to the nearest beat. Supers are the on-screen text, verbatim.

### S1 · Cold open (0:00–0:04 · f0–120)
- **Visual:** black. At f10, `SR-01` (tube macro) fades up from black over 30f, with a slow push-in (scale 1.0→1.08 over the scene) and a slight x drift (−30px). At f40, a light sweep travels along the top edge of the tube (an animated gradient mask, `TEX-05` screen-blended moving left→right over 50f).
- **Overlay:** `RiverLine` starts drawing at the top edge (thin, 3px), from f60 to f120, from the top centre downward. It's the first stroke of the river.
- **Sound:** low riser, first soft hit at f120.
- **Supers:** none.

### S2 · The question (0:04–0:09 · f120–270)
- **Visual:** hard cut on the beat to `SR-02` (tube loop) with Parallax: background haze layer 0.4× and the tube layer 1×. Camera drifts up 30px. Gold dust overlay.
- **Supers** (centred, display size, stacked):
  - f130: `Customers check you online`
  - f160: `before they pay you.`
  - f200: **`What are they seeing?`** (gold, with a sheen sweep at f215)
  - Exit all lines at f258 (mask up).

### S3 · The problem (0:09–0:14 · f270–420)
- **Visual:** pure onyx with grain. Three quick "pain" cards, each a large quote in Bricolage 600 ivory on onyx with a thin gold quote glyph. Each lasts 1.5 beats, hard cuts on beats, with a slight scale-in 1.04→1.
  - `"Here's my Instagram link."`
  - `"Nothing shows up on Google."`
  - `"Zero enquiries this month."`
- On the last card, the text **desaturates and slides down out of frame** (river ease, 15f) and the frame cuts to black for 4f. Tension.

### S4 · The river (0:14–0:20 · f420–600)
- **Visual:** the `SR-04` parallax landscape. Layers: `04a` bg (0.2×), `04b` mid river (0.6×), `04c` fg rocks (1.2×). A camera dolly forward and up: scale 1.0→1.18, y +60→−40 across the scene. `RiverLine` (2px, glow) traces the path of the painted river, then the shot pushes into the gold.
- **Supers:**
  - f450 (eyebrow, small caps, gold, letter-spaced): `PISHON DIGITAL NETWORK`
  - f470: `We turn ideas into digital experiences`
  - f500: **`that grow businesses.`**
- **Transition:** at f585–600 a **riverWipe** (§4) into S5, landing exactly on the **drop** (f600).

### S5 · The work (0:20–0:36 · f600–1080), the drop
The heart of the reel: **real client work.** Up to 4 clients × 120f (4s) each. With fewer clients, divide 480f equally (min 2 clients; with 1 client, run 240f and extend S6).
- **Each client segment:**
  - Background `SR-03` (onyx stage) with a slow push.
  - The `DeviceFrame` laptop slides in from below onto the plinth (y 120→0, 24f, expoOut), playing `<client>-desktop.mp4` from 2s in (`startFrom={60}`) at 1.25× speed.
  - At +10f, the phone frame slides in from the right, overlapping the laptop's right corner (x 200→0, 24f), playing `<client>-mobile.mp4`.
  - Supers, bottom-left safe area: tag (`Website` / `Online store` / `AI agent`) as a small gold chip; the client name (h2 Quirkfy); the one-line result (Bricolage, stone).
  - Exit: a riverWipe to the next client (on the beat).
- **Optional speed-ramp:** in the first client, the screen recording jumps 3s forward in a 6f motion-blurred push (scale 1.06 + directional blur), on a beat.
- **Captions/supers source:** `reel.json → clients[]`.

### S6 · What we do (0:36–0:44 · f1080–1320)
- **Visual:** onyx with the `GoldTube3D` passing through the frame diagonally, rotating slowly (in all 3 sub-scenes, continuous, so the tube "connects" the services). The service sculptures (transparent PNGs) float centre-right with parallax (y float ±10px sine, slow rotation ±3°).
  - f1080–1160: `ILL-06`, super **`Websites`** with sub `that win trust`
  - f1160–1240: `ILL-07`, super **`AI Agents`** with sub `that answer 24/7`
  - f1240–1320: `ILL-08`, super **`Digital Products`** with sub `built to launch`
- Each switch: the sculpture swaps with a scale 0.9→1 plus a blur 8→0 (14f), and the super line swaps with a mask.

### S7 · The team (0:44–0:50 · f1320–1500)
- **Visual:** real team b-roll (`assets/showreel/broll/*.mp4`) and photos (`assets/photos/team`, `office`). A grid mosaic assembles: 6 tiles fly in from depth (z, scale 0.6→1, stagger 4f) into a 3×2 grid, each tile a b-roll clip or a Ken Burns photo. Then the camera pushes into one tile (the team group shot), which fills the frame.
- **Supers:** f1360: `Made in Lagos.` · f1390: **`Built for the world.`**
- **Fallback** if there's no b-roll yet: use `SR-07` (network) with the supers. Never use generated people.

### S8 · Proof (0:50–0:54 · f1500–1620)
- **Visual:** `SR-07` (network of loops) with a slow orbit, plus counters (`Counter.tsx`) for each real stat in `reel.json` (max 3, count-up 30f, expoOut, tabular numerals, gold suffix).
- **If there are no stats:** show a real testimonial quote instead (a short ≤ 15-word excerpt, client name and company).
- **If neither exists:** skip S8 and give its 120f to S5.

### S9 · Resolve (0:54–1:00 · f1620–1800)
- f1620: cut to onyx with the faint official radial gradient (onyx centre → gold edge at 25% opacity).
- f1625–1700: **`RiverLine` draws the full mark centre-line** at logo scale (stroke 57 in viewBox units) using evolvePath. The head glow leads. The music builds.
- f1700–1712: the drawn line crossfades to the filled `pdn-mark-gold.svg`. It's pixel-identical, so the eye sees one continuous object.
- f1712–1740: the mark scales down and moves left as the **horizontal logo lockup** (`pdn-logo-horizontal-gold.svg`) wordmark wipes in from left to right (mask). Final hit on the beat.
- f1740: the brand line fades up under the logo: `Because the future belongs to businesses built for it.` (Bricolage 400, stone).
- f1760: CTA: `Book a free call · {domain}` (gold chip).
- Hold to f1800. The last 10f fade to onyx.

---

## 4. Transitions

**riverWipe** (`@remotion/transitions` custom presentation, 15–20f): a thick gold stroke (path = a wide S-curve across the frame, stroke width 140% of frame height) draws from left to right with river easing, covering the outgoing scene. Its trailing edge reveals the incoming scene, and the gold stroke thins and exits right. Think of a river of gold washing across the frame. Use it for S4→S5, between clients, and S6→S7.

**Light leak cut:** a hard cut on the beat with `TEX-05` screen-blended over 8f (opacity 0→0.9→0, x sweeping 30%). Use it for S2→S3 and S7→S8.

**Black dip:** 4–6f of pure onyx for tension (S3→S4).

Never use: spins, cubes, zooms with blur trails, glitch effects or default slide transitions.

---

## 5. Cut-downs

### `ShowreelVertical` (30s · 1080×1920 · 900f)
Same scenes re-laid for 9:16 (each scene component takes `layout="v"`):
| Scene | Frames | Notes |
|---|---|---|
| S1 Cold open | 0–60 | `SR-01-v` |
| S2 Question | 60–195 | Supers larger, 3 lines, centred in the top 60% |
| S3 Problem | 195–285 | 2 cards only (Instagram, Google) |
| S5 Work | 285–615 | 2–3 clients, **phone frame only**, full-height and big. Laptop omitted |
| S6 Services | 615–735 | 3 × 40f, sculptures large, supers below |
| S9 Resolve | 735–900 | Stacked lockup (mark above the wordmark: build from the mark SVG + wordmark crop, or use horizontal at 80% width) + brand line + CTA |

**Safe zones (Meta Reels/Stories):** keep text out of the top 14% (250px) and bottom 20% (380px), and the right 12% (UI buttons). Put a guide overlay in Remotion Studio only (`showGuides` prop).
**Captions:** `Captions.tsx`, burned in, Bricolage 700, 48px, ivory, on a soft onyx 60% pill. They show the supers/VO text, because most people watch muted.

### `ShowreelFeed` (30s · 1080×1350)
Same as Vertical, with a 4:5 layout. Phone plus a cropped laptop is fine. Safe zone: 5% all round.

### `AdCut15` (15s · 1080×1920 · 450f): conversion ad
| Frames | Content | Supers |
|---|---|---|
| 0–75 | Hook over `SR-02-v` | `Customers check you online before they pay you.` → gold **`What are they seeing?`** |
| 75–255 | 2 clients, phone frames, fast (90f each) | client name + result |
| 255–330 | Services triplet, 25f each, sculptures | `Websites · AI Agents · Digital Products` |
| 330–450 | Resolve: mark draws (fast, 40f), then the logo, then a **gold button graphic** `Book a free call` that pulses once (scale 1→1.04→1) | `Free 20-minute call` |

### `ShowreelLoop` (12s, silent, seamless)
For the home page block. S5-style client montage (3 clients × 4s, laptop + phone on `SR-03`) with the River line passing through. **Seamless loop:** frame 359 must match frame 0. The River line's phase is `(frame / 360)` mod 1, and the first client segment starts the same way the last one ends (crossfade the last 15f into the first frame state). No supers, except a small client name chip.

### `HeroLoop` (8s, silent, seamless)
`GoldTube3D` centred-right on a transparent/onyx background, the same framing as the site hero.
- f0–90: the tube `drawRange` 0→1 (the river draws in gold), river ease.
- f90–180: hold, with a light-flow pulse travelling along it, and a gentle rotation ±6°.
- f180–240: the tube "undraws" from its start (drawRange start 0→1). Fully gone at f240 = the same as f0, so it's seamless.
Render a WebM with alpha (VP9, `--pixel-format=yuva420p`) for overlaying on the poster glow, plus an MP4 on onyx as a fallback.

### `LogoSting` (4s)
`RiverLine` draws the mark (f0–60), crossfades to the filled mark (f60–70), the wordmark wipes in (f70–95), hold, fade out (f110–120). Sound: a soft riser into a warm gold "shimmer" hit at f70.

---

## 6. Sound

**Music brief** (license from Artlist, Epidemic Sound or Musicbed, or generate with an AI music tool whose licence allows commercial ads):
- 100–110 BPM, about 60s with a natural edit point at 30s.
- **Feel:** cinematic, minimal, confident, with modern electronic warmth and subtle Afro-percussive textures (shakers, a soft log-drum or talking-drum accent). Global, not cliché.
- **Structure:** 0–14s sparse and tense (pads, pulse), 14–20s build, **drop at 0:20**, full groove through 0:44, lift at 0:44–0:54, then a resolving final hit around 0:56 with a ring-out.
- Avoid: EDM drops, ukulele/corporate-happy, generic stock "inspiring piano".
- Save as `assets/showreel/audio/music.mp3`. Put the BPM in `reel.json` (`"bpm": 104`).

**Beat grid** (`timing.ts`):
```ts
export const framesPerBeat = (fps: number, bpm: number) => (fps * 60) / bpm; // 30fps @104bpm ≈ 17.31f
export const beat = (n: number, fps = 30, bpm = BPM, offset = FIRST_BEAT_FRAME) => Math.round(offset + n * framesPerBeat(fps, bpm));
```
Scene boundaries in §3 are targets. Snap them with `beat(n)` once the track is chosen. Run `getAudioData` + `visualizeAudio` in Remotion Studio to find `FIRST_BEAT_FRAME`.

**SFX** (`assets/showreel/audio/sfx/`): `whoosh-soft.wav` (riverWipe), `shimmer.wav` (logo resolve), `tick.wav` (counters, very quiet). Use a licensed SFX pack.

**Optional voice-over** (`showVO: true`, file `assets/showreel/audio/vo.mp3`). A warm, confident voice with a neutral international accent:
> "Your customers check you online before they pay you. What are they seeing? … We're Pishon Digital Network. We build websites, AI agents and digital products that make people trust you, find you, and choose you. … Because the future belongs to businesses built for it. Book a free call."

Duck the music −8 dB under the VO (Remotion `<Audio volume={(f) => …}>`).

---

## 7. Rendering

```bash
cd showreel
pnpm remotion studio                                   # preview & tweak
pnpm remotion render Showreel        ../public/video/showreel-1920x1080.mp4   --codec=h264 --crf=18
pnpm remotion render ShowreelVertical ../public/video/showreel-1080x1920.mp4  --codec=h264 --crf=18
pnpm remotion render ShowreelFeed    ../public/video/showreel-1080x1350.mp4   --codec=h264 --crf=18
pnpm remotion render AdCut15         ../public/video/ad-15s-1080x1920.mp4     --codec=h264 --crf=18
pnpm remotion render ShowreelLoop-H  ../public/video/showreel-loop-1920x1080.webm --codec=vp9 --crf=32
pnpm remotion render ShowreelLoop-H  ../public/video/showreel-loop-1920x1080.mp4  --codec=h264 --crf=26
pnpm remotion render ShowreelLoop-F  ../public/video/showreel-loop-1080x1350.webm --codec=vp9 --crf=32
pnpm remotion render HeroLoop-H      ../public/video/hero-loop-1920x1080.webm --codec=vp9 --pixel-format=yuva420p --crf=30
pnpm remotion render HeroLoop-V      ../public/video/hero-loop-1080x1920.webm --codec=vp9 --pixel-format=yuva420p --crf=30
pnpm remotion still  Poster          ../public/video/showreel-poster.png && npx sharp-cli -i ../public/video/showreel-poster.png -o ../public/video/showreel-poster.avif
```
Wrap these in `pnpm showreel:render` (root `package.json`).

**Quality checks before publishing**
- [ ] Every client shown has given permission. Every stat and result is real
- [ ] Logo lockup appears unaltered (no tilt or recolour) in S9 and the sting
- [ ] Text never sits in the vertical safe zones. Captions are on for the vertical and feed cuts
- [ ] Loops are seamless (play 3× in a row and watch the seam)
- [ ] Loudness about −14 LUFS (social) and true peak ≤ −1 dBTP
- [ ] File sizes: loops ≤ 3 MB, hero loop ≤ 1.5 MB, full reel ≤ 40 MB
