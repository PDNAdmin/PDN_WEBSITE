# /assets: drop zone for generated and real material

**Only the team adds files here.** Claude Code reads from this folder but never edits it. It processes the files into `/public/img` and `/public/video`.

Use the **exact filenames** from `docs/05-asset-prompts.md` §9 (generated) and `docs/06-photography.md` §6 (real). A wrong name = the site keeps showing the placeholder.

| Folder | What goes in | Guide |
|---|---|---|
| `illustrations/` | ILL-01 … ILL-15 (ChatGPT) | 05 §4 |
| `textures/` | TEX-01 … TEX-05 (ChatGPT) | 05 §5 |
| `3d/` | 3D-01, 3D-02 matcaps (ChatGPT) | 05 §6 |
| `showreel/stills/` | SR-01 … SR-07 layers, 16:9 and `-v` 9:16 (ChatGPT) | 05 §7 |
| `showreel/layers/` | SR-05 gold dust (optional) | 05 §7 |
| `showreel/broll/` | Real team video clips | 06 §2 (T7) |
| `showreel/screen-recordings/` | `<client-slug>-desktop.mp4` / `-mobile.mp4` | 06 §5 |
| `showreel/audio/` | `music.mp3` (licensed), optional `vo.mp3`, `sfx/` | 08 §6 |
| `photos/team/` | Portraits, candids, founders, group, `team.json` | 06 §2 |
| `photos/office/` | Work and studio photos | 06 §2 |
| `clients/<client-slug>/` | logo, screenshots, recordings, testimonial photo, `brief.md` | 06 §3 |
