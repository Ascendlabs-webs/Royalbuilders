"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import Lightbox, { useLightbox } from "./Lightbox";
import { cn } from "@/lib/utils";

export default function GalleryGrid({
  items,
  filters = ["All"],
}: {
  items: { src: string; category: string; title: string; span?: "tall" | "wide" }[];
  filters?: string[];
}) {
  const [active, setActive] = useState("All");
  const { index, open, close, next, prev } = useLightbox();

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  return (
    <div>
      {filters.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery filters">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className={cn(
                "border px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300",
                active === f
                  ? "border-crimson-500 bg-crimson-500 text-navy-950 shadow-crimson-sm"
                  : "border-navy-900/20 text-graphite hover:border-crimson-500 hover:text-crimson-600"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(auto-fill,240px)]">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.button
              key={item.src + item.category}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              onClick={() => open(i)}
              className={cn(
                "group relative cursor-pointer overflow-hidden border border-navy-900/10 bg-navy-900 text-left",
                item.span === "tall" && "sm:row-span-2",
                item.span === "wide" && "sm:col-span-2"
              )}
              aria-label={`Open ${item.title} in lightbox`}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full min-h-[240px] w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="mb-2 w-fit border border-crimson-500/60 px-2.5 py-1 text-[9px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center border border-crimson-500 bg-navy-950/70 text-crimson-400 backdrop-blur">
                  <Maximize2 size={18} />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {index !== null && (
          <Lightbox
            images={filtered.map((i) => ({ src: i.src, title: i.title }))}
            index={index}
            onClose={close}
            onPrev={() => prev(filtered.length)}
            onNext={() => next(filtered.length)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
