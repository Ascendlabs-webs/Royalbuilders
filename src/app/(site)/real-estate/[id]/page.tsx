import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Tag, Phone, MessageCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/ui/LeadForm";
import { getPropertyById, getAllPropertiesForCrm } from "@/lib/sanity.queries";
import { SITE, PHONE_HREF, waLink } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const props = await getAllPropertiesForCrm().catch(() => []);
  return props.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getPropertyById(id).catch(() => null);
  if (!p) return { title: "Property Not Found" };
  const desc = `${p.title} in ${p.location} — ₹${p.price.toLocaleString("en-IN")}. Verified listing by Royal Builders, Chennai.`;
  return {
    title: `${p.title} | Properties`,
    description: desc,
    alternates: { canonical: `${SITE.url}/real-estate/${p.propertyId}` },
    openGraph: {
      title: p.title,
      description: desc,
      type: "website",
      ...(p.photo ? { images: [{ url: p.photo }] } : {}),
    },
  };
}

function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakhs`;
  return `₹${price.toLocaleString("en-IN")}`;
}

const LEGAL_LABELS: Record<string, string> = {
  patta: "Patta",
  ec: "Encumbrance Certificate",
  approval: "Approval Clear",
  water: "Water Connection",
  electricity: "Electricity Connection",
  drainage: "Drainage",
};

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPropertyById(id).catch(() => null);
  if (!p) notFound();

  const gallery = [p.photo, ...(p.gallery ?? [])].filter(Boolean);
  const specs: { label: string; value: string }[] = [
    ...(p.totalArea ? [{ label: "Total Area", value: `${Number(p.totalArea).toLocaleString("en-IN")} Sq.Ft` }] : []),
    ...(p.bedrooms != null ? [{ label: "Bedrooms", value: String(p.bedrooms) }] : []),
    ...(p.bathrooms != null ? [{ label: "Bathrooms", value: String(p.bathrooms) }] : []),
    ...(p.facing ? [{ label: "Facing", value: p.facing }] : []),
    ...(p.pricePerSqft ? [{ label: "Price / Sq.Ft", value: `₹${Number(p.pricePerSqft).toLocaleString("en-IN")}` }] : []),
    { label: "Property ID", value: p.propertyId },
    ...(p.createdDate ? [{ label: "Listed On", value: p.createdDate.slice(0, 10) }] : []),
  ];
  const legalOn = Object.entries(p.legal ?? {}).filter(([, v]) => !!v);
  const enquireMsg = `Hi Royal Builders! I'm interested in "${p.title}" (${p.propertyId}) listed at ${formatPrice(p.price)}. Is it still available?`;

  return (
    <>
      <PageHero
        kicker={p.type}
        title={p.title}
        subtitle={`${p.location} · ${formatPrice(p.price)}`}
        image={p.photo || "/images/hero-land.jpg"}
      >
        <span
          className={`mt-6 inline-block px-4 py-2 text-[11px] font-bold tracking-[0.25em] uppercase ${
            p.status === "available" ? "bg-crimson-500 text-white" : "bg-white/15 text-white"
          }`}
        >
          {p.status}
        </span>
      </PageHero>

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <Reveal>
            <Link
              href="/real-estate"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-crimson-600 uppercase hover:text-crimson-500"
            >
              <ArrowLeft size={14} /> All Properties
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            {/* Main column */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="overflow-hidden border border-navy-900/10 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={p.title} className="h-80 w-full object-cover md:h-[480px]" />
                </div>
              </Reveal>

              {gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {gallery.slice(1, 7).map((src, i) => (
                    <Reveal key={i} delay={0.05 * i}>
                      <div className="overflow-hidden border border-navy-900/10 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`${p.title} photo ${i + 2}`} loading="lazy" className="h-32 w-full object-cover md:h-40" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}

              <Reveal delay={0.05}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-crimson-500 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                    <Tag size={12} /> {p.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-graphite">
                    <MapPin size={14} className="text-crimson-500" /> {p.location}
                  </span>
                </div>
                {p.fullAddress && <p className="mt-3 text-sm leading-relaxed text-graphite">{p.fullAddress}</p>}
              </Reveal>

              {specs.length > 0 && (
                <div className="mt-10">
                  <SectionHeading align="left" kicker="Details" title={<>Property <span className="text-gradient-crimson">Specifications</span></>} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {specs.map((s, i) => (
                      <Reveal key={s.label} delay={0.04 * i}>
                        <div className="flex items-center justify-between border border-navy-900/10 bg-white px-5 py-4">
                          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-soft uppercase">{s.label}</span>
                          <span className="font-display font-bold text-navy-900">{s.value}</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {p.sellingPoints && p.sellingPoints.length > 0 && (
                <div className="mt-10">
                  <SectionHeading align="left" kicker="Highlights" title={<>Why This <span className="text-gradient-crimson">Property</span></>} />
                  <ul className="space-y-3">
                    {p.sellingPoints.map((s, i) => (
                      <Reveal key={i} delay={0.04 * i}>
                        <li className="flex items-start gap-3 border border-navy-900/10 bg-white px-5 py-4 text-sm text-graphite">
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-crimson-500" /> {s}
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              )}

              {legalOn.length > 0 && (
                <div className="mt-10">
                  <SectionHeading align="left" kicker="Verified" title={<>Legal & <span className="text-gradient-crimson">Utilities</span></>} />
                  <div className="flex flex-wrap gap-3">
                    {legalOn.map(([k]) => (
                      <span key={k} className="inline-flex items-center gap-2 border border-teal-700/30 bg-teal-50 px-4 py-2 text-xs font-semibold tracking-wider text-teal-800 uppercase">
                        <CheckCircle2 size={14} /> {LEGAL_LABELS[k] ?? k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry sidebar */}
            <div>
              <Reveal delay={0.1} className="lg:sticky lg:top-28">
                <div className="border border-crimson-500/40 bg-navy-950 p-8">
                  <p className="text-[11px] font-bold tracking-[0.3em] text-crimson-400 uppercase">Asking Price</p>
                  <p className="font-display mt-2 text-4xl font-bold text-white">{formatPrice(p.price)}</p>
                  <p className="mt-1 text-xs text-white/50">ID: {p.propertyId}</p>
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={PHONE_HREF}
                      className="flex items-center justify-center gap-2 bg-crimson-500 px-6 py-3.5 text-[12px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-crimson-400"
                    >
                      <Phone size={15} /> Call Now
                    </a>
                    <a
                      href={waLink(enquireMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-white/30 px-6 py-3.5 text-[12px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:border-crimson-500 hover:text-crimson-400"
                    >
                      <MessageCircle size={15} /> WhatsApp Enquiry
                    </a>
                    {p.mapLink && (
                      <a
                        href={p.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase hover:text-white"
                      >
                        <MapPin size={14} /> View on Map
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-6 border border-navy-900/10 bg-white p-8">
                  <LeadForm compact defaultService="Real Estate" heading="Request a Site Visit" subheading="We confirm availability on call within 2 working hours." />
                </div>
              </Reveal>
            </div>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "RealEstateListing",
                name: p.title,
                description: `${p.title} in ${p.location}`,
                url: `${SITE.url}/real-estate/${p.propertyId}`,
                address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: "Tamil Nadu", addressCountry: "IN" },
                offers: { "@type": "Offer", price: p.price, priceCurrency: "INR", availability: p.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut" },
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
