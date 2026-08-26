import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { TIMELINE } from "@/data/site-data";

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(196,30,42,0.08), transparent 70%)" }}
        aria-hidden
      />
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-12 lg:px-8">
        <Reveal direction="right" className="relative lg:col-span-5">
          <div className="corner-frame relative p-3">
            <ParallaxImage
              src="/images/about-office.jpg"
              alt="Royal Builders office and tower construction"
              className="h-[420px] md:h-[560px]"
              speed={0.12}
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden border border-crimson-500/60 bg-navy-950 px-8 py-6 text-white shadow-navy md:block lg:-right-10">
            <p className="font-display text-5xl font-bold text-crimson-500">2010</p>
            <p className="mt-1 text-[11px] tracking-[0.3em] text-white/60 uppercase">
              Founded in Chennai
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-crimson-500/60" aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.35em] text-crimson-600 uppercase">
                Our Legacy
              </span>
            </div>
            <h2 className="font-display mt-4 text-3xl leading-tight font-bold text-navy-900 md:text-5xl">
              A Legacy of <span className="text-gradient-crimson">Architectural Excellence</span> Since 2010
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-graphite">
              For over a decade, Royal Builders has been synonymous with uncompromising quality, structural
              integrity and visionary design. We build not just structures, but enduring landmarks that
              define modern luxury - trusted by hundreds of satisfied clients across Chennai.
            </p>
          </Reveal>

          <div className="mt-12">
            <ol className="relative ml-3 space-y-10 border-l border-navy-900/15 pl-8">
              {TIMELINE.filter((t) => t.year === "2010" || t.year === "2015" || t.year === "Today").map(
                (item, i) => (
                  <Reveal key={item.year} delay={0.1 * i} as="li" className="relative">
                    <span className="absolute -left-[37px] mt-1 h-[5px] w-[5px] rotate-45 border border-crimson-600 bg-crimson-500 shadow-[0_0_10px_rgba(196,30,42,0.6)]" />
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-2xl font-bold text-navy-900">{item.year}</span>
                      <span className="text-[11px] font-bold tracking-[0.25em] text-slate-soft uppercase">
                        {item.title}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-graphite">{item.description}</p>
                  </Reveal>
                )
              )}
            </ol>
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/about"
              className="link-underline mt-12 inline-flex items-center gap-3 font-body text-[12px] font-bold tracking-[0.25em] text-navy-900 uppercase"
            >
              Read Full Story <ArrowRight size={15} className="text-crimson-500" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
