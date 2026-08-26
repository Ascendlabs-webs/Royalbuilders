import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import CTASection from "@/components/ui/CTASection";
import Marquee from "@/components/ui/Marquee";
import { TIMELINE, VALUES, TEAM, CERTIFICATES, ACHIEVEMENTS } from "@/data/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Royal Builders - a Chennai construction and real estate company since 2010. Our story, mission, vision, values, certified achievements and the team behind 250+ delivered projects.",
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Royal Builders",
  description:
    "Royal Builders is a Chennai-based construction, interiors, real estate and building maintenance company founded in 2010.",
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      <PageHero
        kicker="About Us"
        title={
          <>
            Since 2010 - <span className="text-gradient-crimson">A Legacy of Architectural Excellence</span>
          </>
        }
        subtitle="For over a decade, Royal Builders has been synonymous with uncompromising quality, structural integrity and visionary design. We build not just structures, but enduring landmarks that define modern luxury."
        image="/images/about-office.jpg"
      />

      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-12 lg:px-8">
          <Reveal direction="right" className="relative lg:col-span-5">
            <div className="corner-frame p-3">
              <ParallaxImage
                src="/images/about-blueprint.jpg"
                alt="Architectural blueprint of a Royal Builders project"
                className="h-[400px] md:h-[500px]"
                speed={0.12}
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              kicker="Our Story"
              title={
                <>
                  Forged in Chennai. <span className="text-gradient-crimson">Built on Trust.</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <div className="space-y-5 text-[15px] leading-relaxed text-graphite">
                <p>
                  Royal Builders was founded in <strong className="text-navy-900">Vyasarpadi, Chennai, in 2010</strong>{" "}
                  with a single mission - to make premium construction honest, transparent and accessible to
                  every family. What began as a small team of engineers and craftsmen has grown into one of
                  North Chennai&apos;s most trusted names in construction and real estate.
                </p>
                <p>
                  Today, with <strong className="text-navy-900">250+ projects completed</strong> across
                  residential construction, luxury interiors, verified land sales and professional building
                  maintenance, we serve homeowners, NRI families and businesses with the same promise:{" "}
                  <em className="text-navy-900">what we quote is what you pay, and what we promise is what you get.</em>
                </p>
                <p>
                  Every project - from a modest individual house to a 40,000 sq.ft commercial complex - is
                  managed by our in-house team of engineers, architects, designers and 60+ skilled
                  professionals, under a single accountable point of contact.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-navy-900/10 pt-8 sm:grid-cols-4">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.label}>
                    <p className="font-display text-3xl font-bold text-gradient-crimson">{a.value}</p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-slate-soft uppercase">
                      {a.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
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
            kicker="The Royal Standard"
            title={
              <>
                Our Core <span className="text-gradient-crimson">Philosophy</span>
              </>
            }
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "eye", title: "Our Vision", text: "To be the vanguard of modern real estate and construction, recognised for pioneering designs that harmonise structural durability with unparalleled luxury aesthetics." },
              { icon: "target", title: "Our Mission", text: "To execute architectural and interior projects with rigorous precision, delivering premium environments that elevate the lifestyles of our esteemed clientele." },
              { icon: "gem", title: "Our Values", text: "Integrity in every transaction. Precision in every measurement. Innovation in every design. We uphold the Gold Standard of professionalism in the built environment." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={0.1 * i}>
                <div className="h-full border border-white/10 bg-navy-900/60 p-10 transition-all duration-500 hover:border-crimson-500/50 hover:shadow-crimson">
                  <Icon name={v.icon === "eye" ? "safe" : v.icon === "target" ? "chart" : "gem"} size={28} className="text-crimson-400" />
                  <h3 className="font-display mt-6 text-2xl font-bold text-white">{v.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <Reveal className="text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-crimson-500/60" aria-hidden />
                <span className="text-[11px] font-bold tracking-[0.35em] text-crimson-500 uppercase">
                  Our Journey
                </span>
                <span className="h-px w-12 bg-crimson-500/60" aria-hidden />
              </div>
            </Reveal>
            <ol className="relative mx-auto mt-14 max-w-4xl">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.year} delay={0.05 * i} as="li">
                  <div className="relative grid gap-4 border-b border-white/10 py-10 md:grid-cols-[120px_1fr] md:gap-10">
                    <span className="absolute top-14 left-0 h-[5px] w-[5px] rotate-45 bg-crimson-500 shadow-[0_0_12px_rgba(196,30,42,0.7)]" />
                    <p className="font-display text-3xl font-bold text-crimson-500 md:pl-10">{item.year}</p>
                    <div className="md:pl-4">
                      <h4 className="font-display text-xl font-semibold text-white">{item.title}</h4>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Values"
            title={
              <>
                Foundations of <span className="text-gradient-crimson">Prestige</span>
              </>
            }
          />
          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.08 * i}>
                <div className="group h-full border border-navy-900/10 bg-cream p-10 transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                  <span className="flex h-14 w-14 items-center justify-center border border-crimson-500/50 text-crimson-600 transition-all duration-500 group-hover:bg-crimson-500 group-hover:text-navy-950 group-hover:shadow-crimson-sm">
                    <Icon name={v.icon} size={24} />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Certificates & Achievements"
            title={
              <>
                Certified <span className="text-gradient-crimson">Excellence</span>
              </>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATES.map((c, i) => (
              <Reveal key={c.title} delay={0.08 * i}>
                <div className="group h-full border border-navy-900/10 bg-white p-8 text-center transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                  <span className="font-display text-3xl font-bold text-gradient-crimson">{c.year}</span>
                  <h3 className="font-display mt-4 text-lg font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-2 text-xs tracking-[0.2em] text-slate-soft uppercase">{c.subtitle}</p>
                  <span className="mx-auto mt-6 block h-px w-0 bg-crimson-500 transition-all duration-700 group-hover:w-full" aria-hidden />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Meet The Team"
            title={
              <>
                The People Behind <span className="text-gradient-crimson">Royal Builders</span>
              </>
            }
            subtitle="Engineers, designers and project leaders with one shared obsession - doing the job right."
          />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={0.06 * i}>
                <div className="group relative overflow-hidden border border-navy-900/10">
                  <div className="relative h-56 overflow-hidden md:h-64">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                    <div className="absolute right-0 bottom-0 left-0 p-4">
                      <h3 className="font-display text-base font-bold text-white">{m.name}</h3>
                      <p className="mt-0.5 text-[10px] font-bold tracking-[0.2em] text-crimson-400 uppercase">
                        {m.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee />
      <CTASection title="Work With the Team Chennai Trusts" />
    </>
  );
}
