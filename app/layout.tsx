import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { displayFontClass, displayWeight, hasQuirkfy } from "@/lib/fonts/display.generated";
import { GLOBAL, META } from "@/content/copy";
import { siteUrl, isProductionDeploy } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
});

if (!hasQuirkfy && process.env.NODE_ENV !== "test") {
  // CLAUDE.md §3.4: don't block the build, just warn.
  console.warn("[fonts] Quirkfy missing: headings use Bricolage Grotesque 800.");
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: META.home.title,
  description: META.home.description,
  applicationName: "Pishon Digital Network",
  icons: {
    icon: [
      { url: "/brand/png/pdn-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/png/pdn-favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/png/pdn-favicon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Pishon Digital Network",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  robots: isProductionDeploy || !process.env.VERCEL ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f0f10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Runs before paint: marks JS + device tier (docs/07 §1) so CSS can adapt without layout shift. */
const tierScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var n=navigator,c=n.connection||{},m=n.deviceMemory,h=n.hardwareConcurrency||4,low=!!c.saveData||(m&&m<=4)||h<=4||/(^|-)(2g|3g)$/.test(c.effectiveType||''),fine=matchMedia('(pointer:fine)').matches,high=fine&&h>=8&&(!m||m>=8)&&!c.saveData;d.setAttribute('data-tier',low?'low':high?'high':'mid')}catch(e){d.setAttribute('data-tier','mid')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${bricolage.variable} ${displayFontClass}`}
      style={{ "--display-weight": displayWeight } as React.CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: tierScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {GLOBAL.skipLink}
        </a>
        {children}
        {/* Analytics: none for now (client decision). Single slot, keep commented out:
        <Analytics /> */}
      </body>
    </html>
  );
}
