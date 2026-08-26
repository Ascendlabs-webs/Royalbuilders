import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import { SITE, PHONE_HREF } from "@/lib/site";
import { SERVICES } from "@/data/site-data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 15% 0%, rgba(196,30,42,0.08), transparent 60%), radial-gradient(700px circle at 90% 100%, rgba(196,30,42,0.06), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo-mark-white.png" alt="Royal Builders Logo" className="h-14 w-14" />
              <span className="leading-tight">
                <span className="font-display block text-xl font-bold">
                  Royal <span className="text-crimson-500">Builders</span>
                </span>
                <span className="block text-[10px] tracking-[0.35em] text-white/40 uppercase">
                  Building Dreams Since 2010
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Chennai&apos;s trusted partner for Construction, Interior Design, Real Estate and Building
              Maintenance. Transparent pricing, premium quality and on-time delivery - since 2010.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: SITE.socials.facebook, icon: FacebookIcon, label: "Facebook" },
                { href: SITE.socials.instagram, icon: InstagramIcon, label: "Instagram" },
                { href: SITE.socials.youtube, icon: YoutubeIcon, label: "YouTube" },
                { href: SITE.socials.whatsapp, icon: WhatsappIcon, label: "WhatsApp" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:border-crimson-500 hover:bg-crimson-500 hover:text-navy-950"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
                { label: "Free Site Visit", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-crimson-400"
                  >
                    <ArrowUpRight size={12} className="text-crimson-600 opacity-0 transition-all group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase">Our Services</h3>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="group inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-crimson-400"
                  >
                    <ArrowUpRight size={12} className="text-crimson-600 opacity-0 transition-all group-hover:opacity-100" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-crimson-500" />
                <address className="not-italic leading-relaxed">
                  {SITE.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-3 text-white/60 transition-colors hover:text-crimson-400">
                  <Phone size={15} className="shrink-0 text-crimson-500" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-white/60 transition-colors hover:text-crimson-400"
                >
                  <Mail size={15} className="shrink-0 text-crimson-500" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Clock size={15} className="shrink-0 text-crimson-500" />
                {SITE.hours}
              </li>
            </ul>
            <a
              href={SITE.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-crimson-500/50 px-4 py-2.5 text-[11px] font-bold tracking-[0.2em] text-crimson-400 uppercase transition-all duration-300 hover:bg-crimson-500 hover:text-navy-950"
            >
              <MapPin size={13} /> Google Maps
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Royal Builders. All rights reserved.</p>
          <p className="tracking-[0.25em] uppercase">Construction · Interiors · Real Estate · Maintenance</p>
        </div>
      </div>
    </footer>
  );
}
