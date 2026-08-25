import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { STATS } from "@/data/site-data";

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-crimson-500/20 bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(196,30,42,0.05) 50%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-px lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={0.08 * i} className="border-r border-white/5 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(4)]:border-r-0">
            <div className="group px-6 py-14 text-center transition-colors duration-500 hover:bg-navy-800/50 lg:py-16">
              <p className="font-display text-5xl font-bold text-white transition-colors duration-500 group-hover:text-crimson-400 lg:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase">
                {stat.label}
              </p>
              <span className="mx-auto mt-5 block h-px w-0 bg-crimson-500 transition-all duration-700 group-hover:w-16" aria-hidden />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
