"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import { MapPin, Calendar, User, Wrench, X, ExternalLink } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS, type Project } from "@/data/site-data";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

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
        image="/images/project-1.jpg"
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
              {filtered.map((p) => (
                <motion.button
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  onClick={() => setSelected(p)}
                  className="group relative h-[380px] cursor-pointer overflow-hidden border border-navy-900/10 text-left transition-colors hover:border-crimson-500"
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
                    <span className="mt-4 inline-flex items-center gap-2 border-b border-crimson-500 pb-1 text-[10px] font-bold tracking-[0.25em] text-crimson-400 uppercase transition-all duration-500 group-hover:opacity-100 sm:opacity-0">
                      View Details <ExternalLink size={12} />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${selected.title}`}
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-crimson-500/40 bg-navy-950 shadow-crimson-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image header */}
              <div className="relative h-[260px] overflow-hidden sm:h-[300px]">
                <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-navy-950/70 text-white backdrop-blur transition-colors hover:border-crimson-500 hover:text-crimson-400"
                  aria-label="Close project details"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <span className="border border-crimson-500/60 bg-navy-950/70 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-crimson-400 uppercase backdrop-blur">
                    {selected.category}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{selected.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                    <MapPin size={14} className="text-crimson-500" /> {selected.location}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                <p className="text-[15px] leading-relaxed text-white/70">{selected.description}</p>

                {selected.specs && (
                  <div className="mt-6 border border-crimson-500/40 bg-navy-900/60">
                    <div className="border-b border-white/10 bg-crimson-500/10 px-6 py-3">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-crimson-400 uppercase">Specifications</p>
                    </div>
                    <dl className="divide-y divide-white/10">
                      <div className="flex items-center justify-between gap-4 px-6 py-3">
                        <dt className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">Area</dt>
                        <dd className="font-display text-xl font-bold text-white">{selected.specs.area}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4 px-6 py-3">
                        <dt className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">Floors</dt>
                        <dd className="font-display text-xl font-bold text-white">{selected.specs.floors}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-6 px-6 py-3">
                        <dt className="shrink-0 text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">Configuration</dt>
                        <dd className="text-right text-sm font-semibold text-white">{selected.specs.config}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4 px-6 py-3">
                        <dt className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">Duration &amp; Rate</dt>
                        <dd className="text-right text-sm font-semibold text-crimson-400">{selected.specs.duration}</dd>
                      </div>
                      <div className="px-6 py-3">
                        <dt className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">Amenities</dt>
                        <dd className="mt-1 text-sm font-semibold text-white">{selected.specs.amenities}</dd>
                      </div>
                    </dl>
                  </div>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: User, label: "Client", value: selected.client },
                    { icon: MapPin, label: "Location", value: selected.location },
                    { icon: Calendar, label: "Year", value: selected.date },
                    { icon: Wrench, label: "Services", value: selected.services.join(", ") },
                  ].map(({ icon: Ico, label, value }) => (
                    <div key={label} className="border border-white/10 bg-navy-900/60 p-4">
                      <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-crimson-400 uppercase">
                        <Ico size={12} /> {label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center border border-crimson-500 bg-crimson-500 px-8 py-4 text-[11px] font-bold tracking-[0.25em] text-white uppercase transition-colors hover:bg-crimson-600"
                  >
                    Enquire About This Project
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="inline-flex flex-1 items-center justify-center border border-white/20 px-8 py-4 text-[11px] font-bold tracking-[0.25em] text-white/80 uppercase transition-colors hover:border-crimson-500 hover:text-crimson-400"
                  >
                    Back to Projects
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection title="Your Project Could Be Next" />
    </>
  );
}
