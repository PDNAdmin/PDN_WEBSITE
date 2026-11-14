import type { ReactNode } from "react";
import manifest from "@/lib/assets.generated.json";

type Entry = {
  exists: boolean;
  width?: number;
  height?: number;
  src?: string;
  widths?: number[];
  placeholder?: string;
};
const M = manifest as Record<string, Entry>;

export function hasAsset(id: string): boolean {
  const e = M[id];
  return Boolean(e?.exists && e.src && e.widths?.length);
}

export function assetSize(id: string): { width: number; height: number } | null {
  const e = M[id];
  return e?.width && e.height ? { width: e.width, height: e.height } : null;
}

type Props = {
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Rendered when the manifest file is missing (never a broken image). */
  fallback: ReactNode;
  /** Optional art-directed source for small screens (another manifest id). */
  mobile?: { id: string; media: string; sizes: string };
};

function srcset(e: Entry, ext: "avif" | "webp") {
  return e.widths!.map((w) => `${e.src}-${w}.${ext} ${w}w`).join(", ");
}

/**
 * Pre-optimised AVIF + WebP from scripts/process-assets.mjs, with intrinsic size to avoid CLS.
 * (A <picture> rather than next/image: the pipeline already produces every format and width.)
 */
export function Picture({ id, alt, sizes, className, imgClassName, priority, fallback, mobile }: Props) {
  const e = M[id];
  if (!e || !hasAsset(id)) return <>{fallback}</>;
  const m = mobile && hasAsset(mobile.id) ? M[mobile.id]! : null;
  const largest = e.widths!.at(-1)!;
  return (
    <picture className={className}>
      {m && mobile ? (
        <>
          <source type="image/avif" media={mobile.media} srcSet={srcset(m, "avif")} sizes={mobile.sizes} />
          <source type="image/webp" media={mobile.media} srcSet={srcset(m, "webp")} sizes={mobile.sizes} />
        </>
      ) : null}
      <source type="image/avif" srcSet={srcset(e, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(e, "webp")} sizes={sizes} />
      <img
        src={`${e.src}-${largest}.webp`}
        alt={alt}
        width={e.width}
        height={e.height}
        sizes={sizes}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
