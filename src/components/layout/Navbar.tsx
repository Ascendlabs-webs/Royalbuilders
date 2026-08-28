"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Menu, X, ChevronDown, ArrowRight, Clock } from "lucide-react";
import { NAV_LINKS } from "@/data/site-data";
import { SITE, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 500);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        megaOpen &&
        !target.closest("[aria-haspopup='true']") &&
        !target.closest("[data-mega-menu]")
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [megaOpen]);

  const servicesMega = NAV_LINKS.find((l) => l.mega);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80]">
        <div
          className={cn(
            "hidden lg:block border-b border-white/10 bg-navy-950/90 text-[11px] tracking-wider transition-all duration-500",
            scrolled ? "h-0 overflow-hidden border-transparent opacity-0" : "h-10 opacity-100"
          )}
        >
          <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8">
            <div className="flex items-center gap-8 text-white/60">
              <a href={PHONE_HREF} className="flex items-center gap-2 transition-colors hover:text-crimson-400">
                <Phone size={12} className="text-crimson-500" /> {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 transition-colors hover:text-crimson-400">
                <Mail size={12} className="text-crimson-500" /> {SITE.email}
              </a>
            </div>
            <div className="flex items-center gap-8 text-white/60">
              <span className="flex items-center gap-2">
                <Clock size={12} className="text-crimson-500" /> {SITE.hours}
              </span>
              <span className="tracking-[0.3em] text-crimson-500 uppercase">Chennai</span>
            </div>
          </div>
        </div>

        <nav
          className={cn(
            "transition-all duration-500",
            scrolled ? "glass-dark border-b border-crimson-500/20 shadow-lg shadow-black/20" : "bg-transparent"
          )}
          aria-label="Main navigation"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 lg:px-8">
            <Link href="/" className="group flex items-center gap-3 py-4">
              <img
                src="/logo-mark-white.png"
                alt="Royal Builders Logo"
                className="h-11 w-11 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="leading-tight">
                <span className="font-display block text-lg font-bold tracking-wide text-white">
                  Royal <span className="text-crimson-500">Builders</span>
                </span>
                <span className="block text-[9px] tracking-[0.35em] text-white/50 uppercase">
                  Building Dreams Since 2010
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) =>
                link.mega ? (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-6 font-body text-[13px] font-semibold tracking-[0.15em] uppercase transition-colors",
                        megaOpen ? "text-crimson-400" : "text-white/85 hover:text-crimson-400"
                      )}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      onClick={(e) => {
                        e.preventDefault();
                        setMegaOpen((v) => !v);
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform duration-300", megaOpen && "rotate-180")}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-4 py-6 font-body text-[13px] font-semibold tracking-[0.15em] uppercase transition-colors",
                        pathname === link.href ? "text-crimson-400" : "text-white/85 hover:text-crimson-400"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 border border-crimson-500/50 px-4 py-2.5 text-xs font-semibold tracking-[0.15em] text-crimson-400 uppercase transition-all duration-300 hover:bg-crimson-500 hover:text-navy-950"
              >
                <Phone size={14} /> Call Now
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-crimson-500 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-navy-950 uppercase transition-all duration-300 hover:bg-crimson-400 hover:shadow-crimson"
              >
                Free Consultation <ArrowRight size={14} />
              </Link>
            </div>

            <button
              className="rounded p-2 text-white lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <AnimatePresence>
            {megaOpen && servicesMega?.mega && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-x-0 top-full border-b border-crimson-500/20 glass-dark"
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
                data-mega-menu
              >
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-2 px-4 py-6 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-4 lg:gap-6 lg:px-8 lg:py-10">
                  {servicesMega.mega.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                    >
                      <Link
                        href={s.href}
                        className="group block overflow-hidden border border-white/10 transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson"
                      >
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={s.image}
                            alt={s.label}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                        </div>
                        <div className="bg-navy-900/90 px-4 py-3">
                          <span className="font-display text-sm font-bold text-white group-hover:text-crimson-400 transition-colors">
                            {s.label}
                          </span>
                          <p className="mt-1 text-[11px] leading-snug text-white/60">
                            {s.description}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-crimson-400 uppercase">
                            Explore <ArrowRight size={11} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[85] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-navy-950 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
                <img src="/logo.png" alt="" className="h-10 w-10" />
                <span className="font-display text-lg font-bold text-white">
                  Royal <span className="text-crimson-500">Builders</span>
                </span>
              </div>
              <nav className="flex flex-col px-4 py-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) =>
                  link.mega ? (
                    <div key={link.label} className="mb-1">
                      <p className="px-4 py-3 text-[12px] font-semibold tracking-[0.2em] text-crimson-500 uppercase">
                        Services
                      </p>
                      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                        {link.mega.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            onClick={() => setMobileOpen(false)}
                            className="group relative h-24 overflow-hidden border border-white/10"
                          >
                            <img src={s.image} alt={s.label} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                            <span className="absolute bottom-2 left-2 font-display text-xs text-white">
                              {s.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "mb-1 border-l-2 px-4 py-3.5 font-body text-sm font-semibold tracking-[0.15em] uppercase transition-colors",
                        pathname === link.href
                          ? "border-crimson-500 text-crimson-400"
                          : "border-transparent text-white/80 hover:border-crimson-500/60 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-auto space-y-3 border-t border-white/10 px-6 py-6">
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 border border-crimson-500/60 py-3 text-xs font-bold tracking-[0.15em] text-crimson-400 uppercase"
                >
                  <Phone size={14} /> Call Now
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-crimson-500 py-3 text-xs font-bold tracking-[0.15em] text-navy-950 uppercase"
                >
                  Get Free Consultation
                </Link>
                <p className="pt-2 text-center text-[11px] text-white/40">{SITE.phoneDisplay}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

