// Asset manifest, Direction v2 (docs/11, docs/12, prompt/assets.md).
// Generated images are optional: until a file exists, the site keeps its code-built interface fragments.
// `widths` = sizes the components need.

/** @typedef {{ id: string, file: string, out?: string, widths?: number[], usedBy?: string, placeholder: string, optional?: boolean }} Asset */

/** @type {Asset[]} */
export const generated = [
  // Realistic scenes (prompt/assets.md §3). Illustrative only: never presented as clients, team or testimonials.
  { id: "HUM-01", file: "generated/HUM-01_trust-customer-phone.jpg", out: "generated/hum-01", widths: [640, 960, 1280], usedBy: "Outcomes 01 · Trust", placeholder: "website fragment on tone panel", optional: true },
  { id: "HUM-02", file: "generated/HUM-02_found-search-in-traffic.jpg", out: "generated/hum-02", widths: [640, 960, 1280], usedBy: "Outcomes 02 · Found", placeholder: "map fragment on tone panel", optional: true },
  { id: "HUM-03", file: "generated/HUM-03_paid-phone-at-night.jpg", out: "generated/hum-03", widths: [640, 960, 1280], usedBy: "Outcomes 03 · Paid", placeholder: "lock-screen fragment on tone panel", optional: true },
  { id: "HUM-04", file: "generated/HUM-04_business-owner-boutique.jpg", out: "generated/hum-04", widths: [640, 960, 1440], usedBy: "Audience · Business owners", placeholder: "no image", optional: true },
  { id: "HUM-05", file: "generated/HUM-05_professional-office.jpg", out: "generated/hum-05", widths: [640, 960, 1440], usedBy: "Audience · Professionals", placeholder: "no image", optional: true },
  { id: "HUM-06", file: "generated/HUM-06_company-team-meeting.jpg", out: "generated/hum-06", widths: [640, 960, 1440], usedBy: "Audience · Companies", placeholder: "no image", optional: true },
  { id: "HUM-07", file: "generated/HUM-07_diaspora-founder-call.jpg", out: "generated/hum-07", widths: [640, 960, 1440], usedBy: "Audience · Clients abroad", placeholder: "no image", optional: true },
  { id: "HUM-08", file: "generated/HUM-08_owner-answering-call.jpg", out: "generated/hum-08", widths: [640, 960, 1280], usedBy: "/contact", placeholder: "no image", optional: true },
];

/** Non-image material the reel needs. Checked for presence only. */
export const other = [
  { id: "AUDIO", file: "showreel/audio/music.mp3", placeholder: "silent reel", usedBy: "Remotion (Phase 3)", optional: true },
];

/** Real material (docs/12 §2–3): pattern checks. */
export const real = [
  { id: "REC", pattern: /^showreel\/screen-recordings\/.+-(desktop|mobile)\.mp4$/, label: "Client screen recordings: assets/showreel/screen-recordings/<slug>-desktop.mp4 / -mobile.mp4", usedBy: "Showreel, Work" },
  { id: "CLIENTS", pattern: /^clients\/[a-z0-9-]+\/.+/, label: "Client folders: assets/clients/<slug>/ (logo, brief.md, hero still)", usedBy: "Logo strip, Work, Testimonials" },
  { id: "T1/T2", pattern: /^photos\/team\/[a-z]+-[a-z-]+\.jpg$/, label: "Team portraits: assets/photos/team/<first-last>.jpg (+ -candid.jpg)", usedBy: "About, booking" },
  { id: "T4", files: ["photos/team/team-group.jpg"], label: "Whole-team photo", usedBy: "About, showreel" },
  { id: "T5", pattern: /^photos\/office\/work-\d+\.jpg$/, label: "Work stills: assets/photos/office/work-01.jpg …", usedBy: "About" },
  { id: "T7", pattern: /^showreel\/broll\/.+\.mp4$/, label: "B-roll: assets/showreel/broll/*.mp4 (incl. Lagos night footage)", usedBy: "Showreel" },
];

/** Rendered video (Remotion, Phase 3) in /public/video. */
export const videos = [
  { id: "VID-showreel-loop", file: "video/showreel-loop-1920x1080.mp4", usedBy: "HOME.SHOWREEL" },
  { id: "VID-showreel-full", file: "video/showreel-1920x1080.mp4", usedBy: "Showreel modal" },
];
