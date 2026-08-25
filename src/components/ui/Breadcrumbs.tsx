import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase">
      <Link href="/" className="flex items-center gap-1.5 text-white/50 transition-colors hover:text-crimson-400">
        <Home size={12} /> Home
      </Link>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          <ChevronRight size={11} className="text-crimson-500" />
          {item.href ? (
            <Link href={item.href} className="text-white/50 transition-colors hover:text-crimson-400">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-crimson-400">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
