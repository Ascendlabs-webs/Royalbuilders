import { cn } from "@/lib/utils";

const ITEMS = [
  "Construction",
  "Interiors",
  "Real Estate",
  "Maintenance",
  "Since 2010",
  "Free Site Visit",
  "Transparent Pricing",
  "On-time Delivery",
];

export default function Marquee({ dark = false, className }: { dark?: boolean; className?: string }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y py-5",
        dark ? "border-white/10 bg-navy-900" : "border-crimson-500/20 bg-navy-950",
        className
      )}
      aria-hidden
    >
      <div className="flex w-max animate-marquee items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className={cn(
                "font-display px-8 text-lg tracking-[0.2em] uppercase md:text-xl",
                dark ? "text-navy-900/20" : i % 2 === 0 ? "text-crimson-500" : "text-white/30"
              )}
            >
              {item}
            </span>
            <span className="text-crimson-500/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
