"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Skip preloader on mobile devices (faster perceived load) and slow connections
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const slowConnection =
        (navigator as any).connection?.effectiveType === "2g" ||
        (navigator as any).connection?.effectiveType === "3g";
      const duration = isMobile ? 800 : 2200;
      const t = setTimeout(() => setDone(true), duration);
      const t2 = setTimeout(() => setHidden(true), duration + 1200);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          aria-hidden
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-8 rounded-full"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "radial-gradient(circle, rgba(196,30,42,0.25), transparent 70%)" }}
            />
            <motion.img
              src="/logo.png"
              alt=""
              className="relative h-24 w-24 object-contain"
              animate={{ scale: [0.9, 1.05, 0.9], rotate: [0, 360] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            className="font-display mt-10 text-2xl tracking-[0.3em] text-crimson-500 uppercase"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Royal Builders
          </motion.p>
          <motion.div className="mt-6 h-px w-40 overflow-hidden bg-navy-800">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-crimson-600 via-crimson-400 to-crimson-600"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.p
            className="mt-4 font-body text-[11px] tracking-[0.35em] text-white/40 uppercase"
            animate={{ opacity: done ? 0 : [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Building Dreams Since 2010
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
