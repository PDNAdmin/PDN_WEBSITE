import Image from "next/image";
import Link from "next/link";
import { MISC } from "@/content/copy";
import { rich } from "@/components/ui/Rich";
import { Button } from "@/components/ui/Button";
import { RIVER_D, RIVER_STROKE, RIVER_VIEWBOX } from "@/lib/river-path.generated";

/** 404 (docs/04 §14): black field, the mark wandering off the edge. */
export default function NotFound() {
  return (
    <main id="main" className="field-black relative min-h-[100svh] overflow-hidden">
      <svg aria-hidden="true" viewBox={RIVER_VIEWBOX} className="absolute -right-[15%] top-1/2 h-[120%] w-auto -translate-y-1/2" fill="none">
        <path d={RIVER_D} stroke="#d4af37" strokeWidth={RIVER_STROKE} />
      </svg>
      <div className="wrap relative flex min-h-[100svh] flex-col justify-center py-24">
        <Link href="/" className="mb-16 w-fit" aria-label="Pishon Digital Network">
          <Image src="/brand/pdn-logo-horizontal-white.svg" alt="" width={456} height={140} unoptimized className="h-9 w-auto" />
        </Link>
        <h1 className="font-display text-heading max-w-[12ch]">{rich(MISC.notFound.headline)}</h1>
        <p className="mt-8 max-w-[40ch] text-[1.25rem] leading-[1.5] text-[#d8d8d4]">{MISC.notFound.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">{MISC.notFound.home}</Button>
          <Button href="/contact" variant="quiet">
            {MISC.notFound.book}
          </Button>
        </div>
      </div>
    </main>
  );
}
