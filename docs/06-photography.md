# 06 — Real Photography, Client Material & Screen Recordings

Real people, real work. Generated imagery never shows people (see 05). This doc tells the team **what to shoot and capture** and tells Claude Code **how to treat it** so it sits inside the Onyx & Gold world.

---

## 1. The look: "Gold hour in the studio"

Real photos should feel like they were taken in the same dark studio as the illustrations, with a warm light source in the darkness.

- **Light:** low-key. One warm key light (a window at golden hour, or a single LED softbox with a warm 3200K gel), side-on at 45°. Let the shadows go deep. No flat overhead office lighting, and no ring light on its own.
- **Background:** dark and uncluttered. Black or dark-grey walls, black fabric, or the office at dusk with the lights low. Shoot real environments only if they're tidy and dark.
- **Wardrobe:** black, charcoal, cream or earth tones. Solid colours, no logos or busy prints. One gold accent is welcome (a watch, a ring, a pen). The brand guide shows black caps and tees with the mark; PDN merch is perfect if you have it.
- **Mood:** confident, focused, warm. Real moments (working, laughing, pointing at a screen, sketching) beat stiff poses.
- **Camera:** shoot RAW if possible. An 85mm (portraits) or 35mm (environments) feel, at f/1.8–f/2.8 for soft backgrounds. A modern phone in portrait mode is OK if the light is good.
- **Orientation:** shoot every setup in **both** vertical and horizontal.

**Reference mood:** page 8 of the brand guide (the cap close-up and the sticky-note wall). Same light and tone, but with the real team.

---

## 2. Shot list: team

| # | Shot | Details | Filename |
|---|---|---|---|
| T1 | Formal portrait, each person | Head and shoulders, dark background, warm side light, looking at camera with a slight smile. Vertical 4:5. | `assets/photos/team/<firstname-lastname>.jpg` |
| T2 | Candid portrait, each person | Same light, looking away, laughing or mid-thought. Used as the hover swap on the About team grid. | `assets/photos/team/<firstname-lastname>-candid.jpg` |
| T3 | Co-founders together | Standing, three-quarter length, dark background, both in black or cream. Horizontal 3:2 and vertical 4:5. | `assets/photos/team/founders-h.jpg`, `founders-v.jpg` |
| T4 | Whole team | Group in a loose, natural formation (not lined up), dark studio. Horizontal 16:9. | `assets/photos/team/team-group.jpg` |
| T5 | Team at work, b-roll stills | Hands sketching wireframes, screens with code (blur any client data), a planning wall with sticky notes, a client call on a laptop. 8–12 images. | `assets/photos/office/work-01.jpg` … |
| T6 | Office / studio | The space at dusk: desks, plants, PDN merch, the logo on the wall if you have it. 4–6 images. | `assets/photos/office/studio-01.jpg` … |
| T7 | Video b-roll for the showreel | 5–10 second clips, 4K or 1080p at 25/30fps, steady (tripod or gimbal), same light: typing, a whiteboard session, a high-five after a launch, a walk-through of the office, someone turning to camera and smiling. Horizontal and vertical. | `assets/showreel/broll/<description>-h.mp4` / `-v.mp4` |

**Consent:** get a signed photo release from every person pictured (team and clients). Keep the forms on file.

---

## 3. Client material (per project)

Create one folder per client: `assets/clients/<client-slug>/` (lowercase, hyphens, e.g. `ada-bakes`).

| File | What | Notes |
|---|---|---|
| `logo.svg` (or `logo.png`, transparent, ≥ 800px wide) | Client logo | Claude Code renders it monochrome ivory in the marquee |
| `desktop-full.png` | Full-page screenshot, 1440px wide | Chrome DevTools → "Capture full size screenshot" |
| `desktop-hero.png` | Above-the-fold screenshot, 1440×900 | |
| `mobile-full.png` | Full-page, 390px wide | DevTools device mode, iPhone 14 |
| `mobile-hero.png` | 390×844 | |
| `desktop.mp4` | Screen recording, see §5 | Used in case study hero and showreel |
| `mobile.mp4` | Screen recording, see §5 | |
| `testimonial-photo.jpg` | Real photo of the person quoted | Square, ≥ 600px, warm light if possible |
| `brief.md` | Client name, industry, services, year, live URL, challenge, what we built, results with numbers, testimonial quote with permission | Claude Code imports this into Sanity as a draft case study |

Only include clients who've given permission to be featured.

---

## 4. Testimonials

Collect via a short form or WhatsApp voice note, then transcribe and get the client to approve the final wording. For each one, capture the full name, role and company, the quote (25–60 words, ideally mentioning a result), a photo, and written permission. Don't edit the meaning. You may trim for length, with the client's OK.

---

## 5. Screen recordings (for showreel and case studies)

- **Tool:** OBS, ScreenStudio (Mac) or the macOS screen recorder. Hide the cursor, or use a large smooth cursor.
- **Desktop:** browser window at exactly **1440×900** content size, **60fps**, recorded at 2× (Retina) if possible. Hide the bookmarks bar and extensions, and use a clean profile.
- **Mobile:** Chrome DevTools device mode at **390×844**, or a real iPhone recording cropped to the screen. 60fps.
- **Motion:** slow, smooth scroll from top to bottom over 12–20 seconds, one pause on the hero (2s) and pauses on 2–3 key sections. Hover a couple of buttons. No jerky scrolling, so use a smooth-scroll extension or the trackpad gently.
- **Content:** real live sites only, with no personal data visible.
- **Export:** MP4 (H.264), high bitrate. Name them `assets/showreel/screen-recordings/<client-slug>-desktop.mp4` and `<client-slug>-mobile.mp4`, plus copies in the client folder.

---

## 6. Filenames: real material checklist

| Path | ✓ |
|---|---|
| `assets/photos/team/<firstname-lastname>.jpg` (each member) | ☐ |
| `assets/photos/team/<firstname-lastname>-candid.jpg` (each member) | ☐ |
| `assets/photos/team/founders-h.jpg`, `founders-v.jpg` | ☐ |
| `assets/photos/team/team-group.jpg` | ☐ |
| `assets/photos/office/work-01.jpg` … `work-12.jpg` | ☐ |
| `assets/photos/office/studio-01.jpg` … `studio-06.jpg` | ☐ |
| `assets/showreel/broll/*.mp4` | ☐ |
| `assets/clients/<slug>/…` (per client, see §3) | ☐ |
| `assets/showreel/screen-recordings/<slug>-desktop.mp4` / `-mobile.mp4` | ☐ |
| `assets/photos/team/team.json`: `[{ "name": "", "role": "", "file": "", "bio": "" }]` | ☐ |

---

## 7. How Claude Code treats real photos

1. **Process** with sharp in `scripts/process-assets.mjs`: auto-orient, strip EXIF/GPS, and make AVIF and WebP at 480 / 960 / 1440 / 2048 widths.
2. **Unifying grade** (for photos only, optional per image via a `?grade=false` flag in Sanity). Apply a gentle "PDN warm" treatment in sharp: lift the blacks to `#0f0f10` (no crushed pure black), add slight warmth (+6 on the R/Y balance), reduce saturation 8% except in skin tones, and add a subtle vignette. Keep it natural; skin must look real and true to tone. Never lighten or alter skin colour.
3. **On the page:** radius `--r-lg`, a 1.06 → 1 scale reveal, and an optional 1px onyx-600 border. The About grid swaps T1 → T2 on hover with a 400ms crossfade.
4. **Device frames:** screenshots and recordings always sit inside code-built `DeviceFrame` components (an onyx laptop or phone with a thin gold edge highlight), never as naked rectangles.
5. **Alt text:** describe the person and the action ("Ada, lead designer, sketching wireframes at the PDN studio"), and the project for screenshots ("Ada Bakes homepage on mobile").
