import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Royal Builders",
  alternateName: "Royal Builders",
  description:
    "Royal Builders is a Chennai-based construction and real estate company offering house construction, interior design, land sales and building maintenance since 2010.",
  url: SITE.url,
  telephone: "+919840951292",
  email: SITE.email,
  foundingDate: "2010",
  founder: { "@type": "Person", name: "D. Mukhtar" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.754/1007, BV Colony, 23rd Street,",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600039",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 13.1289, longitude: 80.2409 },
  openingHours: "Mo-Su 09:00-20:00",
  priceRange: "₹₹",
  areaServed: [
    "Chennai",
    "North Chennai",
    "Perambur",
    "Manali",
    "Thiruvottiyur",
    "Ambattur",
    "BV Colony",
  ],
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.instagram,
    SITE.socials.youtube,
    SITE.socials.whatsapp,
    SITE.socials.gmb,
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Residential Construction", serviceType: "House Construction" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Interior Design", serviceType: "Interior Design" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Real Estate & Land Sales", serviceType: "Real Estate" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Building Maintenance", serviceType: "Building Maintenance" },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FloatingButtons />
    </>
  );
}
