import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline-gold" | "navy" | "white-outline";

const styles: Record<Variant, string> = {
  gold: "bg-crimson-500 text-navy-950 hover:bg-crimson-400 hover:shadow-crimson",
  "outline-gold": "border border-crimson-500/60 text-crimson-500 hover:bg-crimson-500 hover:text-navy-950",
  navy: "bg-navy-900 text-white hover:bg-crimson-500 hover:text-navy-950",
  "white-outline": "border border-white/60 text-white hover:bg-white hover:text-navy-950",
};

export default function Button({
  href,
  children,
  variant = "gold",
  className,
  external = false,
  onClick,
  type,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 font-body text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-500",
    styles[variant],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
