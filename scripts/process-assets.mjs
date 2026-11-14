// pnpm assets: converts raw files in /assets into /public/img (AVIF + WebP) and reports what's missing.
// Never edits /assets. Writes lib/assets.generated.json so components render placeholders for missing files.
//
// Lookup order for each manifest file:
//   1. assets/<path>                                  (canonical drop zone, docs/05 §9)
//   2. assets/PDN-Complete-Assets/assets/<path>       (the delivered asset bundle)
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { generated, other, real, videos } from "./asset-manifest.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(root, "assets");
const BUNDLE = join(ASSETS, "PDN-Complete-Assets", "assets");
const OUT = join(root, "public", "img");
const GEN = join(root, "lib", "assets.generated.json");
const force = process.argv.includes("--force");

const C = { red: "\x1b[31m", yellow: "\x1b[33m", green: "\x1b[32m", dim: "\x1b[2m", reset: "\x1b[0m", bold: "\x1b[1m" };

function locate(rel) {
  const a = join(ASSETS, rel);
  if (existsSync(a)) return { path: a, from: "assets" };
  const b = join(BUNDLE, rel);
  if (existsSync(b)) return { path: b, from: "bundle" };
  return null;
}

function fresh(src, out) {
  return !force && existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
}

function walk(dir, base = dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, base, acc);
    else if (e.name !== ".gitkeep") acc.push(relative(base, p).replaceAll("\\", "/"));
  }
  return acc;
}

const result = {};
const missing = [];
const fromBundle = [];
let made = 0;

for (const a of generated) {
  const found = locate(a.file);
  if (!found) {
    if (!a.optional) missing.push(a);
    result[a.id] = { exists: false, placeholder: a.placeholder };
    continue;
  }
  if (found.from === "bundle") fromBundle.push(a.id);
  const meta = await sharp(found.path).metadata();
  const entry = { exists: true, width: meta.width, height: meta.height };

  if (a.widths?.length && a.out) {
    const widths = a.widths.filter((w) => w <= meta.width);
    if (!widths.includes(meta.width) && widths.length < a.widths.length) widths.push(meta.width);
    const outBase = join(OUT, a.out);
    mkdirSync(dirname(outBase), { recursive: true });
    for (const w of widths) {
      const pipe = () => sharp(found.path).rotate().resize({ width: w, withoutEnlargement: true });
      const avif = `${outBase}-${w}.avif`;
      const webp = `${outBase}-${w}.webp`;
      if (!fresh(found.path, avif)) {
        await pipe().avif({ quality: a.quality ?? 52, effort: 6 }).toFile(avif);
        made++;
      }
      if (!fresh(found.path, webp)) {
        await pipe().webp({ quality: (a.quality ?? 52) + 20, alphaQuality: 90, effort: 5 }).toFile(webp);
        made++;
      }
    }
    entry.src = `/img/${a.out}`;
    entry.widths = widths.sort((x, y) => x - y);
  }
  result[a.id] = entry;
}

// Grain: TEX-01 → 256px greyscale PNG tile. If TEX-01 is missing, scripts/make-grain.mjs provides it.
const grainOut = join(OUT, "textures", "grain.png");
const tex01 = locate("textures/TEX-01_grain-tile.png");
mkdirSync(dirname(grainOut), { recursive: true });
if (tex01) {
  if (!fresh(tex01.path, grainOut)) {
    await sharp(tex01.path)
      .extract({ left: 0, top: 0, width: 256, height: 256 })
      .greyscale()
      .png({ compressionLevel: 9, palette: true, colors: 64 })
      .toFile(grainOut);
    made++;
  }
} else if (!existsSync(grainOut)) {
  await import("./make-grain.mjs");
}

// Found pictures (open collections, credited in found/credits.json): found/*.jpg → public/img/found/
const FOUND = join(root, "found");
if (existsSync(FOUND)) {
  for (const f of readdirSync(FOUND).filter((x) => /\.(jpe?g|png)$/i.test(x))) {
    const src = join(FOUND, f);
    const name = f.replace(/\.[^.]+$/, "");
    const meta = await sharp(src).metadata();
    const widths = [800, 1280, 1920].filter((w) => w <= meta.width);
    if (!widths.length) widths.push(meta.width);
    const outBase = join(OUT, "found", name);
    mkdirSync(dirname(outBase), { recursive: true });
    for (const w of widths) {
      const pipe = () => sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
      if (!fresh(src, `${outBase}-${w}.avif`)) await pipe().avif({ quality: 50, effort: 6 }).toFile(`${outBase}-${w}.avif`), made++;
      if (!fresh(src, `${outBase}-${w}.webp`)) await pipe().webp({ quality: 74, effort: 5 }).toFile(`${outBase}-${w}.webp`), made++;
    }
    result[`found:${name}`] = { exists: true, width: meta.width, height: meta.height, src: `/img/found/${name}`, widths };
  }
}

for (const o of other) {
  const found = locate(o.file);
  result[o.id] = { exists: !!found };
  if (!found && !o.optional) missing.push(o);
}

// Real material
const allFiles = [...walk(ASSETS).filter((f) => !f.startsWith("PDN-Complete-Assets/")), ...walk(BUNDLE)];
const realMissing = [];
for (const r of real) {
  const ok = r.files ? r.files.every((f) => allFiles.includes(f)) : allFiles.some((f) => r.pattern.test(f));
  result[r.id] = { exists: ok };
  if (!ok) realMissing.push(r);
}

// Rendered videos
const videoMissing = videos.filter((v) => !existsSync(join(root, "public", v.file)));
for (const v of videos) result[v.id] = { exists: !videoMissing.includes(v) };

// Fonts
const fontsDir = join(root, "brand", "fonts");
const hasQuirkfy = existsSync(fontsDir) && readdirSync(fontsDir).some((f) => /^quirkfy.*\.(woff2?|otf|ttf)$/i.test(f));

writeFileSync(GEN, JSON.stringify(result, null, 2) + "\n");

// Report
console.log(`\n${C.bold}PDN asset pipeline${C.reset}  ${C.dim}(${made} files written to public/img)${C.reset}`);
const present = generated.filter((a) => result[a.id].exists).length;
console.log(`${C.green}✓ ${present}/${generated.length} generated images present${C.reset}`);
if (fromBundle.length) {
  console.log(
    `${C.yellow}! ${fromBundle.length} read from assets/PDN-Complete-Assets/assets/ (not the canonical assets/<folder>/ paths).${C.reset}`,
  );
}
if (!hasQuirkfy) console.log(`${C.yellow}! Quirkfy font missing in brand/fonts/ (headings use Bricolage 800)${C.reset}`);

if (missing.length) {
  console.log(`\n${C.red}${C.bold}✗ MISSING manifest files (${missing.length}):${C.reset}`);
  for (const m of missing) console.log(`${C.red}  - ${m.id.padEnd(8)} assets/${m.file}${C.reset}  ${C.dim}placeholder: ${m.placeholder}${C.reset}`);
}
if (realMissing.length) {
  console.log(`\n${C.yellow}${C.bold}Real material still to shoot/collect (docs/06):${C.reset}`);
  for (const r of realMissing) console.log(`${C.yellow}  - ${r.label}${C.reset}  ${C.dim}(${r.usedBy})${C.reset}`);
}
if (videoMissing.length) {
  console.log(`\n${C.yellow}${C.bold}Rendered video not yet in public/video (docs/08, Phase 3):${C.reset}`);
  for (const v of videoMissing) console.log(`${C.yellow}  - ${v.id.padEnd(18)} public/${v.file}${C.reset}  ${C.dim}(${v.usedBy})${C.reset}`);
}
console.log("");
if (missing.length) process.exit(1);
