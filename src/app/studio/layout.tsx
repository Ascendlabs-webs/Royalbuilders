import type { Metadata } from "next";

/**
 * Bare layout for the embedded Sanity Studio.
 * Deliberately excludes the marketing chrome (Lenis smooth-scroll, preloader,
 * navbar/footer) so Studio keeps its native scroll panes on phone + laptop.
 */
export const metadata: Metadata = {
  title: "CMS Studio | Royal Builders",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ minHeight: "100dvh", background: "#0f0f11" }}>{children}</div>;
}
