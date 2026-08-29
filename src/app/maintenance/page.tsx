import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { Phone, MessageCircle, AlarmClockCheck, ShieldCheck, CalendarCheck } from "lucide-react";
import { MAINTENANCE_SERVICES } from "@/data/site-data";
import { waLink, PHONE_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Building Maintenance",
  description:
    "Professional building maintenance in Chennai - repairs, water tank & sump cleaning, tile deep cleaning, plumbing, electrical, fabrication, painting and AMC services. 24/7 emergency support.",
};

const AMC_PLANS: { name: string; price: string; per: string; features: readonly string[]; featured?: boolean }[] = [
  {
    name: "Quarterly AMC",
    price: "₹4,999",
    per: "per quarter",
    features: ["1 maintenance visit / month", "Tank & sump cleaning", "Electrical safety check", "Paint touch-ups", "Priority phone support"],
  },
  {
    name: "Annual AMC",
    price: "₹16,999",
    per: "per year",
    features: ["2 maintenance visits / month", "Tank, sump & drainage cleaning", "Full electrical & plumbing check", "Seasonal painting & waterproofing", "10% discount on repairs"],
    featured: true,
  },
  {
    name: "Corporate AMC",
    price: "Custom",
    per: "for offices & complexes",
    features: ["Dedicated site supervisor", "Monthly condition reports", "24/7 emergency response", "Annual deep cleaning", "Transparent billing"],
  },
] as const;

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        kicker="Maintenance"
        title={
          <>
            Professional Building <span className="text-gradient-crimson">Maintenance Services</span>
          </>
        }
        subtitle="Upholding the integrity and luxury of your architectural investments with precise, reliable and comprehensive care - across 16 specialised services."
        image="/images/hero-maintenance.jpg"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-3 bg-crimson-500 px-8 py-4 text-[12px] font-bold tracking-[0.2em] text-navy-950 uppercase transition-all duration-300 hover:bg-crimson-400 hover:shadow-crimson"
          >
            <Phone size={15} /> Emergency: +91 98409 51292
          </a>
          <a
            href={waLink("Hello Royal Builders, I need emergency building maintenance service.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-white/50 px-8 py-4 text-[12px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur transition-all duration-300 hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
          >
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="16 Services"
            title={
              <>
                Everything Your Building <span className="text-gradient-crimson">Needs</span>
              </>
            }
            subtitle="Trained technicians, genuine spare parts and fixed pricing - every visit, every time."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MAINTENANCE_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={0.04 * i} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden border border-navy-900/10 bg-cream transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-contain opacity-90 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                    <span className="absolute bottom-3 left-4 font-display text-2xl font-bold text-crimson-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-crimson-600">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-graphite">{s.description}</p>
                    <a
                      href={waLink(`Hello Royal Builders, I would like to book "${s.title}" service.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 border-b border-crimson-500 pb-1 text-[10px] font-bold tracking-[0.25em] text-crimson-600 uppercase transition-colors hover:text-navy-900"
                    >
                      Book Service <MessageCircle size={12} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
              variant="gold"
              title="Emergency? We're On Our Way."
              subtitle="Leak, short-circuit or blocked drainage? Call our 24/7 maintenance helpline - a technician reaches you within 2 hours across Chennai."
            />
          </>
        );
      }
