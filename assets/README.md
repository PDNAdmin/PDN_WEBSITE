# /assets: drop zone for generated and real material

**Only the team adds files here.** Claude Code reads from this folder but never edits it. It processes the files into `/public/img` and `/public/video`.

Use the **exact filenames** from `prompt/assets.md` (generated scenes) and `docs/12-asset-brief-v2.md` (real material). A wrong name = the site keeps its fallback.

| Folder | What goes in | Guide |
|---|---|---|
| `generated/` | HUM-01 … HUM-08, DEV, AD images | prompt/assets.md |
| `showreel/broll/` | Real team video clips | 06 §2 (T7) |
| `showreel/screen-recordings/` | `<client-slug>-desktop.mp4` / `-mobile.mp4` | 06 §5 |
| `showreel/audio/` | `music.mp3` (licensed), optional `vo.mp3`, `sfx/` | 08 §6 |
| `photos/team/` | Portraits, candids, founders, group, `team.json` | 06 §2 |
| `photos/office/` | Work and studio photos | 06 §2 |
| `clients/<client-slug>/` | logo, screenshots, recordings, testimonial photo, `brief.md` | 06 §3 |
