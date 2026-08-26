import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import Marquee from "@/components/ui/Marquee";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesBento from "@/components/home/ServicesBento";
import StatsSection from "@/components/home/StatsSection";
import WhyChoose from "@/components/home/WhyChoose";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import CTASection from "@/components/ui/CTASection";
import { GALLERY_ITEMS, GALLERY_FILTERS, TESTIMONIALS } from "@/data/site-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Royal Builders | Construction, Interiors, Real Estate & Maintenance in Chennai",
  description:
    "Royal Builders - Chennai's trusted construction and real estate company since 2010. Premium house construction from ₹2,200/sq.ft, luxury interiors, verified land plots and professional building maintenance. Call +91 98409 51292 for a free site visit.",
  alternates: { canonical: SITE.url },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does house construction cost in Chennai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Royal Builders's construction packages start at ₹2,200/sq.ft for Basic and go up to ₹2,800/sq.ft for Luxury, with transparent BOQs and no hidden charges.",
      },
    },
    {
      "@type": "Question",
      name: "Does Royal Builders provide free site visits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Royal Builders offers free site visits and consultations across Chennai. Call +91 98409 51292 to schedule one.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroSlider />
      <Marquee />

      <AboutPreview />

      <ServicesBento />

      <StatsSection />

      <WhyChoose />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Project Gallery"
            title={
              <>
                Crafted with <span className="text-gradient-crimson">Pride</span>
              </>
            }
            subtitle="A glimpse of the homes, interiors and commercial spaces we have delivered across Chennai."
          />
          <GalleryGrid items={[...GALLERY_ITEMS]} filters={[...GALLERY_FILTERS]} />
          <Reveal className="mt-12 text-center">
            <Button href="/projects" variant="navy">
              View All Projects
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-alabaster py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 10% 20%, rgba(196,30,42,0.07), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Client Stories"
            title={
              <>
                What Our <span className="text-gradient-crimson">Clients Say</span>
              </>
            }
            subtitle="Rated 4.9/5 on Google by homeowners, investors and businesses across Chennai."
          />
          <TestimonialCarousel items={[...TESTIMONIALS]} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
