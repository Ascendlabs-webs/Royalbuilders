import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Royal Builders | Construction & Interiors Chennai",
    template: "%s | Royal Builders",
  },
  description:
    "Royal Builders - Chennai's trusted construction and real estate company since 2010. Premium house construction from ₹2,200/sq.ft, luxury interiors, verified land plots and professional building maintenance in Chennai. Free site visit & consultation.",
  keywords: [
    "construction company Chennai",
    "house construction cost Chennai",
    "house construction Chennai",
    "building construction Chennai",
    "interior designers Chennai",
    "interior design Chennai",
    "modular kitchen Chennai",
    "wardrobe design Chennai",
    "real estate Chennai",
    "land for sale North Chennai",
    "building maintenance Chennai",
    "water tank cleaning Chennai",
    "plumbing services Chennai",
    "electrical services Chennai",
    "home renovation Chennai",
    "villa construction Chennai",
    "apartment construction Chennai",
    "commercial construction Chennai",
    "joint venture construction Chennai",
    "structural design Chennai",
    "civil contractors Chennai",
    "best construction company Chennai",
    "top builders Chennai",
    "Royal Builders Chennai",
  ],
  authors: [{ name: "Royal Builders", url: SITE.url }],
  creator: "Royal Builders",
  publisher: "Royal Builders",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "Royal Builders",
    title: "Royal Builders | Building Dreams Since 2010",
    description:
      "Construction, Interior Design, Real Estate & Building Maintenance across Chennai. Free consultation & site visit - call +91 98409 51292.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Royal Builders - Building Dreams Since 2010",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Builders | Building Dreams Since 2010",
    description: "Construction, Interiors, Real Estate & Maintenance - trusted across Chennai since 2010.",
    images: ["/opengraph-image"],
    creator: "@royalbuilderschennai",
  },
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "ufgIehyyFCipkmvPiv9JZuAwOAaJVYy7fxx3Q-7ocBk",
  },
  category: "Construction & Real Estate",
};

export const viewport: Viewport = {
  themeColor: "#081625",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-cream font-body text-navy-900 antialiased">{children}</body>
    </html>
  );
}
