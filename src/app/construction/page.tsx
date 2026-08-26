import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import { Check, ArrowDown } from "lucide-react";
import {
  CONSTRUCTION_PACKAGES,
  CONSTRUCTION_SERVICES,
  CONSTRUCTION_PROCESS,
  CONSTRUCTION_FAQS,
} from "@/data/site-data";
import { formatInr } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Construction Services",
  description:
    "House construction in Chennai from ₹2,200/sq.ft. Villas, apartments, commercial buildings, joint ventures and structural design by Royal Builders - free site visit, transparent pricing, on-time delivery since 2010.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CONSTRUCTION_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const galleryItems = [
  { src: "/images/construction-site-1.jpg", category: "Construction", title: "RCC Structure Works" },
  { src: "/images/construction-villa-1.jpg", category: "Villa", title: "Villa Construction", span: "tall" as const },
  { src: "/images/construction-commercial-1.jpg", category: "Construction", title: "Commercial Build" },
  { src: "/images/construction-crane-1.jpg", category: "Construction", title: "Tower Crane Operations" },
  { src: "/images/construction-apartment-1.jpg", category: "Apartment", title: "Apartment Projects" },
  { src: "/images/construction-structure-1.jpg", category: "Construction", title: "Structural Steel", span: "wide" as const },
];

export default function ConstructionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        kicker="Construction"
        title={
          <>
            We Build Your <span className="text-gradient-crimson">Dream Home</span>
          </>
        }
        subtitle="Uncompromising quality, meticulous attention to detail and a legacy of architectural excellence. We turn visions into enduring structural masterpieces - from ₹2,200/sq.ft."
        image="/images/construction-site-1.jpg"
      />

      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Construction Packages"
            title={
              <>
                Transparent Pricing, <span className="text-gradient-crimson">Four Packages</span>
              </>
            }
            subtitle="Fixed per-square-foot pricing with a detailed BOQ - no hidden costs, ever. Prices are indicative for shell-plus-finish construction."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CONSTRUCTION_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.name} delay={0.08 * i} className="h-full">
                <div
                  className={cn(
                    "group relative flex h-full flex-col border p-8 transition-all duration-500",
                    pkg.featured
                      ? "border-crimson-500 bg-navy-950 text-white shadow-crimson-lg"
                      : "border-navy-900/10 bg-cream hover:border-crimson-500/60 hover:shadow-crimson"
                  )}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-crimson-500 px-4 py-1 text-[9px] font-bold tracking-[0.25em] text-navy-950 uppercase">
                      Most Popular
                    </span>
                  )}
                  <p className={cn("text-[11px] font-bold tracking-[0.3em] uppercase", pkg.featured ? "text-crimson-400" : "text-slate-soft")}>
                    Package {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold">{pkg.name}</h3>
                  <p className={cn("mt-1 text-sm", pkg.featured ? "text-white/60" : "text-graphite")}>
                    {pkg.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className={cn("font-display text-4xl font-bold", pkg.featured ? "text-crimson-400" : "text-navy-900")}>
                      {formatInr(pkg.price)}
                    </span>
                    <span className={cn("text-sm", pkg.featured ? "text-white/50" : "text-slate-soft")}>/ {pkg.per}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 border-t pt-6" style={{ borderColor: pkg.featured ? "rgba(196,30,42,0.3)" : "rgba(8,22,37,0.1)" }}>
                    {pkg.features.map((f) => (
                      <li key={f} className={cn("flex items-start gap-3 text-sm", pkg.featured ? "text-white/75" : "text-graphite")}>
                        <Check size={15} className="mt-0.5 shrink-0 text-crimson-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={pkg.featured ? "gold" : "navy"}
                    className="mt-8 w-full"
                  >
                    Get This Package
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="What We Build"
            title={
              <>
                Our Construction <span className="text-gradient-crimson">Services</span>
              </>
            }
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CONSTRUCTION_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={0.06 * i} className="h-full">
                <div className="group h-full overflow-hidden border border-navy-900/10 bg-white transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 font-display text-4xl font-bold text-crimson-500/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-xl font-bold text-navy-900 transition-colors group-hover:text-crimson-600">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(700px circle at 80% 20%, rgba(196,30,42,0.08), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            dark
            kicker="The Royal Process"
            title={
              <>
                From Consultation to <span className="text-gradient-crimson">Handover</span>
              </>
            }
            subtitle="A proven six-stage process refined across 250+ projects."
          />
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
            {CONSTRUCTION_PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <div className="group relative h-full border border-white/10 bg-navy-900/60 p-6 transition-all duration-500 hover:border-crimson-500/50 hover:shadow-crimson">
                  <p className="font-display text-4xl font-bold text-crimson-500/30 transition-colors duration-500 group-hover:text-crimson-500">
                    {p.step}
                  </p>
                  <h3 className="font-display mt-4 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{p.description}</p>
                  {i < CONSTRUCTION_PROCESS.length - 1 && (
                    <ArrowDown className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 text-crimson-500 xl:block" size={16} />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Construction Gallery"
            title={
              <>
                Built with <span className="text-gradient-crimson">Precision</span>
              </>
            }
          />
          <GalleryGrid items={galleryItems} filters={["All", "Construction", "Villa", "Apartment"]} />
        </div>
      </section>

      <section className="bg-alabaster py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              kicker="FAQ"
              title={
                <>
                  Construction Questions, <span className="text-gradient-crimson">Answered</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <Accordion items={[...CONSTRUCTION_FAQS]} />
            </Reveal>
          </div>
          <Reveal delay={0.15} direction="left">
            <div className="sticky top-28 overflow-hidden border border-crimson-500/40">
              <img
                src="/images/construction-villa-1.jpg"
                alt="Luxury villa constructed by Royal Builders"
                loading="lazy"
                className="h-72 w-full object-cover"
              />
              <div className="bg-navy-950 p-10 text-white">
                <p className="text-[11px] font-bold tracking-[0.35em] text-crimson-400 uppercase">Still deciding?</p>
                <h3 className="font-display mt-3 text-2xl font-bold">
                  Get a Free Detailed Cost Estimate
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Share your plot size and requirement - our engineers will prepare a transparent BOQ
                  estimate within 48 hours, free of charge.
                </p>
                <Button href="/contact" variant="gold" className="mt-8">
                  Get Free Estimate
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Start Your Construction Journey Today" />
    </>
  );
}
