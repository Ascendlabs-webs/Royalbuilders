import Link from "next/link";
import { Home, Phone, ArrowLeft } from "lucide-react";
import { PHONE_HREF } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at 50% 40%, rgba(196,30,42,0.1), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative text-center">
        <p className="font-display text-[9rem] leading-none font-bold text-gradient-crimson md:text-[12rem]">404</p>
        <h1 className="font-display mt-6 text-3xl font-bold text-white md:text-4xl">
          This Page Is Still Under Construction
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55">
          The page you are looking for doesn&apos;t exist. Let us guide you back to the blueprint - or call
          us directly.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-crimson-500 px-8 py-4 text-[12px] font-bold tracking-[0.2em] text-navy-950 uppercase transition-all duration-300 hover:bg-crimson-400 hover:shadow-crimson"
          >
            <Home size={15} /> Back to Home
          </Link>
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 border border-white/40 px-8 py-4 text-[12px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-crimson-500 hover:text-crimson-400"
          >
            <Phone size={15} /> Call Us
          </a>
        </div>
        <Link href="/" className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-white/40 uppercase hover:text-crimson-400">
          <ArrowLeft size={13} /> Or explore our services
        </Link>
      </div>
    </section>
  );
}
