import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_CHOOSE } from "@/data/site-data";

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at 85% 10%, rgba(196,30,42,0.09), transparent 55%), radial-gradient(600px circle at 10% 90%, rgba(196,30,42,0.06), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeading
          dark
          kicker="The Royal Standard"
          title={
            <>
              Why Choose <span className="text-gradient-crimson">Royal Group?</span>
            </>
          }
          subtitle="Eight promises we make to every client - and have kept for over a decade."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <div className="group relative h-full border border-white/10 bg-navy-900/60 p-8 transition-all duration-500 hover:border-crimson-500/50 hover:bg-navy-800/80 hover:shadow-crimson">
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(300px circle at 50% 0%, rgba(196,30,42,0.08), transparent 70%)" }}
                  aria-hidden
                />
                <span className="relative flex h-14 w-14 items-center justify-center border border-crimson-500/40 text-crimson-400 transition-all duration-500 group-hover:rotate-6 group-hover:bg-crimson-500 group-hover:text-navy-950 group-hover:shadow-crimson-sm">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className="font-display relative mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>
                <span className="absolute top-0 right-0 h-8 w-8 border-t border-r border-crimson-500/0 transition-all duration-500 group-hover:border-crimson-500/70" aria-hidden />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
