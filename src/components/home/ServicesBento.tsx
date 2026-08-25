import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/site-data";

export default function ServicesBento() {
  const [construction, interiors, realEstate, maintenance] = SERVICES;

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeading
          kicker="Our Services"
          title={
            <>
              Comprehensive Solutions Under <span className="text-gradient-crimson">One Roof</span>
            </>
          }
          subtitle="From the first brick to the final brush stroke - and beyond. Four specialised divisions, one promise of uncompromising quality."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[280px]">
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <Link
              href={`/${construction.slug}`}
              className="group relative block h-full min-h-[420px] overflow-hidden border border-navy-900/10 lg:min-h-0"
            >
              <img
                src={construction.image}
                alt={construction.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10 transition-opacity duration-700 group-hover:opacity-90" />
              <span className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center border border-crimson-500/50 bg-navy-950/40 text-crimson-400 backdrop-blur transition-all duration-500 group-hover:bg-crimson-500 group-hover:text-navy-950">
                <span className="font-display text-lg">01</span>
              </span>
              <div className="absolute right-0 bottom-0 left-0 p-8">
                <p className="text-[10px] font-bold tracking-[0.35em] text-crimson-400 uppercase">
                  {construction.tagline}
                </p>
                <h3 className="font-display mt-2 text-3xl font-bold text-white">{construction.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {construction.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-crimson-500 pb-1 text-[11px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                  Explore Construction
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Link
              href={`/${interiors.slug}`}
              className="group relative block h-full min-h-[280px] overflow-hidden border border-navy-900/10"
            >
              <img
                src={interiors.image}
                alt={interiors.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-7">
                <p className="text-[10px] font-bold tracking-[0.35em] text-crimson-400 uppercase">02</p>
                <h3 className="font-display mt-1 text-2xl font-bold text-white">{interiors.title}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                  Explore <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <Link
              href={`/${realEstate.slug}`}
              className="group relative block h-full min-h-[280px] overflow-hidden border border-navy-900/10"
            >
              <img
                src={realEstate.image}
                alt={realEstate.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-7">
                <p className="text-[10px] font-bold tracking-[0.35em] text-crimson-400 uppercase">03</p>
                <h3 className="font-display mt-1 text-xl font-bold text-white">{realEstate.title}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                  Explore <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.3} className="lg:col-span-2">
            <Link
              href={`/${maintenance.slug}`}
              className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden border border-crimson-500/40 bg-navy-950 p-7 transition-all duration-500 hover:shadow-crimson"
            >
              <span className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-70" style={{ background: "radial-gradient(circle, rgba(196,30,42,0.22), transparent 70%)" }} aria-hidden />
              <span className="flex h-12 w-12 items-center justify-center border border-crimson-500/60 text-crimson-400 transition-all duration-500 group-hover:bg-crimson-500 group-hover:text-navy-950">
                <span className="font-display text-lg">04</span>
              </span>
              <p className="mt-4 text-[10px] font-bold tracking-[0.35em] text-crimson-400 uppercase">
                {maintenance.tagline}
              </p>
              <h3 className="font-display mt-1 text-xl font-bold text-white">{maintenance.title}</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                Explore <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
