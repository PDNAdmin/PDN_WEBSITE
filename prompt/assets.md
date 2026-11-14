# PDN · Image generation prompts (sales page + ads)

Written 2026-11-14. For whoever generates images for the PDN home page, `/contact` and Meta ads.
Every file has an exact filename. Drop finished files into `assets/generated/` and run `pnpm assets`:
the site picks them up automatically, and until a file exists the page keeps its current design.

---

## 0. Read this first

### Where AI images may go, and where they never go

| ✅ Allowed (illustrative scenes) | ❌ Never |
|---|---|
| A customer browsing on a phone, a business owner in her shop, a team in a meeting: scenes that show *the kind of person* the copy talks about | Next to a testimonial, a quote, a name or a star rating |
| Ad creatives showing a situation ("your customer at 11pm") | Presented as "our team", "our client", a case study or "before / after" of a real business |
| Backgrounds and textures | Fake screenshots of client results, fake reviews, fake numbers |

Why: a visitor who later finds out "the client" was generated stops trusting everything else on the page,
and presenting invented people as customers is misleading advertising. Real team and client photos (docs/12 §2–3)
always beat generated ones, so swap them in the moment you have them. Meta may label photorealistic AI
images in ads ("AI info"); that's fine for illustrative scenes, and one more reason never to use them as "clients".

### Which tool

Use a model with a **raw / photographic mode** and low "stylise" settings. Beautifying defaults are what make skin look plastic.

| Tool | Settings that matter |
|---|---|
| Midjourney | `--style raw --stylize 50` (or lower), set `--ar` per shot, add the negatives with `--no` |
| Flux (Pro / Ultra) | **Raw** mode on, guidance low-to-medium |
| ChatGPT image / Google Imagen | Paste the full prompt; ask for "unretouched documentary photograph" |

Generate 4 to 8 variations per shot, pick the most *ordinary-looking* one (not the prettiest), then do §6 post-processing.

### The realism checklist (zoom to 100% before accepting)

- [ ] Skin has **visible pores**, fine hair, uneven tone, a little shine on the forehead/nose. No smooth "wax" areas.
- [ ] Skin tone is natural and **not lightened**; dark skin keeps its depth and warm undertones in the shadows.
- [ ] **Hands:** five fingers each, knuckles and nails look real, nothing melted into the phone.
- [ ] **Eyes:** not glassy, catchlights match the light source, both pupils the same size.
- [ ] **Teeth** are not perfectly white or uniform; ears and earrings match left and right.
- [ ] **Hair** has flyaways and real texture (4c, braids and locs look like real hair, not plastic).
- [ ] Clothes have creases; fabric patterns don't warp.
- [ ] Background people (if any) aren't distorted. No garbled text or fake logos anywhere.
- [ ] It would pass as a photo a friend took. If it looks like an advert, regenerate.

---

## 1. Realism master block (paste at the start of every human prompt)

```
Unretouched documentary photograph, not a render. Real person with natural skin texture: visible pores,
fine vellus hair, slight unevenness in skin tone, subtle hyperpigmentation, a small blemish or two,
natural oily sheen on the forehead and nose with matte cheeks, realistic under-eye texture, fine lines
on the lips, individual eyelashes, flyaway hairs, slight facial asymmetry. Dark brown Nigerian skin with
warm undertones, rendered with true depth, never lightened. Natural available light only, real shadows.
Shot on a full-frame camera with a 35mm f/1.8 lens at ISO 800, slight film grain, true-to-life colours,
shallow depth of field, a little motion and imperfection. Candid moment, the person is not posing and
not looking at the camera. Real Lagos setting with lived-in details.
```

## 2. Negative block (Midjourney `--no …`, or "Avoid:" at the end for other tools)

```
smooth skin, airbrushed, beauty filter, plastic skin, waxy skin, porcelain skin, glossy skin, glass skin,
skin smoothing, CGI, 3D render, illustration, cartoon, anime, doll-like, mannequin, over-sharpened,
HDR, oversaturated, perfect symmetry, unnaturally white teeth, glassy eyes, extra fingers, fused fingers,
deformed hands, lightened skin, whitewashed skin, stock-photo pose, fake smile at camera, text,
letters, words, watermark, logo, brand names, readable screen content
```

---

## 3. Sales-page scenes (HUM): wired into the site

Size: generate at the largest your tool allows, then export at the size given.
**Phone and laptop screens always face away from the camera or show only a soft glow.** The site places
real interfaces on top in code, so the picture must never show fake screen content.

### HUM-01 · Trust → `assets/generated/HUM-01_trust-customer-phone.jpg` · 4:5 · 1600×2000
Where: Home, "What changes" panel 01 (*People trust you before they talk to you*). The site lays a website card over the **bottom-right third**: keep that area calm.
```
[MASTER BLOCK] A Nigerian woman in her late twenties sits sideways on a fabric sofa in her Lekki apartment
in late-afternoon light, legs tucked up, scrolling on her phone and reading carefully as if deciding
whether to buy. Natural hair in a puff, plain cream T-shirt, small gold studs. The phone screen faces away
from the camera. Warm window light from the left, a ceiling fan and a potted plant softly out of focus.
She sits in the left two-thirds of the frame; the lower right is a calm, softly lit wall. Vertical 4:5.
[NEGATIVE BLOCK]
```

### HUM-02 · Found → `assets/generated/HUM-02_found-search-in-traffic.jpg` · 4:5 · 1600×2000
Where: Home, panel 02 (*Customers find you, not your competitor*). A map card is overlaid **bottom-right**.
```
[MASTER BLOCK] A Nigerian man in his early thirties in the back seat of a car in Lagos evening traffic,
face lit softly from below by his phone as he searches for something. Short low-cut hair, light beard,
blue shirt with the sleeves rolled. Through the window behind him, out-of-focus brake lights and a yellow
bus, dusk sky. The phone screen faces him, not the camera. He is in the left half of the frame; the
lower right is the dark seat back and window. Vertical 4:5. [NEGATIVE BLOCK]
```

### HUM-03 · Paid → `assets/generated/HUM-03_paid-phone-at-night.jpg` · 4:5 · 1600×2000
Where: Home, panel 03 (*Enquiries arrive while you sleep*). The site places a glowing phone lock screen **bottom-right**, so the photo shows only the sleeper and the glow.
```
[MASTER BLOCK] Night, a dark Lagos bedroom. A Nigerian woman in her thirties asleep on her side, wrapped
hair under a satin bonnet, one arm over a patterned duvet. The only light is a faint cool glow coming
from off-frame at the lower right, as if from a phone on the bedside table, softly lighting the sheets and
her shoulder. Deep shadows, real low-light grain, a little noise. She occupies the upper left; the lower
right corner is dark bedside space. Vertical 4:5. [NEGATIVE BLOCK]
```

### HUM-04 · Business owners → `assets/generated/HUM-04_business-owner-boutique.jpg` · 16:9 · 2400×1350
Where: Home, "Built for people like you" → Business owners.
```
[MASTER BLOCK] Inside a small fashion boutique in Lekki, daylight through the shop window. A Nigerian
woman in her early thirties, the owner, folds a dress into a kraft paper bag for delivery while checking an
order on her phone propped against the counter (screen facing away). Rails of clothes behind her, some in
ankara prints, some plain linen; a handwritten price tag, a POS terminal, a fan on a shelf. Braids tied up,
simple black top. Natural, busy, proud. Horizontal 16:9. [NEGATIVE BLOCK]
```

### HUM-05 · Professionals → `assets/generated/HUM-05_professional-office.jpg` · 16:9 · 2400×1350
```
[MASTER BLOCK] A Nigerian lawyer in his mid-forties at his desk in a modest Victoria Island office,
reading glasses pushed up on his forehead, writing notes while on a phone call with an earpiece. Navy suit
jacket on the chair, white shirt, sleeves folded once. Shelves of law reports, a split air-conditioning
unit, a framed certificate (unreadable), late-morning light through blinds. Laptop open, screen facing
away. Horizontal 16:9. [NEGATIVE BLOCK]
```

### HUM-06 · Companies → `assets/generated/HUM-06_company-team-meeting.jpg` · 16:9 · 2400×1350
```
[MASTER BLOCK] A small meeting room in a Lagos office: four Nigerian colleagues aged 25 to 45, two women and
two men, around a table. One woman turns her laptop toward the others (screen facing away from camera)
while they lean in, one man frowning slightly, one taking notes. Coffee cups, a notebook, a power strip,
sticky notes on a whiteboard (no readable writing), hazy city view through the window. Office clothes,
not suits. A real working moment. Horizontal 16:9. [NEGATIVE BLOCK]
```

### HUM-07 · Clients abroad → `assets/generated/HUM-07_diaspora-founder-call.jpg` · 16:9 · 2400×1350
```
[MASTER BLOCK] Replace "Real Lagos setting" with: real London home setting. A Nigerian woman founder in her
late thirties at a kitchen table in a London flat on a grey rainy day, on a video call on her laptop
(screen facing away), mid-sentence, one hand gesturing. Knit jumper, short natural hair, a mug of tea,
rain on the window and brick terraced houses outside. Cool daylight, warm lamp. Horizontal 16:9.
[NEGATIVE BLOCK]
```

### HUM-08 · /contact → `assets/generated/HUM-08_owner-answering-call.jpg` · 4:5 · 1600×2000
Where: `/contact`, under "What happens next" (*We call you at a time that suits you*).
```
[MASTER BLOCK] A Nigerian woman in her forties, owner of a small bakery in Surulere, answering a phone call
at her counter, laughing mid-conversation, phone to her ear. Flour on her apron, headwrap, trays of bread
and a glass display case softly out of focus, morning light from the door. Genuine, warm, unposed.
Vertical 4:5. [NEGATIVE BLOCK]
```

---

## 4. Interface images (UI): precise text the honest way

**Image generators still get small interface text wrong** (letters swapped, words invented, buttons misaligned).
On the site this is already solved: every interface (the live phone, website, map card, lock screen) is
**built in code**, so the text and positioning are exact. For ads and social posts, use this two-step
method instead of asking a generator to write UI text:

1. **Generate the scene with a blank screen.** Every DEV prompt below asks for a flat pure-green
   (`#00FF00`) screen.
2. **Place a real screenshot** on the screen in Figma, Canva, Photoshop or Photopea (free): paste the
   screenshot, use *Distort / Perspective* to match the four screen corners, add a 5–10% inner shadow, done.
   Real screenshots: any PDN client site, or ask Claude Code for 3× exports of the site's interface
   fragments (live phone, website, map card, lock screen) with any business name.

### DEV-01 · Phone in hand, market stall → `assets/generated/DEV-01_phone-hand-market.jpg` · 4:5
```
[MASTER BLOCK] Close-up of a Nigerian woman's hand holding a modern smartphone with no visible brand logo,
over a fabric stall counter in a Lagos market, bolts of ankara and lace out of focus behind. The phone
screen is a flat, evenly lit, pure green (#00FF00) rectangle with sharp corners following the screen's
rounded edges, no reflections, no glare, fully visible and unobstructed by fingers. Natural daylight.
Vertical 4:5. [NEGATIVE BLOCK]
```

### DEV-02 · Laptop, office desk → `assets/generated/DEV-02_laptop-office.jpg` · 16:9
```
[MASTER BLOCK] A laptop with no visible logo, open on a wooden desk in a Victoria Island office, seen from
slightly above and to the side, a Nigerian man's hands resting near the keyboard, a coffee cup and a
notebook. The laptop screen is a flat, evenly lit pure green (#00FF00) rectangle, fully visible, no glare,
no reflections. Late-morning window light. Horizontal 16:9. [NEGATIVE BLOCK]
```

### DEV-03 · Phone on bedside table at night → `assets/generated/DEV-03_phone-bedside-night.jpg` · 4:5
```
[MASTER BLOCK] Night, a dark bedroom in Lagos. A smartphone with no visible logo lies face-up on a wooden
bedside table next to a glass of water and a charger cable; behind it, out of focus, a bed with someone
asleep. The phone screen is a flat, evenly lit pure green (#00FF00) rectangle, fully visible, glowing
slightly onto the table. Deep shadows, low-light grain. Vertical 4:5. [NEGATIVE BLOCK]
```

### DEV-04 · Phone on a Lagos street → `assets/generated/DEV-04_phone-street.jpg` · 9:16
```
[MASTER BLOCK] Over-the-shoulder view of a young Nigerian man on a busy Lagos street at golden hour holding
a smartphone (no visible logo) at chest height; traffic, a yellow bus and roadside stalls out of focus.
The phone screen is a flat, evenly lit pure green (#00FF00) rectangle, fully visible, no glare.
Vertical 9:16. [NEGATIVE BLOCK]
```

### If you must generate text inside the image (last resort)

Some tools (ChatGPT image is the most reliable today) can render short text. Keep it to **one screen, few
words, large type**, and spell out every string:

```
… The phone screen shows a simple mobile website, white background. From top to bottom, spelled exactly:
1. "Ada Bakes" in bold black, large.
2. "Order today. Delivered across Lagos." in grey, smaller.
3. A gold rectangular button with the text "Order on WhatsApp".
No other text anywhere on the screen or in the image. Text must be perfectly legible and spelled
exactly as written, letter for letter.
```

Then check every letter at 100% zoom. Any mistake → use the two-step method above instead.
(Use an invented business name like this only in ads that make clear it's an example, never as a "client".)

---

## 5. Meta ad creatives (AD): message-matched to the landing page

The ad should ask the same question the page answers, so the click feels continuous:
*"Customers check you online before they pay you. What are they seeing?"* →
`https://<domain>/contact` (until the domain is live: `https://pdn-website-eight.vercel.app/contact`).
**Add all headline text in Canva/Figma afterwards** in Bricolage Grotesque: never ask the generator for headline text.
Keep the top 14% and bottom 20% of 9:16 frames free of text (Reels/Stories UI).

| ID | File | Size | Prompt |
|---|---|---|---|
| AD-01 | `assets/generated/AD-01_link-in-bio-feed.jpg` | 1080×1350 | `[MASTER BLOCK] A Nigerian woman in her small Lagos shop replying to a customer on her phone, slightly frustrated, typing with her thumb (screen facing away). Top 35% of the frame is an uncluttered plain wall for a headline. Vertical 4:5. [NEGATIVE BLOCK]` |
| AD-02 | `assets/generated/AD-02_11pm-story.jpg` | 1080×1920 | Use HUM-03, recomposed: `… Vertical 9:16, the sleeper in the middle third, top third dark empty ceiling for a headline.` Then composite DEV-03-style lock screen if wanted. |
| AD-03 | `assets/generated/AD-03_search-feed.jpg` | 1080×1350 | Use HUM-02, recomposed: `… Vertical 4:5, top 35% the dusky window and brake-light bokeh, calm enough for a headline.` |
| AD-04 | `assets/generated/AD-04_diaspora-feed.jpg` | 1080×1350 | Use HUM-07, recomposed for 4:5 with the top 35% rain-streaked window for a headline. |

Suggested overlay lines (all verbatim from the site copy):
- AD-01: **"When customers ask for my website, I send my Instagram link."** + button "Book a free call"
- AD-02: **"Your customers message at 11pm. Who's answering?"**
- AD-03: **"Customers find you, not your competitor."**
- AD-04: **"Global quality. A team that answers."**

---

## 6. Post-processing (this is where "AI glass" gets removed)

1. **Upscale with a detail-preserving upscaler** (e.g. Topaz "Natural"/"Low resolution" model, Magnific with
   *creativity* low, or Photoshop Super Resolution). **Never** use "face enhance" / "beautify" options: they re-smooth skin.
2. **Fix small errors** with inpainting (hands, earrings, background text) rather than regenerating everything.
3. **Grade lightly:** contrast +5, saturation −5 to −10, warm shadows slightly. Don't push skin toward orange or grey.
4. **Add real film grain** (Photoshop: Add Noise 2–3%, monochromatic, Gaussian, or a 35mm grain overlay at 10–15%).
   Grain hides the last bit of digital smoothness.
5. **Export** as high-quality JPG (quality 90), sRGB, at the size listed, with the **exact filename** above,
   into `assets/generated/`.
6. Run `pnpm assets`. It converts each file to AVIF/WebP for the site and lists anything still missing.

---

## 7. Textures (optional)

The film-photography texture prompts (TX-01 to TX-04) are in `docs/12-asset-brief-v2.md` §6.
