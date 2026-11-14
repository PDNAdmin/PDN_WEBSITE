# 05 — Asset Creative Direction & ChatGPT Prompts

Who does what:
- **ChatGPT (image generation):** illustrations, textures, matcaps and showreel image layers. Prompts are below.
- **Claude Code:** icons (SVG in code, spec in `02-design-system.md` §5), device frames, OG images, grain, all motion and the showreel edit (Remotion, `08`).
- **The PDN team:** real photos and real client material (`06-photography.md`), and the music licence.

Every generated file goes into `/assets/...` with the **exact filename** from the manifest in §9. Claude Code reads only those names.

---

## 1. Art direction: "Onyx & Gold Sculpture"

One visual world for every generated image. If an image could belong to another brand, regenerate it.

**The world:** a dark, silent studio where precious objects float or rest on stone. It's like a jeweller's vault at night, or a museum piece under one spotlight.

**Materials (only these):**
- **Onyx:** matte-to-satin black stone, near `#0f0f10`. Very subtle dark-grey veining, soft micro-texture, never glossy plastic.
- **Gold:** polished and brushed gold, warm champagne-to-antique, as close as possible to `#d4af37`. *Not* yellow, orange, rose or brassy.
- **Light:** the only "third material". Warm gold-tinted light, soft volumetric haze, fine floating dust.

**The hero motif, the River tube:** a smooth, continuous gold tube of constant thickness that flows through space in loops and curves, like the PDN mark drawn in 3D. It always enters from one edge of the frame and leaves through another; it never starts or ends inside the frame. When an image needs the exact PDN mark shape, attach `brand/logos/png/pdn-mark-gold.png` as a reference and say "follow the path of the attached line".

**Lighting:** low-key, one warm key light (top-left or top-right) with a gold-tinted rim light, and deep falloff into pure black. High contrast with soft shadows. A subtle haze makes the light visible.

**Camera:** like a high-end product photograph or 3D render. 50–100mm lens feel, shallow depth of field for macros, and a calm, centred or rule-of-thirds composition with **lots of negative space** for text.

**Finish:** photoreal 3D render quality with fine film grain, editorial and premium.

**Always avoid:** text, letters, numbers, logos, watermarks, people, faces, hands, screens showing UI, neon, blue or purple tints, cyberpunk, clutter, cartoon or flat vector style, glossy plastic, chrome or silver, rainbow reflections, lens flare stars, and busy backgrounds.

---

## 2. How to generate consistently in ChatGPT

1. **Create a ChatGPT Project** called "PDN Assets". Paste the Master Style Block (§3) into the project's instructions, so every chat in the project inherits it.
2. **Generate the anchor first:** `ILL-01` (the hero sculpture). Regenerate until it's perfect. That image becomes the **style reference** for everything else.
3. For every other prompt, **attach `ILL-01`** (and the mark PNG when the River shape matters) and keep the line *"Match the materials, lighting, colour and finish of the attached reference image exactly."* (already included in each prompt).
4. **Sizes:** use the aspect stated for each prompt. Landscape 1536×1024, portrait 1024×1536, square 1024×1024. Ask for the highest quality setting.
5. **Transparent backgrounds:** when a prompt says *transparent*, ChatGPT can output a PNG with alpha. Check that edges are clean and that there's no leftover dark halo. If there is, regenerate, or ask: "same image, transparent background, no shadow".
6. **Review checklist before saving:**
   - Does the gold look like the brand gold (`#d4af37`), not yellow?
   - Is the black truly deep, with no grey fog?
   - No text, people or logos?
   - Is there negative space where the layout needs copy?
   - Does it look like it belongs with `ILL-01`?
7. **Save** with the exact manifest filename into the folder shown. Keep the originals. Claude Code makes the web versions.
8. **Variations:** where a prompt says "make 3", save the best as the manifest name and keep the others as `-alt1`, `-alt2` in the same folder.

---

## 3. Master Style Block (paste into the ChatGPT Project instructions)

```
You generate images for Pishon Digital Network (PDN), a premium global digital studio.
Visual world "Onyx & Gold Sculpture": photoreal 3D still-life in a dark silent studio.
Materials: matte-to-satin onyx black stone (#0f0f10, faint dark veins) and polished/brushed warm
champagne-antique gold (as close to #d4af37 as possible — never yellow, orange, rose or brass).
Signature motif: the "River" — a smooth continuous gold tube of constant thickness flowing in
graceful loops, entering and leaving the frame, never ending inside it.
Lighting: low-key, single warm key light + gold rim light, deep falloff to pure black, soft haze,
fine floating dust. Camera: high-end product photography, 50–100mm, shallow depth of field.
Composition: calm, generous negative space for typography. Finish: editorial, fine film grain.
Never include: text, letters, numbers, logos, watermarks, people, faces, hands, UI screens, neon,
blue/purple tints, cyberpunk, clutter, cartoon/flat vector, plastic, chrome/silver, lens-flare stars.
Backgrounds are pure deep black (#0f0f10) unless asked for transparent.
```

---

## 4. Website illustrations (ILL)

> Each prompt is complete. Attach `ILL-01` as reference for every prompt after ILL-01.

### ILL-01 · Hero sculpture (anchor) · landscape 1536×1024 → `assets/illustrations/ILL-01_hero-river-sculpture.png`
Used as: the poster and fallback for the 3D hero, the OG background and the showreel layer.
```
A single continuous polished gold tube, constant thickness, flowing through space in the exact
looping path of the attached line drawing (a tall stem coming down from the top edge, a small
upper loop, then two larger teardrop loops, then a long straight run exiting the right edge).
The tube floats above a low, wide slab of matte onyx stone; a soft gold reflection glows on the
stone beneath it. Place the sculpture on the right two-thirds of the frame; the left third is
empty deep black for a headline. Warm key light from the top right, gold rim light along the
tube's edges, faint haze and dust in the light. Photoreal 3D product render, 85mm, crisp focus
on the loops, gentle falloff to pure black #0f0f10. No text, no people, no logos.
```
Make 3. Pick the one where the loop shape reads most clearly as the PDN mark.

### ILL-01m · Hero sculpture, mobile · portrait 1024×1536 → `assets/illustrations/ILL-01m_hero-river-sculpture-mobile.png`
```
Same sculpture, materials and lighting as the attached reference image: the continuous gold tube
in the looping path of the attached line, floating above an onyx slab. Portrait composition:
sculpture in the upper 55% of the frame, slightly cropped by the right edge; the lower 45% is
calm deep black with only a faint gold reflection, leaving space for text. Match the materials,
lighting, colour and finish of the attached reference image exactly.
```

### ILL-02 · 404 "lost river" · landscape 1536×1024 → `assets/illustrations/ILL-02_404-lost-river.png`
```
A thin continuous gold tube flows across a vast dark onyx plateau and disappears over the edge
into soft black haze, as if the river has wandered off the map. Wide, quiet, cinematic, lots of
empty black sky above. One warm light grazing the tube. Match the materials, lighting, colour
and finish of the attached reference image exactly. No text, no people.
```

### ILL-03 · Outcome "Trust" · square 1024×1024 → `assets/illustrations/ILL-03_outcome-trust.png`
```
A heavy, perfectly cut onyx cube resting on an onyx floor. A single polished gold tube wraps once
around the cube like a ribbon sealing a precious gift, the tube entering from the left edge of
the frame and leaving at the right. The gold casts a warm glow on the stone faces. Feeling: solid,
safe, valuable, trustworthy. Centered, generous black space around. Match the materials, lighting,
colour and finish of the attached reference image exactly. No text, no logos.
```

### ILL-04 · Outcome "Found" · square 1024×1024 → `assets/illustrations/ILL-04_outcome-found.png`
```
Seen from a three-quarter top-down angle: a grid of many identical small matte onyx tiles
stretching into darkness. Hovering above them, a polished gold ring like a magnifying lens,
and through the ring exactly one tile is lit with warm gold light, glowing among the dark ones.
A thin gold tube loops through the ring and exits the frame. Feeling: being found among many.
Match the materials, lighting, colour and finish of the attached reference image exactly.
No text, no numbers.
```

### ILL-05 · Outcome "Paid / enquiries while you sleep" · square 1024×1024 → `assets/illustrations/ILL-05_outcome-night.png`
```
A slim crescent moon form carved from onyx, standing upright on an onyx slab at night. A thin
polished gold tube flows out from the inner curve of the crescent, loops once in the air and
continues out of the frame on the right. Along its path, three small glowing gold spheres travel
like messages arriving. Deep night atmosphere, very dark, a calm warm glow.
Match the materials, lighting, colour and finish of the attached reference image exactly.
No text, no stars as lens flares.
```

### ILL-06 · Service "Websites" · square 1024×1024, transparent → `assets/illustrations/ILL-06_service-websites.png`
```
A floating thin rectangular onyx slab shaped like a minimal browser window (rounded corners,
a slim raised top bar, no UI, no text), slightly rotated in 3/4 view. A polished gold tube flows
in from the left edge, passes through an opening in the slab and loops out the other side.
Isolated object on a transparent background, no floor, soft gold glow on the slab edges only.
Match the materials, lighting, colour and finish of the attached reference image exactly.
```

### ILL-07 · Service "AI Agents" · square 1024×1024, transparent → `assets/illustrations/ILL-07_service-ai-agents.png`
```
A polished onyx sphere floating in space. A polished gold tube orbits it in a continuous loop,
and at one point the tube curls into the shape of a speech-bubble tail. Two small glowing gold
dots near the sphere suggest a conversation. Intelligent, calm, always-on. Isolated object on
a transparent background, no floor. Match the materials, lighting, colour and finish of the
attached reference image exactly.
```

### ILL-08 · Service "Digital Products" · square 1024×1024, transparent → `assets/illustrations/ILL-08_service-products.png`
```
Three thin onyx tiles of different sizes stacked with small gaps, floating, like layers of an
app. A polished gold tube winds between the layers, binding them together, entering and exiting
the composition. Precise, architectural. Isolated object on a transparent background, no floor.
Match the materials, lighting, colour and finish of the attached reference image exactly.
```

### ILL-09 · Service "Digital University" · square 1024×1024, transparent → `assets/illustrations/ILL-09_service-university.png`
```
An open book carved from onyx, pages fanned slightly, floating at a gentle angle. From between
the pages a polished gold tube rises and flows upward in a graceful loop and out of the frame,
like knowledge flowing out. Isolated object on a transparent background, no floor. Match the
materials, lighting, colour and finish of the attached reference image exactly. No text on pages.
```

### ILL-10 · Websites page hero · landscape 1536×1024 → `assets/illustrations/ILL-10_websites-hero.png`
```
Wide cinematic shot: several floating onyx browser-window slabs (no UI, no text) at different
depths, arranged in a gentle arc on the right side of the frame. One continuous gold tube flows
through all of them, connecting them, then exits the right edge. Left 40% empty deep black for
headline. Match the materials, lighting, colour and finish of the attached reference image exactly.
```

### ILL-11 · Insights hero · landscape 1536×1024 → `assets/illustrations/ILL-11_insights-hero.png`
```
A neat stack of thin onyx tablets, like pages of a journal, on the right side of the frame; the
top tablet slightly lifted. A thin gold tube flows out from between two tablets like a bookmark
ribbon and drifts off the frame. Left half empty black. Quiet, intellectual. Match the materials,
lighting, colour and finish of the attached reference image exactly. No text.
```

### ILL-12 · Book page hero · landscape 1536×1024 → `assets/illustrations/ILL-12_book-pedestal.png`
```
An empty, softly lit onyx pedestal on the right side of the frame, as if waiting for a precious
object. A polished gold tube flows in from the top edge, circles the pedestal once in a wide
loop, and exits the right edge. Inviting, expectant: "your business goes here". Left half
empty black. Match the materials, lighting, colour and finish of the attached reference image exactly.
```

### ILL-13 · About: the River landscape · landscape 1536×1024 (also make portrait 1024×1536 as `ILL-13m`) → `assets/illustrations/ILL-13_river-landscape.png`
```
Aerial view at night over a vast landscape of dark onyx stone hills and plains. A luminous river
of molten gold winds through the land in long graceful loops, encircling hills, entering from the
bottom edge and leaving at the top edge. Faint haze in the valleys, the gold reflecting softly on
the stone. Epic, mythic, calm. Match the materials, lighting, colour and finish of the attached
reference image exactly. No text, no people, no buildings.
```

### ILL-14 · About: gold and onyx · landscape 1536×1024 → `assets/illustrations/ILL-14_gold-and-onyx.png`
```
Macro still-life: raw gold nuggets and a polished piece of onyx stone resting on a dark onyx
surface, one warm spotlight from above, shallow depth of field, a thin gold tube curving through
the background out of focus. Precious, ancient, elegant. Match the materials, lighting, colour
and finish of the attached reference image exactly.
```

### ILL-15 · AI Agents hero: agent orb · landscape 1536×1024 → `assets/illustrations/ILL-15_agent-orb.png`
```
A large polished onyx sphere floating on the right side of the frame. Several thin gold tubes
orbit it at different angles in continuous loops; small glowing gold beads travel along the tubes
like messages. Subtle gold light emanates from behind the sphere. Left 40% empty deep black.
Intelligent, alive, calm. Match the materials, lighting, colour and finish of the attached
reference image exactly. No text, no faces, no robots.
```

---

## 5. Textures (TEX)

### TEX-01 · Film grain tile · square 1024×1024 → `assets/textures/TEX-01_grain-tile.png`
```
A seamless tileable texture of fine, even monochrome film grain on mid-grey (#808080), no pattern,
no vignette, no objects. Pure noise, like 35mm film grain at high magnification.
```
(If ChatGPT can't make it seamless, Claude Code generates it with `scripts/make-grain.mjs`. Either is fine.)

### TEX-02 · Onyx stone macro · landscape 1536×1024 → `assets/textures/TEX-02_onyx-macro.jpg`
```
Extreme close-up of a polished onyx black stone surface, almost black (#0f0f10), with very faint
smoky dark-grey veins and a soft satin sheen catching a warm light at one corner. Even, calm,
usable as a background texture. Match the materials and colour of the attached reference.
```

### TEX-03 · Brushed gold macro · landscape 1536×1024 → `assets/textures/TEX-03_brushed-gold.jpg`
```
Extreme close-up of brushed warm champagne gold metal (#d4af37), fine directional brushing,
soft gradient of light from left to right, subtle and elegant, no scratches, no text.
Usable as a background for product covers.
```

### TEX-04 · Gold smoke on black · landscape 1536×1024 → `assets/textures/TEX-04_gold-smoke.jpg`
```
Soft wisps of warm gold smoke and haze drifting through pure black (#0f0f10), lit from one side,
very subtle, mostly black with the smoke in the lower left third. For use as an overlay.
```

### TEX-05 · Gold light leak · landscape 1536×1024 → `assets/textures/TEX-05_light-leak.jpg`
```
A cinematic warm gold anamorphic light streak and soft light leak on pure black, horizontal,
slightly off-centre, organic, filmic. Mostly black. For screen-blend transitions in video.
```

---

## 6. 3D support (matcaps)

Used by the R3F hero on low/mid tier devices (cheap, beautiful gold) and in Remotion's 3D scenes.

### 3D-01 · Gold matcap · square 1024×1024 → `assets/3d/3D-01_matcap-gold.png`
```
A single perfect polished gold sphere (#d4af37 warm champagne gold) centred and filling 90% of
the frame, on a pure black background, lit by a soft warm studio: one large softbox top-left,
a gold rim light right, dark reflections of a black studio. Orthographic, no shadow, no floor,
no text. This will be used as a 3D matcap texture.
```

### 3D-02 · Onyx matcap · square 1024×1024 → `assets/3d/3D-02_matcap-onyx.png`
```
A single perfect satin black onyx sphere centred and filling 90% of the frame on pure black,
soft warm highlight top-left and a faint gold rim on the right edge. Orthographic, no shadow,
no floor, no text. This will be used as a 3D matcap texture.
```

---

## 7. Showreel layers (SR)

The showreel (`08-showreel-remotion.md`) is built in Remotion from **separate layers**, so the camera can move in 2.5D parallax. Generate each layer at **both** 16:9 (1536×1024) and 9:16 (1024×1536) where marked `[16:9 + 9:16]`, and name the portrait version with the `-v` suffix.

### SR-01 · Cold open: tube macro `[16:9 + 9:16]` → `assets/showreel/stills/SR-01_tube-macro.png` (+ `SR-01-v_tube-macro.png`)
```
Extreme macro of a polished gold tube curving across the frame in darkness, very shallow depth of
field, a bright line of light running along its top edge, the rest falling into black. Abstract,
luxurious, slow. Match the materials, lighting, colour and finish of the attached reference exactly.
```

### SR-02 · Tube loop, mid-shot `[16:9 + 9:16]` → `assets/showreel/stills/SR-02_tube-loop.png`
```
A single teardrop-shaped loop of the polished gold tube, centred, floating in black haze, one
warm key light, dust in the air. Match the materials, lighting, colour and finish of the attached
reference exactly.
```

### SR-03 · Onyx stage, empty `[16:9 + 9:16]` → `assets/showreel/stills/SR-03_onyx-stage.png`
```
An empty dark studio stage: a wide, low onyx plinth centred in the lower third, a soft warm gold
spotlight pooling on its top surface, deep black all around, faint haze. Front view, eye level,
symmetrical. Nothing on the plinth. Match the materials, lighting, colour and finish of the
attached reference exactly.
```
(Remotion places device frames and client screen recordings on this plinth.)

### SR-04 · Landscape parallax set, 3 layers (16:9 only)
Generate the base scene first, then ask for each layer separately with *"same scene, only the [layer], transparent background"*.
- `SR-04a_land-bg.png`: night sky with faint haze and a distant gold glow on the horizon. No land.
- `SR-04b_land-mid.png` (transparent): dark onyx hills with the luminous gold river winding between them.
- `SR-04c_land-fg.png` (transparent): close foreground onyx rocks framing the bottom corners.
```
Base scene: aerial-to-low-angle view of a dark onyx landscape at night with a luminous gold river
winding through it in loops toward the horizon. Epic, mythic, calm. Match the materials, lighting,
colour and finish of the attached reference exactly. No text, no people, no buildings.
```

### SR-05 · Gold dust overlay (16:9, transparent) → `assets/showreel/layers/SR-05_gold-dust.png`
```
Sparse floating gold dust particles and tiny bokeh specks on a transparent background, varied
sizes and focus, no other objects.
```
(Optional. Remotion can also generate particles procedurally.)

### SR-06 · Service sculptures
Reuse `ILL-06`, `ILL-07`, `ILL-08`, `ILL-09` (transparent). No new generation needed.

### SR-07 · Network of loops `[16:9 + 9:16]` → `assets/showreel/stills/SR-07_network.png`
```
Many thin polished gold tubes looping and interlinking in the dark like a network or a constellation
of rivers, receding into depth, the nearest loops sharp and the far ones soft. Feeling: connection,
scale, a global network. Match the materials, lighting, colour and finish of the attached reference exactly.
```

---

## 8. What NOT to generate with ChatGPT

- **The logo or wordmark:** always the official files in `/brand/logos`.
- **Icons:** drawn in code from the spec.
- **People, team or clients:** real photography only (`06`).
- **UI screenshots or website mockups with interfaces:** real client screen recordings in code-built device frames.
- **Any text inside images:** all type is set in code (Quirkfy / Bricolage).

---

## 9. Asset manifest (exact filenames)

Status column for the team to tick. **Placeholder** = what Claude Code renders until the file exists.

### Illustrations: `assets/illustrations/`
| ID | Filename | Size | Used in | Placeholder | ✓ |
|---|---|---|---|---|---|
| ILL-01 | `ILL-01_hero-river-sculpture.png` | 1536×1024 | Home hero poster, OG bg, showreel | gold mark SVG on radial glow | ☐ |
| ILL-01m | `ILL-01m_hero-river-sculpture-mobile.png` | 1024×1536 | Mobile hero poster | same | ☐ |
| ILL-02 | `ILL-02_404-lost-river.png` | 1536×1024 | 404 | mark outline | ☐ |
| ILL-03 | `ILL-03_outcome-trust.png` | 1024² | Home outcomes 01 | icon-trust 96px on glow | ☐ |
| ILL-04 | `ILL-04_outcome-found.png` | 1024² | Home outcomes 02 | icon-search 96px on glow | ☐ |
| ILL-05 | `ILL-05_outcome-night.png` | 1024² | Home outcomes 03 | icon-chat 96px on glow | ☐ |
| ILL-06 | `ILL-06_service-websites.png` (transparent) | 1024² | Services, showreel | icon-website | ☐ |
| ILL-07 | `ILL-07_service-ai-agents.png` (transparent) | 1024² | Services, showreel | icon-ai-agent | ☐ |
| ILL-08 | `ILL-08_service-products.png` (transparent) | 1024² | Services, showreel | icon-digital-product | ☐ |
| ILL-09 | `ILL-09_service-university.png` (transparent) | 1024² | Services, DU hero, showreel | icon-university | ☐ |
| ILL-10 | `ILL-10_websites-hero.png` | 1536×1024 | /services/websites hero | radial glow | ☐ |
| ILL-11 | `ILL-11_insights-hero.png` | 1536×1024 | /insights hero | radial glow | ☐ |
| ILL-12 | `ILL-12_book-pedestal.png` | 1536×1024 | /book hero | radial glow | ☐ |
| ILL-13 | `ILL-13_river-landscape.png` + `ILL-13m_river-landscape-mobile.png` | 1536×1024 / 1024×1536 | About story | animated river SVG | ☐ |
| ILL-14 | `ILL-14_gold-and-onyx.png` | 1536×1024 | About story beat 2 | TEX-03 | ☐ |
| ILL-15 | `ILL-15_agent-orb.png` | 1536×1024 | /ai-agents hero | radial glow | ☐ |

### Textures: `assets/textures/`
| ID | Filename | Size | Used in | Placeholder | ✓ |
|---|---|---|---|---|---|
| TEX-01 | `TEX-01_grain-tile.png` | 1024² | global grain | script-generated | ☐ |
| TEX-02 | `TEX-02_onyx-macro.jpg` | 1536×1024 | case hero bg, cards (5%) | flat onyx | ☐ |
| TEX-03 | `TEX-03_brushed-gold.jpg` | 1536×1024 | DU covers, email header | gold gradient | ☐ |
| TEX-04 | `TEX-04_gold-smoke.jpg` | 1536×1024 | booking bg, transitions | radial glow | ☐ |
| TEX-05 | `TEX-05_light-leak.jpg` | 1536×1024 | showreel transitions | code gradient | ☐ |

### 3D: `assets/3d/`
| ID | Filename | Size | Used in | Placeholder | ✓ |
|---|---|---|---|---|---|
| 3D-01 | `3D-01_matcap-gold.png` | 1024² | R3F + Remotion gold | MeshStandardMaterial metal | ☐ |
| 3D-02 | `3D-02_matcap-onyx.png` | 1024² | R3F onyx | MeshStandardMaterial | ☐ |

### Showreel: `assets/showreel/`
| ID | Filename | Format | Used in | ✓ |
|---|---|---|---|---|
| SR-01 | `stills/SR-01_tube-macro.png` + `stills/SR-01-v_tube-macro.png` | 16:9 + 9:16 | Scene 1 | ☐ |
| SR-02 | `stills/SR-02_tube-loop.png` + `-v` | 16:9 + 9:16 | Scene 2 | ☐ |
| SR-03 | `stills/SR-03_onyx-stage.png` + `-v` | 16:9 + 9:16 | Scenes 5–6 | ☐ |
| SR-04 | `stills/SR-04a_land-bg.png`, `stills/SR-04b_land-mid.png`, `stills/SR-04c_land-fg.png` | 16:9 | Scene 4 | ☐ |
| SR-05 | `layers/SR-05_gold-dust.png` | 16:9 | overlay (optional) | ☐ |
| SR-07 | `stills/SR-07_network.png` + `-v` | 16:9 + 9:16 | Scene 8 | ☐ |
| AUDIO | `audio/music.mp3` (licensed, see 08 §6) | — | all cuts | ☐ |
| VO (opt.) | `audio/vo.mp3` | — | all cuts | ☐ |
| REC | `screen-recordings/<client-slug>-desktop.mp4`, `<client-slug>-mobile.mp4` | see 06 §5 | Scenes 5–6 | ☐ |

### Real material: see `06-photography.md` §6 for team, office and client filenames.
