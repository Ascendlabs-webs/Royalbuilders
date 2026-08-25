import Breadcrumbs from "./Breadcrumbs";
import Reveal from "./Reveal";

export default function PageHero({
  kicker,
  title,
  subtitle,
  image,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-navy-950 pb-20 pt-40">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={image}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="h-full w-full animate-kenburns object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(700px circle at 80% 10%, rgba(196,30,42,0.12), transparent 55%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Services" },
              { label: kicker },
            ]}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <span className="mt-8 flex items-center gap-4 text-[11px] font-bold tracking-[0.35em] text-crimson-500 uppercase">
            <span className="h-px w-12 bg-crimson-500/60" aria-hidden /> {kicker}
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[1.1] font-bold text-white md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-base">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={0.4}>{children}</Reveal>}
      </div>
    </section>
  );
}
