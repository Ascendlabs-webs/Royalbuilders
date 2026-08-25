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
            href={waLink("Hello Royal Group, I need emergency building maintenance service.")}
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
                      className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
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
                      href={waLink(`Hello Royal Group, I would like to book "${s.title}" service.`)}
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

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(700px circle at 80% 20%, rgba(196,30,42,0.08), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            dark
            kicker="AMC Packages"
            title={
              <>
                Annual Maintenance <span className="text-gradient-crimson">Contracts</span>
              </>
            }
            subtitle="Set-and-forget care for your home, office or apartment complex - we handle everything."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {AMC_PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={0.08 * i} className="h-full">
                <div
                  className={`relative flex h-full flex-col border p-9 transition-all duration-500 ${
                    plan.featured
                      ? "border-crimson-500 bg-navy-900 shadow-crimson-lg"
                      : "border-white/10 bg-navy-900/50 hover:border-crimson-500/40"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-crimson-500 px-4 py-1 text-[9px] font-bold tracking-[0.25em] text-navy-950 uppercase">
                      Best Value
                    </span>
                  )}
                  <p className="text-[11px] font-bold tracking-[0.3em] text-crimson-400 uppercase">{plan.name}</p>
                  <p className="font-display mt-3 text-4xl font-bold text-white">
                    {plan.price}
                    <span className="ml-2 text-sm font-normal text-white/50">{plan.per}</span>
                  </p>
                  <ul className="mt-7 flex-1 space-y-3 border-t border-white/10 pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                        <ShieldCheck size={15} className="mt-0.5 shrink-0 text-crimson-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`Hello Royal Group, I'm interested in the ${plan.name} AMC package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 flex items-center justify-center gap-2 border px-6 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                      plan.featured
                        ? "border-crimson-500 bg-crimson-500 text-navy-950 hover:bg-transparent hover:text-crimson-400"
                        : "border-crimson-500/50 text-crimson-400 hover:bg-crimson-500 hover:text-navy-950"
                    }`}
                  >
                    <CalendarCheck size={14} /> Enquire Now
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-5 border border-white/10 bg-navy-900/50 p-8 md:grid-cols-3 md:p-10">
            {[
              { icon: AlarmClockCheck, text: "24/7 emergency response for plumbing, electrical and leaks" },
              { icon: ShieldCheck, text: "Insured technicians and genuine spare parts with warranty" },
              { icon: CalendarCheck, text: "Scheduled visits that never slip - with visit reports" },
            ].map(({ icon: IconCmp, text }, i) => (
              <Reveal key={text} delay={0.08 * i}>
                <div className="flex items-start gap-4">
                  <IconCmp size={26} className="shrink-0 text-crimson-400" />
                  <p className="text-sm leading-relaxed text-white/70">{text}</p>
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
