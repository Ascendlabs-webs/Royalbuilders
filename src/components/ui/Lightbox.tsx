"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; title?: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-navy-950/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current?.title ?? "Image viewer"}
    >
      <button
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-crimson-500 hover:text-crimson-400"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={22} />
      </button>

      <button
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-crimson-500 hover:text-crimson-400 md:left-8"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-crimson-500 hover:text-crimson-400 md:right-8"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>

      <div className="max-h-full w-full max-w-6xl px-16 md:px-24" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative"
          >
            <div className="crimson-hairline bg-navy-900/40 p-1">
              <LazyImage src={current.src} alt={current.title ?? ""} />
            </div>
            {current.title && (
              <figcaption className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg text-white">{current.title}</span>
                <span className="text-xs tracking-[0.3em] text-crimson-500">
                  {index + 1} / {images.length}
                </span>
              </figcaption>
            )}
          </motion.figure>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="mx-auto max-h-[78vh] w-auto object-contain"
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-950">
          <div className="h-10 w-10 animate-spin rounded-full border border-crimson-500/30 border-t-crimson-500" />
        </div>
      )}
    </>
  );
}

export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    (length: number) => setIndex((i) => (i === null ? null : (i + 1) % length)),
    []
  );
  const prev = useCallback(
    (length: number) => setIndex((i) => (i === null ? null : (i - 1 + length) % length)),
    []
  );
  return { index, open, close, next, prev };
}
