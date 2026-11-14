// Generates a seamless 256px film-grain tile at public/img/textures/grain.png (fallback for TEX-01).
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "img", "textures", "grain.png");
const S = 256;
const buf = Buffer.alloc(S * S);
// Independent per-pixel noise is tileable by construction (no low-frequency structure).
for (let i = 0; i < buf.length; i++) {
  // approx. gaussian around mid-grey
  const g = (Math.random() + Math.random() + Math.random()) / 3;
  buf[i] = Math.max(0, Math.min(255, Math.round(128 + (g - 0.5) * 220)));
}
mkdirSync(dirname(out), { recursive: true });
await sharp(buf, { raw: { width: S, height: S, channels: 1 } })
  .png({ compressionLevel: 9, palette: true, colors: 64 })
  .toFile(out);
console.log("[grain] wrote public/img/textures/grain.png");
