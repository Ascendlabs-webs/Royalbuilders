"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Phone, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    kicker: "Construction",
    title: "We Build Your Dream Home",
    sub: "Royal Builders is your trusted partner for Construction, Interior Design, Real Estate, and Building Maintenance across Chennai.",
    image: "/images/hero-construction.jpg",
    href: "/construction",
  },
  {
    kicker: "Interiors",
    title: "Premium Interior Solutions",
    sub: "Modular kitchens, luxury wardrobes, false ceilings and profile lighting - crafted to perfection.",
    image: "/images/hero-interiors.jpg",
    href: "/interiors",
  },
  {
    kicker: "Real Estate",
    title: "Find Your Dream Land",
    sub: "Legally verified residential and commercial land in Chennai's fastest-growing corridors.",
    image: "/images/hero-land.jpg",
    href: "/real-estate",
  },
  {
    kicker: "Maintenance",
    title: "Professional Building Maintenance",
    sub: "Repairs, tank cleaning, plumbing, electrical and AMC services that keep your property pristine.",
    image: "/images/hero-maintenance.jpg",
    href: "/maintenance",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const slides = slidesRef.current?.querySelectorAll<HTMLElement>("[data-slide]");
    if (!slides?.length) return;
    slides.forEach((s, i) => {
      s.style.zIndex = i === index ? "10" : "0";
      s.style.opacity = i === index ? "1" : "0";
      s.style.transition = reduceMotion ? "none" : "opacity 1.4s cubic-bezier(0.65,0,0.35,1)";
    });
  }, [index, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 7000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, reduceMotion]);

  const slide = SLIDES[index];

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-navy-950">
      <div ref={slidesRef} className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.image}
            data-slide
            className="absolute inset-0"
            style={{ opacity: i === 0 && !reduceMotion ? 1 : 0, zIndex: i === index ? 10 : 0 }}
            aria-hidden={i !== index}
          >
            <img
              src={s.image}
              alt={s.kicker}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              className="hero-img absolute inset-0 h-[120%] w-full scale-110 object-cover opacity-70"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px circle at 75% 25%, rgba(196,30,42,0.13), transparent 55%), radial-gradient(600px circle at 15% 90%, rgba(196,30,42,0.07), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 pb-24 sm:px-6 lg:px-8 lg:pb-28">
        <div key={`content-${index}`} className="max-w-3xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-px w-10 sm:w-14 bg-crimson-500" aria-hidden />
            <span
              className={cn(
                "text-[11px] font-bold tracking-[0.4em] text-crimson-400 uppercase",
                reduceMotion ? "" : "animate-fade-in"
              )}
              style={{ animation: reduceMotion ? undefined : "fadeUp 0.8s ease both" }}
            >
              {slide.kicker}
            </span>
          </div>
          <h1
            className="font-display mt-4 sm:mt-5 text-4xl leading-[1.05] font-bold text-white sm:text-6xl lg:text-7xl"
            style={{ animation: reduceMotion ? undefined : "fadeUp 0.9s 0.15s ease both" }}
          >
            {slide.title.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="text-gradient-crimson">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>
          <p
            className="mt-5 sm:mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-[15px] md:text-lg"
            style={{ animation: reduceMotion ? undefined : "fadeUp 0.9s 0.3s ease both" }}
          >
            {slide.sub}
          </p>
          <div
            className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ animation: reduceMotion ? undefined : "fadeUp 0.9s 0.45s ease both" }}
          >
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-3 bg-crimson-500 px-9 py-4 text-[12px] font-bold tracking-[0.22em] text-navy-950 uppercase transition-all duration-500 hover:bg-crimson-400 hover:shadow-crimson-lg"
            >
              Get Free Consultation
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-3 border border-white/50 px-9 py-4 text-[12px] font-bold tracking-[0.22em] text-white uppercase backdrop-blur transition-all duration-500 hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
            >
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="absolute bottom-24 right-6 z-30 hidden flex-col gap-3 md:right-10 lg:flex" aria-hidden>
        <button
          onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
          className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-all hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
          className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-all hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-6 left-4 z-30 flex items-center gap-4 sm:bottom-10 sm:left-6 md:left-10 sm:gap-6">
        <span className="font-display text-5xl font-bold text-white/90">
          <span className="text-crimson-500">0{index + 1}</span>
          <span className="mx-2 text-2xl text-white/30">/</span>
          <span className="text-2xl text-white/40">0{SLIDES.length}</span>
        </span>
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.kicker}
              onClick={() => setIndex(i)}
              className={cn("h-[3px] transition-all duration-500", i === index ? "w-14 bg-crimson-500" : "w-7 bg-white/25 hover:bg-white/50")}
              aria-label={`Go to slide ${i + 1}: ${s.kicker}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-4 z-30 hidden text-[10px] tracking-[0.4em] text-white/40 uppercase sm:right-6 sm:bottom-10 md:right-10 md:block" aria-hidden>
        Scroll to explore
        <ChevronDown size={14} className="mx-auto mt-1 animate-bounce text-crimson-500" />
      </div>
    </section>
  );
}
