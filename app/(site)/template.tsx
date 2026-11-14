import { PageCurtain } from "@/components/motion/PageCurtain";

/** Remounts on every navigation: plays the page curtain (in-app navigations only). */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageCurtain />
      {children}
    </>
  );
}
