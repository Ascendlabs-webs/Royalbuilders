import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import GalleryGrid from "@/components/ui/GalleryGrid";
import LeadForm from "@/components/ui/LeadForm";
import CTASection from "@/components/ui/CTASection";
import { INTERIOR_SECTIONS, MATERIALS, LIGHTING_SOLUTIONS } from "@/data/site-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Interior Design",
  description:
    "Premium interior solutions in Chennai - modular kitchens, luxury wardrobes, TV units, false ceilings, profile lighting and wall panels. Free design consultation from Royal Builders.",
};

const galleryItems = [
  { src: "/images/interior-kitchen-after.png?v=1", category: "Kitchen", title: "Modular Kitchen" },
  { src: "/images/interior-ceiling-1.jpg", category: "Ceiling", title: "False Ceiling" },
  { src: "/images/interior-living-room.png?v=1", category: "Living", title: "Living Room Design" },
  { src: "/images/interior-bedroom-1.jpg", category: "Bedroom", title: "Bedroom Design", span: "wide" as const },
  { src: "/images/interior-tv-1.jpg?v=4", category: "Living", title: "TV Unit" },
  { src: "/images/interior-panel-1.jpg", category: "Panels", title: "Wall Panels" },
  { src: "/images/interior-wardrobe-2.jpg", category: "Wardrobe", title: "Luxury Wardrobe" },
];

export default function InteriorsPage() {
  return (
    <>
      <PageHero
        kicker="Interiors"
        title={
          <>
            Premium <span className="text-gradient-crimson">Interior Solutions</span>
          </>
        }
        subtitle="Elevating spaces with meticulous craftsmanship and visionary design. From conceptual layouts to the final luxurious finishes - kitchens, wardrobes, ceilings and lighting."
        image="/images/interior-living-1.jpg?v=4"
      />

      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Curated Living Spaces"
            title={
              <>
                Designed for the Way <span className="text-gradient-crimson">You Live</span>
              </>
            }
            subtitle="Drag the slider to see the transformation - every space we design is planned, manufactured and installed by our own team."
          />

          <div className="space-y-24">
            {INTERIOR_SECTIONS.map((sec, i) => (
              <div
                key={sec.title}
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                <Reveal direction={i % 2 === 0 ? "right" : "left"}>
                  {sec.before && sec.after ? (
                    <div className="border border-navy-900/10 p-2 shadow-card">
                      <BeforeAfter before={sec.before} after={sec.after} alt={sec.title} />
                    </div>
                  ) : (
                    <div className="group relative overflow-hidden border border-navy-900/10">
                      <img
                        src={sec.image}
                        alt={sec.title}
                        loading="lazy"
                        className="h-[380px] w-full object-cover transition-transform duration-1000 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-70" />
                      <span className="absolute bottom-5 left-5 font-display text-4xl font-bold text-crimson-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </Reveal>

                <div>
                  <Reveal>
                    <span className="text-[11px] font-bold tracking-[0.3em] text-crimson-600 uppercase">
                      {String(i + 1).padStart(2, "0")} — Signature Works
                    </span>
                    <h3 className="font-display mt-3 text-3xl font-bold text-navy-900 md:text-4xl">
                      {sec.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-graphite">{sec.specs}</p>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-8 text-[10px] font-bold tracking-[0.3em] text-slate-soft uppercase">
                      Materials Used
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sec.materials?.map((m) => (
                        <span
                          key={m}
                          className="border border-crimson-500/50 bg-crimson-500/5 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-crimson-700 uppercase transition-colors hover:bg-crimson-500 hover:text-navy-950"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at 15% 15%, rgba(196,30,42,0.08), transparent 55%), radial-gradient(600px circle at 90% 85%, rgba(196,30,42,0.06), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            dark
            kicker="Materials"
            title={
              <>
                Premium <span className="text-gradient-crimson">Materials Only</span>
              </>
            }
            subtitle="We use only certified materials with written warranties - because what's hidden matters as much as what's seen."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {MATERIALS.map((m, i) => (
              <Reveal key={m.name} delay={0.08 * i} className="h-full">
                <div className="group h-full border border-white/10 bg-navy-900/60 p-8 transition-all duration-500 hover:border-crimson-500/50 hover:shadow-crimson">
                  <span className="font-display text-3xl font-bold text-gradient-crimson">{m.name}</span>
                  <h3 className="font-display mt-4 text-xl font-bold text-white">{m.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <SectionHeading
              dark
              kicker="Lighting Solutions"
              title={
                <>
                  Light That <span className="text-gradient-crimson">Transforms</span>
                </>
              }
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {LIGHTING_SOLUTIONS.map((l, i) => (
                <Reveal key={l.title} delay={0.08 * i} className="h-full">
                  <div className="group h-full overflow-hidden border border-white/10 transition-all duration-500 hover:border-crimson-500/50 hover:shadow-crimson">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={l.image}
                        alt={l.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                    </div>
                    <div className="bg-navy-900/70 p-6">
                      <h3 className="font-display text-lg font-bold text-white">{l.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/55">{l.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Project Gallery"
            title={
              <>
                Interiors We&apos;re <span className="text-gradient-crimson">Proud Of</span>
              </>
            }
          />
          <GalleryGrid items={galleryItems} filters={["All", "Kitchen", "Wardrobe", "Living", "Ceiling", "Bedroom", "Panels"]} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-alabaster py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 90% 10%, rgba(196,30,42,0.08), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1400px] items-start gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              kicker="Get a Quote"
              title={
                <>
                  Consult Our <span className="text-gradient-crimson">Designers</span>
                </>
              }
              subtitle="Share your space and style preference. We'll send you a concept design and transparent quote within 48 hours - free."
            />
            <Reveal delay={0.1}>
              <div className="corner-frame relative hidden p-4 lg:block">
                <img
                  src="/images/interior-bedroom-1.jpg"
                  alt="Bedroom interior design by Royal Builders"
                  loading="lazy"
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} direction="left">
            <div className="border border-crimson-500/40 bg-white p-8 shadow-card md:p-12">
              <LeadForm defaultService="Interiors" heading="Request Interior Quote" subheading="Free measurement and design consultation for homes and offices in Chennai." />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Let's Design Your Perfect Space" />
    </>
  );
}
