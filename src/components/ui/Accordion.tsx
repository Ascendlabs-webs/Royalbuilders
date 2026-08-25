"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Accordion({
  items,
  dark = false,
}: {
  items: { q: string; a: string }[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-current">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={cn("py-2", isOpen && "")}>
            <button
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-display text-lg font-semibold transition-colors md:text-xl",
                  isOpen ? "text-crimson-500" : dark ? "text-white" : "text-navy-900",
                  "hover:text-crimson-500"
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500",
                  isOpen
                    ? "rotate-45 border-crimson-500 bg-crimson-500 text-navy-950"
                    : dark
                      ? "border-white/25 text-white"
                      : "border-navy-900/25 text-navy-900"
                )}
              >
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "pb-6 text-sm leading-relaxed md:text-[15px]",
                      dark ? "text-white/65" : "text-graphite"
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
