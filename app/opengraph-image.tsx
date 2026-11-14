import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { META } from "@/content/copy";

export const alt = META.home.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Bricolage 800 as the display fallback while Quirkfy is missing (docs/04 §13 asks for Quirkfy). */
async function loadFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,800&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const pub = join(process.cwd(), "public", "brand");
  const [mark, logo] = await Promise.all([
    readFile(join(pub, "pdn-mark-gold.svg"), "utf8"),
    readFile(join(pub, "pdn-logo-horizontal-white.svg"), "utf8"),
  ]);
  const title = "Customers check you online before they pay you.";
  const font = await loadFont(title);
  const toData = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0a0a",
          fontFamily: font ? "Display" : "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={toData(mark)} width={430} height={444} alt="" style={{ position: "absolute", right: 70, top: 93 }} />
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 120,
            width: 640,
            display: "flex",
            color: "#f5f1e8",
            fontSize: 68,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            fontWeight: 800,
          }}
        >
          {title}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={toData(logo)} width={182} height={56} alt="" style={{ position: "absolute", left: 72, bottom: 64 }} />
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Display", data: font, weight: 800, style: "normal" }] : undefined,
    },
  );
}
