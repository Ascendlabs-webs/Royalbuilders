import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/ui/LeadForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE, PHONE_HREF, WHATSAPP_HREF, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Royal Builders, Chennai - No.754/1007, BV Colony, 23rd Street, Vyasarpadi, Chennai 600039. Call +91 98409 51292 or email RoyalBuilders3924@gmail.com for a free consultation and site visit.",
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Royal Builders",
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />

      <PageHero
        kicker="Contact Us"
        title={
          <>
            Let&apos;s Build Something <span className="text-gradient-crimson">Extraordinary</span>
          </>
        }
        subtitle="We are ready to bring your architectural vision to life. Reach out to our team of experts to discuss your next construction, interior or land project."
        image="/images/construction-crane-1.jpg"
      />

      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 90% 10%, rgba(196,30,42,0.07), transparent 55%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              kicker="Send an Inquiry"
              title={
                <>
                  Request Your <span className="text-gradient-crimson">Free Consultation</span>
                </>
              }
              subtitle="Fill in the form and our team will call you back within 2 working hours."
            />
            <Reveal>
              <div className="border border-crimson-500/40 bg-cream p-8 shadow-card md:p-12">
                <LeadForm />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              kicker="Contact Information"
              title={
                <>
                  Visit or <span className="text-gradient-crimson">Reach Us</span>
                </>
              }
            />
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "Office Address",
                  lines: SITE.addressLines,
                  href: SITE.mapLink,
                  linkLabel: "Open in Google Maps",
                },
                { icon: Phone, title: "Phone", lines: [SITE.phoneDisplay], href: PHONE_HREF, linkLabel: "Call now" },
                {
                  icon: Mail,
                  title: "Email",
                  lines: [SITE.email],
                  href: `mailto:${SITE.email}`,
                  linkLabel: "Send an email",
                },
                { icon: Clock, title: "Working Hours", lines: [SITE.hours], linkLabel: undefined },
              ].map((card, i) => (
                <Reveal key={card.title} delay={0.07 * i}>
                  <div className="group flex gap-5 border border-navy-900/10 bg-cream p-6 transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center border border-crimson-500/50 p-3.5 text-crimson-600 transition-all duration-500 group-hover:bg-crimson-500 group-hover:text-navy-950 group-hover:shadow-crimson-sm">
                      <card.icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-[10px] font-bold tracking-[0.3em] text-slate-soft uppercase">
                        {card.title}
                      </h3>
                      {card.lines.map((l) => (
                        <p key={l} className="mt-1 text-[15px] font-semibold text-navy-900">
                          {l}
                        </p>
                      ))}
                      {card.href && card.linkLabel && (
                        <a
                          href={card.href}
                          target={card.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="link-underline mt-2 inline-block text-[11px] font-bold tracking-[0.2em] text-crimson-600 uppercase"
                        >
                          {card.linkLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href={PHONE_HREF}
                    className="flex flex-1 items-center justify-center gap-2 bg-navy-900 px-6 py-4 text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-crimson-500 hover:text-navy-950"
                  >
                    <Phone size={14} /> Call Now
                  </a>
                  <a
                    href={waLink("Hello Royal Builders, I found your website and would like to discuss a project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-6 py-4 text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:opacity-85"
                  >
                    <MessageCircle size={14} /> WhatsApp Us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="Location"
            title={
              <>
                Find Us on the <span className="text-gradient-crimson">Map</span>
              </>
            }
            subtitle={`${SITE.address} - easy access from Vyasarpadi Jeeva station.`}
          />
          <Reveal>
            <div className="crimson-hairline overflow-hidden bg-white p-2 shadow-card">
              <iframe
                src={SITE.mapEmbed}
                title="Royal Builders office - No.754/1007, BV Colony, 23rd Street, Vyasarpadi, Chennai 600039"
                className="h-[480px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
