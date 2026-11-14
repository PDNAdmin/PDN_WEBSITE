// pnpm check:tokens: launch gate (CLAUDE.md §6). Fails if
//   1. any required token in content/settings.ts is still empty, or
//   2. any {{TOKEN}} / {{COPY_NEEDED}} text appears in prerendered production HTML (.next), or
//   3. any [PLACEHOLDER] content is referenced.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const problems = [];

// 1. settings
const src = readFileSync(join(root, "content", "settings.ts"), "utf8");
const settingsBlock = src.split("export const realContent")[0];
const OPTIONAL = new Set(["guarantee", "domain", "projects", "clients", "countries", "years"]); // hide-when-empty by design
for (const m of settingsBlock.matchAll(/^\s*(\w+):\s*""\s*,?\s*(\/\/\s*(.*))?$/gm)) {
  const [, key, , note] = m;
  if (OPTIONAL.has(key)) continue;
  problems.push(`content/settings.ts: "${key}" is empty ${note ? `(${note.trim()})` : ""}`);
}
if (/name:\s*""/.test(settingsBlock)) problems.push("content/settings.ts: founder names/roles/bios are empty");

// 2. built HTML
const appDir = join(root, ".next", "server", "app");
function walk(d, acc = []) {
  if (!existsSync(d)) return acc;
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".html") || f.endsWith(".rsc")) acc.push(p);
  }
  return acc;
}
const built = walk(appDir);
if (!built.length) console.warn("! No .next build found: run `pnpm build` first to scan rendered pages.");
for (const f of built) {
  const html = readFileSync(f, "utf8");
  const hits = new Set([...html.matchAll(/\{\{(COPY_NEEDED[^}]*|[A-Z0-9_]+)\}\}/g)].map((m) => m[0]));
  if (/\[PLACEHOLDER\]/.test(html)) hits.add("[PLACEHOLDER]");
  if (hits.size) problems.push(`${f.replace(root, "").replaceAll("\\", "/")}: ${[...hits].join(", ")}`);
}

if (problems.length) {
  console.log(red(`\n✗ check:tokens failed (${problems.length}):`));
  for (const p of problems) console.log(red(`  - ${p}`));
  console.log("");
  process.exit(1);
}
console.log(green("✓ check:tokens passed: no unfilled tokens or placeholders."));
