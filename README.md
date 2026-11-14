# PDN Website: build kit

Everything Claude Code needs to build the Pishon Digital Network website: brand, design system, every word of copy, asset prompts, motion, showreel and the build plan.

## What's in here

```
pdn-website/
├─ CLAUDE.md            ← Claude Code reads this first (the master brief)
├─ README.md            ← you are here (for the team)
├─ docs/                ← the full guide, 01–10
├─ brand/
│  ├─ Pishon_Digital_Network_Brand_Guide.pdf
│  ├─ logos/            ← SVG logos, marks, icon tiles, the River centre-line, PNGs, favicons
│  └─ fonts/            ← put the Quirkfy font files here
└─ assets/              ← generated + photographed assets go here (exact filenames!)
   ├─ illustrations/  textures/  3d/
   ├─ showreel/ (stills, layers, broll, screen-recordings, audio)
   ├─ photos/ (team, office)
   └─ clients/<client-slug>/
```

## Team workflow

1. **Fonts:** add the Quirkfy files (from the designer's Drive folder linked in the brand guide) to `brand/fonts/`. Confirm the licence covers web use.
2. **Generate the images in ChatGPT:** open `docs/05-asset-prompts.md`.
   - Create a ChatGPT Project and paste the Master Style Block (§3).
   - Generate `ILL-01` first and get it perfect. Then attach it to every other prompt.
   - Save each image with the **exact filename** from the manifest (§9) into the folder shown.
3. **Shoot the real material:** follow `docs/06-photography.md` for team portraits, office, b-roll, client screenshots and screen recordings, and testimonials.
4. **Fill in the blanks:** prices, phone, email, delivery time and the other items in `CLAUDE.md` §6. Send them to Claude Code or put them into Sanity once it's set up.
5. **Music:** license a track to the brief in `docs/08-showreel-remotion.md` §6 → `assets/showreel/audio/music.mp3`.
6. **Build:** open this folder in Claude Code and paste the prompt below.

Missing assets don't block the build. Claude Code shows a tasteful placeholder and lists what's missing.

## Starter prompt for Claude Code

```
Read CLAUDE.md, then every file in /docs in order. Don't write code until you've read them all.
Then start Phase 1 from docs/10-build-plan.md: scaffold the Next.js project in this folder,
set up the design tokens, fonts and asset pipeline, and build the Home page with the booking
form. Use the copy in docs/04-copy.md verbatim. When Phase 1 is deployed to a Vercel preview,
give me: the URL, the list of placeholders still showing, and the list of missing assets.
```

Next prompts, when ready:
- `Start Phase 2 from docs/10-build-plan.md. Begin with the 3D hero mark (docs/07 §3) and the River scroll path (docs/07 §4).`
- `Set up the Remotion project in /showreel following docs/08 and build the HeroLoop and LogoSting compositions first.`
- `I've added new files to /assets. Run the asset pipeline, swap out the placeholders and tell me what's still missing.`
