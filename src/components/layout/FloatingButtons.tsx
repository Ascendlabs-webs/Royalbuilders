"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, MessageCircle, Building2 } from "lucide-react";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/site";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-[75] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center border border-crimson-500/50 bg-navy-950/90 text-crimson-400 shadow-lg backdrop-blur transition-colors hover:bg-crimson-500 hover:text-navy-950"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <Link
        href="/real-estate"
        className="group flex h-12 w-12 items-center justify-center border border-crimson-500/60 bg-crimson-500 text-white shadow-lg transition-all duration-300 hover:bg-crimson-400 hover:text-navy-950"
        aria-label="Browse properties"
        title="Browse Properties"
      >
        <Building2 size={20} className="transition-transform duration-300 group-hover:scale-110" />
      </Link>

      <a
        href={PHONE_HREF}
        className="group flex h-12 w-12 items-center justify-center border border-crimson-500/60 bg-navy-900 text-crimson-400 shadow-lg transition-all duration-300 hover:bg-crimson-500 hover:text-navy-950"
        aria-label="Call Royal Builders"
      >
        <Phone size={20} className="animate-pulse-crimson transition-transform duration-300 group-hover:rotate-12" />
      </a>

      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle size={26} />
      </motion.a>
    </div>
  );
}
