import type { Metadata } from "next";
import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import Marquee from "@/components/ui/Marquee";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesBento from "@/components/home/ServicesBento";
import StatsSection from "@/components/home/StatsSection";
import WhyChoose from "@/components/home/WhyChoose";
import CTASection from "@/components/ui/CTASection";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/data/site-data";
import { SITE } from "@/lib/site";
import { getSiteSettings, getPosts } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";

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

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function HomePage() {
  // CMS-first with static fallback — page looks identical until CMS has content.
  const [settings, posts] = await Promise.all([
    getSiteSettings().catch(() => null),
    getPosts().catch(() => []),
  ]);

  const slides = settings?.heroBanners?.length
    ? settings.heroBanners.map((b) => ({
        kicker: "Royal Builders",
        title: b.title || "Building Dreams Since 2010",
        sub: b.subtitle || "",
        image: urlFor(b.image) || `/images/hero-construction.jpg`,
        href: "/contact",
      }))
    : undefined;

  const testimonials =
    settings?.testimonials?.length
      ? settings.testimonials.map((t) => ({
          name: t.name,
          initials: initialsOf(t.name || "RB"),
          rating: 5,
          service: t.service || "Royal Builders",
          date: "Google Review",
          text: t.text,
        }))
      : [...TESTIMONIALS];

  const latestPosts = (posts ?? []).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroSlider slides={slides} />
      <Marquee />

      <AboutPreview />
      <ServicesBento />
      <StatsSection />
      <WhyChoose />

      <section className="relative overflow-hidden bg-alabaster py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 10% 20%, rgba(196,30,42,0.07), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <SectionHeading
              kicker="Insights"
              title={
                <>
                  Latest <span className="text-gradient-crimson">from the Blog</span>
                </>
              }
              subtitle="Guides on construction costs, interiors and land buying in Chennai."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((p, i) => (
                <Reveal key={p._id} delay={0.08 * i} className="h-full">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col border border-navy-900/10 bg-cream transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson"
                  >
                    {p.coverImageUrl && (
                      <div className="relative h-52 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.coverImageUrl}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
                        {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Blog"}
                      </p>
                      <h3 className="font-display mt-3 text-xl leading-snug font-bold text-navy-900">{p.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite">{p.excerpt}</p>
                      <span className="mt-5 text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
                        Read Article →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-navy-950 py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 85% 20%, rgba(196,30,42,0.12), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-6 lg:flex-row lg:px-8">
          <Reveal className="text-center lg:text-left">
            <p className="text-[11px] font-bold tracking-[0.35em] text-crimson-400 uppercase">
              Verified Listings
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
              Find Your <span className="text-gradient-crimson">Dream Property</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              Legally verified houses, apartments and land across Chennai — updated live from our listings desk.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <Link
              href="/real-estate"
              className="group inline-flex items-center gap-3 bg-crimson-500 px-9 py-4 text-[12px] font-bold tracking-[0.22em] text-white uppercase transition-all duration-500 hover:bg-crimson-400 hover:shadow-crimson-lg"
            >
              Browse Properties
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}