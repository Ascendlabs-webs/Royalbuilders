import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-10 bg-crimson-500/60" aria-hidden />
        <span className="text-[11px] font-bold tracking-[0.35em] text-crimson-600 uppercase">
          {kicker}
        </span>
        <span className="h-px w-10 bg-crimson-500/60" aria-hidden />
      </div>
      <h2
        className={cn(
          "font-display mt-4 text-3xl leading-tight font-bold md:text-[2.75rem] md:leading-[1.15]",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-[15px] leading-relaxed",
            dark ? "text-white/60" : "text-graphite"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
