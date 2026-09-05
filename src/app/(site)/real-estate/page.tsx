import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import LeadForm from "@/components/ui/LeadForm";
import CTASection from "@/components/ui/CTASection";
import RealEstateListings from "./RealEstateListings";
import { REAL_ESTATE_TYPES, REAL_ESTATE_SERVICES, INVESTMENT_BENEFITS } from "@/data/site-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real Estate & Land",
  description:
    "Residential land, commercial property and investment plots in North Chennai with complete legal verification. Buy, sell or consult with Royal Builders's trusted real estate team.",
};

export default function RealEstatePage() {
  return (
    <>
      <PageHero
        kicker="Real Estate"
        title={
          <>
            Find Your <span className="text-gradient-crimson">Dream Land</span>
          </>
        }
        subtitle="Discover premium residential and commercial plots curated for architectural excellence. Build your legacy on a foundation of trust and uncompromising quality."
        image="/images/hero-land.jpg"
      />

      <RealEstateListings />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Property Types"
            title={
              <>
                Curated for <span className="text-gradient-crimson">Every Ambition</span>
              </>
            }
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {REAL_ESTATE_TYPES.map((t, i) => (
              <Reveal key={t.title} delay={0.08 * i} className="h-full">
                <div className="group h-full overflow-hidden border border-navy-900/10 bg-cream transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                    <span className="absolute top-5 left-5 border border-crimson-500/60 bg-navy-950/70 px-3 py-1.5 text-[9px] font-bold tracking-[0.25em] text-crimson-400 uppercase backdrop-blur">
                      {t.tag}
                    </span>
                    <h3 className="font-display absolute bottom-5 left-5 text-2xl font-bold text-white">
                      {t.title}
                    </h3>
                  </div>
                  <div className="p-8">
                    <p className="text-sm leading-relaxed text-graphite">{t.description}</p>
                    <p className="mt-6 border-t border-navy-900/10 pt-5 text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
                      North Chennai · Legal Verified
                    </p>
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
          style={{ background: "radial-gradient(700px circle at 85% 15%, rgba(196,30,42,0.08), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            dark
            kicker="How We Help"
            title={
              <>
                Comprehensive <span className="text-gradient-crimson">Real Estate Services</span>
              </>
            }
            subtitle="From initial inquiry to final registration - a seamless, transparent and luxurious experience."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REAL_ESTATE_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={0.07 * i} className="h-full">
                <div className="group h-full border border-white/10 bg-navy-900/60 p-8 transition-all duration-500 hover:border-crimson-500/50 hover:shadow-crimson">
                  <span className="flex h-13 w-13 items-center justify-center border border-crimson-500/40 p-3.5 text-crimson-400 transition-all duration-500 group-hover:bg-crimson-500 group-hover:text-navy-950 group-hover:shadow-crimson-sm">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="font-display mt-6 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-alabaster py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              kicker="Why Invest"
              title={
                <>
                  Investment <span className="text-gradient-crimson">Benefits</span>
                </>
              }
            />
            <div className="space-y-6">
              {INVESTMENT_BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={0.06 * i}>
                  <div className="group flex gap-5 border border-navy-900/10 bg-white p-6 transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-crimson-500/50 text-crimson-600 transition-all duration-500 group-hover:bg-crimson-500 group-hover:text-navy-950">
                      <Icon name={b.icon} size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-graphite">{b.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="left">
            <div className="relative overflow-hidden border border-crimson-500/40 shadow-navy">
              <img
                src="/images/land-aerial-1.jpg"
                alt="Aerial view of land parcels in North Chennai"
                loading="lazy"
                className="h-80 w-full object-cover md:h-96"
              />
              <div className="border-t border-crimson-500/40 bg-navy-950 p-8">
                <p className="text-[11px] font-bold tracking-[0.3em] text-crimson-400 uppercase">
                  Prime Corridors We Serve
                </p>
                <p className="font-display mt-3 text-2xl leading-snug font-bold text-white">
                  · Perambur · Manali · Thiruvottiyur · Ambattur
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Every parcel is verified for clear title, encumbrance and development feasibility before
                  it reaches you.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Location"
            title={
              <>
                North Chennai&apos;s <span className="text-gradient-crimson">Growth Corridors</span>
              </>
            }
            subtitle="Strategically located properties near upcoming metro, industrial and commercial developments."
          />
          <Reveal>
            <div className="crimson-hairline overflow-hidden">
              <iframe
                src={SITE.mapEmbed}
                title="Royal Builders office location map - Chennai"
                className="h-[420px] w-full grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 10% 20%, rgba(196,30,42,0.09), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              dark
              align="left"
              kicker="Lead Form"
              title={
                <>
                  Find Your <span className="text-gradient-crimson">Plot Today</span>
                </>
              }
              subtitle="Tell us your budget and preferred area - we'll shortlist verified options within 24 hours."
            />
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {["Free legal verification report with every shortlist", "Zero brokerage on direct purchases", "End-to-end registration support"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="h-1.5 w-1.5 rotate-45 bg-crimson-500" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15} direction="left">
            <div className="border border-crimson-500/40 bg-navy-900/70 p-8 backdrop-blur md:p-12">
              <LeadForm dark defaultService="Real Estate" heading="Request Land Shortlist" subheading="Our consultants will call you within 2 working hours." />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Consult a Land Expert Today" />
    </>
  );
}
