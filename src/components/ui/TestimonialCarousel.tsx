"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

type T = { name: string; initials: string; rating: number; service: string; date: string; text: string };

export default function TestimonialCarousel({ items }: { items: T[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, items.length]);

  const item = items[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-4xl">
        <Quote className="absolute -top-8 left-0 text-crimson-500/30 md:-left-10" size={72} aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="border border-navy-900/10 bg-white p-8 shadow-card md:p-12"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < item.rating ? "fill-crimson-500 text-crimson-500" : "text-mist"}
                  />
                ))}
              </div>
              <span className="text-[11px] tracking-[0.2em] text-slate-soft uppercase">{item.date}</span>
            </div>
            <blockquote className="mt-6 font-display text-lg leading-relaxed text-navy-900 italic md:text-2xl">
              &ldquo;{item.text}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4 border-t border-navy-900/10 pt-6">
              <span className="flex h-12 w-12 items-center justify-center bg-navy-900 font-display text-sm font-bold text-crimson-400">
                {item.initials}
              </span>
              <div>
                <p className="font-semibold text-navy-900">{item.name}</p>
                <p className="text-xs text-slate-soft">{item.service} · Google Review</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center border border-navy-900/20 text-navy-900 transition-all hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 transition-all duration-500 ${
                i === index ? "w-10 bg-crimson-500" : "w-4 bg-navy-900/20 hover:bg-navy-900/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center border border-navy-900/20 text-navy-900 transition-all hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
