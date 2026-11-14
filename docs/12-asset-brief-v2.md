# 12 — Asset Brief v2: real first, nothing that looks generated (supersedes 05, and 08 §3 visuals)

Written 2026-11-14 for Direction v2 (`11-direction-v2.md`). Audience: the PDN team (shooting, recording, editing)
and anyone generating images.

## The rule

> If a picture could have come from a prompt, it doesn't go on the site or in the reel.
>
> **Update 2026-11-14 (PDN decision):** realistic generated *illustrative scenes* are now allowed on the sales page and in ads,
> with strict rules (never as clients, team or testimonials). Prompts, filenames and the realism checklist: `prompt/assets.md`.

Every reference studio looks real because it shows **real client work, real screens and real people**.
So the order of preference is:

1. **Real client work**: screen recordings and screenshots of sites, agents and products PDN built.
2. **Real PDN people and places**: the team, the studio, Lagos.
3. **Interfaces built in code**: already on the site (the live phone, search card, lock screen).
4. **Typography and colour fields**: black, white, gold. Most of the reel is this plus #1.
5. **Generated images**: only the few textures in §6, shot to look like real camera photography, never presented as work.

## 1. Retire the v1 images

The 36 v1 glossy gold-tube renders (ILL-01 to ILL-15, TEX-01 to 05, 3D-01/02, SR-01 to SR-07) were deleted from the
repo on 2026-11-14. They were the main reason v1 read as AI-generated. Don't bring them back into the reel.

## 2. Screen recordings (the heart of the reel)

For **each client project you have permission to show** (aim for 4 to 8):

| File | Spec |
|---|---|
| `assets/showreel/screen-recordings/<client-slug>-desktop.mp4` | Browser content exactly **1440×900**, 60 fps, cursor hidden. 15–25 s: hold the hero 2 s, one smooth scroll through 2–3 key sections, one hover on a button. Clean browser profile, no bookmarks bar, no personal data. |
| `assets/showreel/screen-recordings/<client-slug>-mobile.mp4` | **390×844** (Chrome device mode or a real phone, cropped to screen), 60 fps, same choreography. |
| `assets/showreel/screen-recordings/<client-slug>-hero.png` | A still of the hero, 2880×1800 (2× retina). |
| `assets/clients/<client-slug>/brief.md` | Client name, industry, what we built, the real result, permission confirmed (yes/no + who approved). |

AI agents: record a **real conversation** with a PDN-built agent (website widget or WhatsApp), with the
client's permission and no customer data. 390×844, 60 fps, 20–40 s, real typing speed.

## 3. Team and studio (real people, black and white)

Shoot in colour, RAW. The site grades them to black and white with one warm highlight. Never AI people.

| # | Shot | Spec | Filename |
|---|---|---|---|
| T1 | Portrait, each person | Head and shoulders, plain dark or white wall, window light from one side, looking at camera. Vertical 4:5. | `assets/photos/team/<first-last>.jpg` |
| T2 | Candid, each person | Same light, mid-thought or laughing, looking away. | `assets/photos/team/<first-last>-candid.jpg` |
| T3 | Founders together | Three-quarter length, plain background. 3:2 and 4:5. | `assets/photos/team/founders-h.jpg`, `founders-v.jpg` |
| T4 | The team | Loose group, not lined up. 16:9. | `assets/photos/team/team-group.jpg` |
| T5 | Hands at work | Sketching wireframes, a sticky-note wall, a laptop showing a real (blurred if needed) design file, a phone showing a client site. 8–12 stills. | `assets/photos/office/work-01.jpg` … |
| T6 | Studio | The space in daylight and at dusk, 4–6 stills. | `assets/photos/office/studio-01.jpg` … |
| T7 | B-roll video | 5–10 s clips, tripod or gimbal, 4K or 1080p, 25/30 fps: typing, a whiteboard session, a client call on a laptop, someone turning to camera, the street outside the studio. Horizontal **and** vertical. | `assets/showreel/broll/<description>-h.mp4` / `-v.mp4` |
| T8 | Lagos | Your own phone footage of Lagos at night: the Third Mainland Bridge, Lekki–Ikoyi bridge, traffic light trails, the marina. Steady, 10–20 s each. These become the reel's "river of gold" shots, for real. | `assets/showreel/broll/lagos-<place>-night-h.mp4` |

Get a signed photo release from everyone pictured.

## 4. The showreel: Koto-style, cut from real work

**What we take from Koto:** full-bleed real work, **hard cuts on the beat**, type in one face set big and
plain, whole-frame colour fields flashing between shots, the logo as a confident full stop. No 3D,
no glossy renders, no particles.

**Palette in the reel:** black frames, white frames, gold frames (gold ≈ 20% of frames). Type in Bricolage
(Quirkfy when licensed), black on white, white on black, black on gold.

### `Showreel` 45–60 s, 1920×1080, 30 fps (Remotion, see 08 for project setup)

| Time | Beat | Picture | Type (verbatim from 04) |
|---|---|---|---|
| 0:00–0:04 | Cold open | Black. One Lagos night shot (T8): the bridge's light line crossing the frame. | none |
| 0:04–0:09 | The question | Hard cut to white field, then gold field on the beat | `Customers check you online` / `before they pay you.` / `What are they seeing?` (black on gold) |
| 0:09–0:13 | The problem | Three fast cards on black, one per beat | `"When customers ask for my website, I send my Instagram link."` · `"I'm great at what I do. But when people Google me, nothing comes up."` · `"We have a website. It hasn't brought in a single enquiry this year."` |
| 0:13–0:15 | Turn | Gold flash frame (6 f), then white | `We fix that.` |
| 0:15–0:38 | **The work** (the drop) | Full-bleed client recordings, 2–4 s each, hard cuts on beats. Alternate desktop full-frame / phone centred on a black or white field / two phones side by side. Client name + one real result as a small white-on-black label bottom-left. | client names, real results only |
| 0:38–0:44 | What we do | Three type frames, one per beat, each with a real clip behind at 30% scale | `Websites` · `AI Agents` · `Digital Products` |
| 0:44–0:50 | The team | Real b-roll (T7), 1 s cuts; end on the team group (T4) | `Made in Lagos, for the world.` |
| 0:50–0:56 | Proof (only if real) | Real stats or one real testimonial on white | real numbers only |
| 0:56–1:00 | Resolve | Black. The gold mark draws (centre-line), becomes the horizontal logo (official file, unaltered) | `Because the future belongs to businesses built for it.` · `Book a free call` |

**Cutdowns:** `ShowreelVertical` 30 s 1080×1920 (phone recordings only), `ShowreelFeed` 30 s 1080×1350,
`AdCut15` 15 s 1080×1920 (question → 2 clients → services → `Book a free call`), and `ShowreelLoop` 12 s,
silent and seamless, for the home page block. Captions are burned in on vertical and feed cuts.

**Transitions:** hard cuts and whole-frame colour flashes only. **Never** glitch, spin, zoom-blur, light leaks or particle overlays.

**Music:** 100–115 BPM, confident, minimal, modern Afro-electronic percussion; a clear drop at 0:15. Licensed. `assets/showreel/audio/music.mp3`.

## 5. Site imagery the team should supply next

| What | Where it goes | Spec |
|---|---|---|
| 3–6 client projects (recordings + hero stills) | Work section, showreel | §2 |
| 4+ client logos (SVG) | Logo strip | `assets/clients/<slug>/logo.svg` |
| Team portraits + candids | About page, booking section faces | §3 |
| 2+ real testimonials with photo and written permission | Proof section | quote 25–60 words |
| Lagos night footage (T8) | Home closer (replacing the credited Wikimedia photo), reel | §3 |

## 6. If you must generate an image (textures only)

Only for background textures and transition frames, never as "work", products or people.
Add this block to every prompt:

```
Real photograph, not a render. Shot on a 35mm film camera (Kodak Tri-X 400, pushed one stop), natural light,
visible film grain, slight lens softness at the edges, real-world imperfections (dust, uneven light).
No 3D, no CGI, no glossy surfaces, no glowing objects, no impossible shapes, no text, no logos, no people,
no faces, no hands. Plain, documentary, honest.
```

| ID | Prompt (add the block above) | Use |
|---|---|---|
| TX-01 | Close-up of matte black paper with a single torn edge, raking window light from the left, deep shadows. Black and white. | Black field texture in the reel |
| TX-02 | A sheet of real gold leaf partly laid on black card, slightly wrinkled, one side catching daylight. Overhead, documentary. | Gold flash frames |
| TX-03 | White cotton paper texture, soft daylight, very subtle fibres. Black and white. | White field texture |
| TX-04 | Long-exposure photograph of car light trails curving across a dark bridge at night, seen from far away, city in shadow. | Reel transition (replace with real T8 footage when shot) |

Save as `assets/textures-v2/TX-0n_<name>.jpg` at 3000 px wide. Review each against the rule at the top.
