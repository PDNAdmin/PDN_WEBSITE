// The asset manifest from docs/05-asset-prompts.md §9 and docs/06-photography.md §6.
// `widths` = sizes the components need (empty = presence check only, not used by a built page yet).
// `usedBy` documents which built component reads it.

/** @typedef {{ id: string, file: string, out?: string, widths?: number[], alpha?: boolean, quality?: number, usedBy?: string, placeholder: string, optional?: boolean }} Asset */

/** @type {Asset[]} */
export const generated = [
  // Illustrations
  { id: "ILL-01", file: "illustrations/ILL-01_hero-river-sculpture.png", out: "illustrations/ill-01", widths: [640, 960, 1280, 1536], usedBy: "HeroHome (desktop poster)", placeholder: "gold mark SVG on radial glow" },
  { id: "ILL-01m", file: "illustrations/ILL-01m_hero-river-sculpture-mobile.png", out: "illustrations/ill-01m", widths: [480, 768, 1024], usedBy: "HeroHome (mobile poster)", placeholder: "gold mark SVG on radial glow" },
  { id: "ILL-02", file: "illustrations/ILL-02_404-lost-river.png", out: "illustrations/ill-02", widths: [768, 1536], usedBy: "not-found", placeholder: "mark outline" },
  { id: "ILL-03", file: "illustrations/ILL-03_outcome-trust.png", out: "illustrations/ill-03", widths: [480, 720, 1024], usedBy: "OutcomesSection 01", placeholder: "icon-trust 96px on glow" },
  { id: "ILL-04", file: "illustrations/ILL-04_outcome-found.png", out: "illustrations/ill-04", widths: [480, 720, 1024], usedBy: "OutcomesSection 02", placeholder: "icon-search 96px on glow" },
  { id: "ILL-05", file: "illustrations/ILL-05_outcome-night.png", out: "illustrations/ill-05", widths: [480, 720, 1024], usedBy: "OutcomesSection 03", placeholder: "icon-chat 96px on glow" },
  { id: "ILL-06", file: "illustrations/ILL-06_service-websites.png", out: "illustrations/ill-06", widths: [400, 800], alpha: true, usedBy: "ServicesStrip", placeholder: "icon-website" },
  { id: "ILL-07", file: "illustrations/ILL-07_service-ai-agents.png", out: "illustrations/ill-07", widths: [400, 800], alpha: true, usedBy: "ServicesStrip", placeholder: "icon-ai-agent" },
  { id: "ILL-08", file: "illustrations/ILL-08_service-products.png", out: "illustrations/ill-08", widths: [400, 800], alpha: true, usedBy: "ServicesStrip", placeholder: "icon-digital-product" },
  { id: "ILL-09", file: "illustrations/ILL-09_service-university.png", out: "illustrations/ill-09", widths: [400, 800], alpha: true, usedBy: "ServicesStrip", placeholder: "icon-university" },
  { id: "ILL-10", file: "illustrations/ILL-10_websites-hero.png", placeholder: "radial glow" },
  { id: "ILL-11", file: "illustrations/ILL-11_insights-hero.png", placeholder: "radial glow" },
  { id: "ILL-12", file: "illustrations/ILL-12_book-pedestal.png", placeholder: "radial glow" },
  { id: "ILL-13", file: "illustrations/ILL-13_river-landscape.png", placeholder: "animated river SVG" },
  { id: "ILL-13m", file: "illustrations/ILL-13m_river-landscape-mobile.png", placeholder: "animated river SVG" },
  { id: "ILL-14", file: "illustrations/ILL-14_gold-and-onyx.png", placeholder: "TEX-03" },
  { id: "ILL-15", file: "illustrations/ILL-15_agent-orb.png", placeholder: "radial glow" },
  // Textures
  { id: "TEX-01", file: "textures/TEX-01_grain-tile.png", usedBy: "Grain (via process → img/textures/grain.png)", placeholder: "script-generated" },
  { id: "TEX-02", file: "textures/TEX-02_onyx-macro.jpg", placeholder: "flat onyx" },
  { id: "TEX-03", file: "textures/TEX-03_brushed-gold.jpg", placeholder: "gold gradient" },
  { id: "TEX-04", file: "textures/TEX-04_gold-smoke.jpg", out: "textures/tex-04", widths: [960, 1536], quality: 40, usedBy: "BookingSection background", placeholder: "radial glow" },
  { id: "TEX-05", file: "textures/TEX-05_light-leak.jpg", placeholder: "code gradient" },
  // 3D
  { id: "3D-01", file: "3d/3D-01_matcap-gold.png", placeholder: "MeshStandardMaterial metal" },
  { id: "3D-02", file: "3d/3D-02_matcap-onyx.png", placeholder: "MeshStandardMaterial" },
  // Showreel layers
  { id: "SR-01", file: "showreel/stills/SR-01_tube-macro.png", placeholder: "none (Remotion)" },
  { id: "SR-01-v", file: "showreel/stills/SR-01-v_tube-macro.png", placeholder: "none (Remotion)" },
  { id: "SR-02", file: "showreel/stills/SR-02_tube-loop.png", placeholder: "none (Remotion)" },
  { id: "SR-02-v", file: "showreel/stills/SR-02-v_tube-loop.png", placeholder: "none (Remotion)" },
  { id: "SR-03", file: "showreel/stills/SR-03_onyx-stage.png", placeholder: "none (Remotion)" },
  { id: "SR-03-v", file: "showreel/stills/SR-03-v_onyx-stage.png", placeholder: "none (Remotion)" },
  { id: "SR-04a", file: "showreel/stills/SR-04a_land-bg.png", placeholder: "none (Remotion)" },
  { id: "SR-04b", file: "showreel/stills/SR-04b_land-mid.png", placeholder: "none (Remotion)" },
  { id: "SR-04c", file: "showreel/stills/SR-04c_land-fg.png", placeholder: "none (Remotion)" },
  { id: "SR-05", file: "showreel/layers/SR-05_gold-dust.png", placeholder: "procedural particles", optional: true },
  { id: "SR-07", file: "showreel/stills/SR-07_network.png", placeholder: "none (Remotion)" },
  { id: "SR-07-v", file: "showreel/stills/SR-07-v_network.png", placeholder: "none (Remotion)" },
];

/** Non-image material the site or reel needs. Checked for presence only. */
export const other = [
  { id: "AUDIO", file: "showreel/audio/music.mp3", placeholder: "silent reel", usedBy: "Remotion (Phase 3)" },
  { id: "VO", file: "showreel/audio/vo.mp3", placeholder: "no VO", optional: true },
];

/** Real material (docs/06 §6): pattern checks. */
export const real = [
  { id: "T1/T2", pattern: /^photos\/team\/[a-z]+-[a-z-]+\.jpg$/, label: "assets/photos/team/<firstname-lastname>.jpg (+ -candid.jpg) per team member", usedBy: "About (Phase 2)" },
  { id: "T3", files: ["photos/team/founders-h.jpg", "photos/team/founders-v.jpg"], label: "Co-founder photos", usedBy: "About (Phase 2)" },
  { id: "T4", files: ["photos/team/team-group.jpg"], label: "Whole-team photo", usedBy: "About, showreel S7" },
  { id: "team.json", files: ["photos/team/team.json"], label: "Team roster", usedBy: "About (Phase 2)" },
  { id: "T5", pattern: /^photos\/office\/work-\d+\.jpg$/, label: "assets/photos/office/work-01.jpg …", usedBy: "About gallery" },
  { id: "T6", pattern: /^photos\/office\/studio-\d+\.jpg$/, label: "assets/photos/office/studio-01.jpg …", usedBy: "About gallery" },
  { id: "T7", pattern: /^showreel\/broll\/.+\.mp4$/, label: "assets/showreel/broll/*.mp4", usedBy: "Showreel S7" },
  { id: "CLIENTS", pattern: /^clients\/[a-z0-9-]+\/.+/, label: "assets/clients/<slug>/ (logo, screenshots, recordings, brief.md)", usedBy: "Marquee, Work, Testimonials" },
  { id: "REC", pattern: /^showreel\/screen-recordings\/.+-(desktop|mobile)\.mp4$/, label: "assets/showreel/screen-recordings/<slug>-desktop.mp4 / -mobile.mp4", usedBy: "Showreel S5" },
];

/** Rendered video (docs/07 §6), produced by Remotion into /public/video. */
export const videos = [
  { id: "VID-hero-loop", file: "video/hero-loop-1920x1080.mp4", usedBy: "Hero fallback (Phase 2)" },
  { id: "VID-showreel-loop", file: "video/showreel-loop-1920x1080.mp4", usedBy: "HOME.SHOWREEL" },
  { id: "VID-showreel-full", file: "video/showreel-1920x1080.mp4", usedBy: "Showreel modal" },
  { id: "SR-POSTER", file: "video/showreel-poster.avif", usedBy: "Showreel poster" },
];
