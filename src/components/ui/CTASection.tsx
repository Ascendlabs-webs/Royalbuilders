import { Phone, MessageCircle, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import Button from "./Button";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/site";

export default function CTASection({
  title = "Ready to Build Your Dream?",
  subtitle = "Book your free site visit today. Our experts will visit your site, understand your requirement and give you a transparent estimate - absolutely free.",
  variant = "dark",
}: {
  title?: string;
  subtitle?: string;
  variant?: "dark" | "gold";
}) {
  const gold = variant === "gold";
  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative mx-auto max-w-[1400px] px-6 pb-24 lg:px-8 ${
          gold ? "" : "pt-24"
        }`}
      >
        <Reveal direction="zoom">
          <div
            className={`relative overflow-hidden border p-10 md:p-16 lg:p-20 ${
              gold
                ? "border-crimson-500/50 bg-gradient-to-br from-crimson-500 via-crimson-400 to-crimson-600"
                : "border-crimson-500/25 bg-navy-950"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(500px circle at 85% 20%, ${
                  gold ? "rgba(255,255,255,0.35)" : "rgba(196,30,42,0.14)"
                }, transparent 60%), radial-gradient(600px circle at 10% 100%, ${
                  gold ? "rgba(255,255,255,0.25)" : "rgba(196,30,42,0.08)"
                }, transparent 55%)`,
              }}
              aria-hidden
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span
                  className={`text-[11px] font-bold tracking-[0.35em] uppercase ${
                    gold ? "text-navy-950/70" : "text-crimson-500"
                  }`}
                >
                  Free Site Visit · Free Consultation
                </span>
                <h2
                  className={`font-display mt-4 text-3xl leading-tight font-bold md:text-5xl ${
                    gold ? "text-navy-950" : "text-white"
                  }`}
                >
                  {title}
                </h2>
                <p
                  className={`mt-5 max-w-lg text-[15px] leading-relaxed ${
                    gold ? "text-navy-950/80" : "text-white/60"
                  }`}
                >
                  {subtitle}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 lg:items-end">
                <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href={PHONE_HREF}
                    className={`flex flex-1 items-center justify-center gap-3 border px-8 py-4 text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                      gold
                        ? "border-navy-950 bg-navy-950 text-crimson-400 hover:bg-transparent hover:text-navy-950"
                        : "border-crimson-500 bg-crimson-500 text-navy-950 hover:bg-transparent hover:text-crimson-400 hover:shadow-crimson"
                    }`}
                  >
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-1 items-center justify-center gap-3 border px-8 py-4 text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                      gold
                        ? "border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-crimson-400"
                        : "border-white/40 text-white hover:bg-white hover:text-navy-950"
                    }`}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
                <p
                  className={`flex items-center gap-2 text-xs tracking-wider ${
                    gold ? "text-navy-950/70" : "text-white/50"
                  }`}
                >
                  <MapPin size={13} /> Chennai - 600039 · Mon-Sun 9AM-8PM
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
