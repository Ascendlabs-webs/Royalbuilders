"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import CTASection from "@/components/ui/CTASection";
import { MapPin, Calendar, User, Wrench, ExternalLink } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS, type Project } from "@/data/site-data";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);

  const filtered = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      <PageHero
        kicker="Our Projects"
        title={
          <>
            Premium <span className="text-gradient-crimson">Project Gallery</span>
          </>
        }
        subtitle="Explore our portfolio of architectural masterpieces, luxury interiors and monumental commercial developments across Chennai."
        image="/images/project-1.png"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project filters">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={cn(
                  "border px-6 py-3 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300",
                  active === f
                    ? "border-crimson-500 bg-crimson-500 text-navy-950 shadow-crimson-sm"
                    : "border-navy-900/20 text-graphite hover:border-crimson-500 hover:text-crimson-600"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  onClick={() => setSelected(p)}
                  className={cn(
                    "group relative h-[380px] cursor-pointer overflow-hidden border text-left",
                    selected.title === p.title
                      ? "border-crimson-500 shadow-crimson"
                      : "border-navy-900/10"
                  )}
                  aria-label={`View project details: ${p.title}`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="border border-crimson-500/60 bg-navy-950/70 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-crimson-400 uppercase backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 p-7">
                    <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-crimson-400">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-white/60">
                      <MapPin size={12} className="text-crimson-500" /> {p.location}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 border-b border-crimson-500 pb-1 text-[10px] font-bold tracking-[0.25em] text-crimson-400 uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
                      View Details <ExternalLink size={12} />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(700px circle at 15% 20%, rgba(196,30,42,0.08), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            dark
            kicker="Project Spotlight"
            title={
              <>
                {selected.title} <span className="text-gradient-crimson">- The Details</span>
              </>
            }
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="grid gap-10 lg:grid-cols-2"
            >
              <div>
                <p className="max-w-2xl text-[15px] leading-relaxed text-white/70">{selected.description}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: User, label: "Client", value: selected.client },
                    { icon: MapPin, label: "Location", value: selected.location },
                    { icon: Calendar, label: "Completion", value: selected.date },
                    { icon: Wrench, label: "Services", value: selected.services.join(", ") },
                  ].map(({ icon: Ico, label, value }) => (
                    <div key={label} className="border border-white/10 bg-navy-900/60 p-5">
                      <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                        <Ico size={12} /> {label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              {selected.before && selected.after ? (
                <div className="border border-crimson-500/30 p-2">
                  <BeforeAfter before={selected.before} after={selected.after} alt={selected.title} />
                </div>
              ) : (
                <div className="group relative overflow-hidden border border-crimson-500/30">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection title="Your Project Could Be Next" />
    </>
  );
}
