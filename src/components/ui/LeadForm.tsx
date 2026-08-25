"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = ["Construction", "Interiors", "Real Estate", "Building Maintenance", "Other"];

const inputCls =
  "w-full border-b border-navy-900/20 bg-transparent px-1 py-3.5 font-body text-sm text-navy-900 placeholder:text-slate-soft focus:border-crimson-500 focus:outline-none transition-colors";

export default function LeadForm({
  defaultService,
  compact = false,
  dark = false,
  heading = "Request a Free Call Back",
  subheading = "Fill in your details - our team will call you within 2 working hours.",
}: {
  defaultService?: string;
  compact?: boolean;
  dark?: boolean;
  heading?: string;
  subheading?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService ?? "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Inquiry - Royal Group Website*%0A%0A` +
      `*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Email:* ${form.email || "-"}%0A*Service:* ${form.service || "-"}%0A*Message:* ${form.message || "-"}`;
    window.open(waLink(decodeURIComponent(text)).replace("%0A", "\n"), "_blank");
    setSubmitted(true);
  };

  const labelCls = dark
    ? "text-[10px] font-bold tracking-[0.25em] uppercase text-crimson-400"
    : "text-[10px] font-bold tracking-[0.25em] uppercase text-graphite";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex flex-col items-center justify-center border border-crimson-500/40 p-10 text-center",
          dark ? "bg-navy-900/60" : "bg-white"
        )}
      >
        <CheckCircle2 size={52} className="text-crimson-500" />
        <h3 className="font-display mt-5 text-2xl font-bold text-crimson-500">Thank You!</h3>
        <p className={cn("mt-3 max-w-sm text-sm", dark ? "text-white/70" : "text-graphite")}>
          Your inquiry has been shared with our team on WhatsApp. We&apos;ll call you back within 2 working
          hours. For urgent requirements, call us directly at +91 98409 51292.
        </p>
        <a
          href={waLink("Hello Royal Group, I just submitted an inquiry on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-2 border border-crimson-500/60 px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-crimson-500 uppercase transition-colors hover:bg-crimson-500 hover:text-navy-950"
        >
          <MessageCircle size={14} /> Open WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", dark ? "text-white" : "")}>
      <div>
        <h3 className="font-display text-2xl font-bold md:text-3xl">{heading}</h3>
        <p className={cn("mt-2 text-sm", dark ? "text-white/60" : "text-graphite")}>{subheading}</p>
      </div>

      <div className={cn("grid gap-6", !compact && "md:grid-cols-2")}>
        <div>
          <label htmlFor="lead-name" className={labelCls}>
            Full Name *
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            className={cn(inputCls, dark && "border-white/20 text-white placeholder:text-white/30")}
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className={labelCls}>
            Phone Number *
          </label>
          <input
            id="lead-phone"
            type="tel"
            required
            pattern="[0-9+\s-]{10,15}"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+91 XXXXX XXXXX"
            className={cn(inputCls, dark && "border-white/20 text-white placeholder:text-white/30")}
          />
        </div>
      </div>

      <div className={cn("grid gap-6", !compact && "md:grid-cols-2")}>
        <div>
          <label htmlFor="lead-email" className={labelCls}>
            Email Address
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className={cn(inputCls, dark && "border-white/20 text-white placeholder:text-white/30")}
          />
        </div>
        <div>
          <label htmlFor="lead-service" className={labelCls}>
            Service of Interest *
          </label>
          <select
            id="lead-service"
            required
            value={form.service}
            onChange={set("service")}
            className={cn(
              inputCls,
              "appearance-none",
              !form.service && "text-slate-soft",
              dark && "border-white/20 bg-navy-900 text-white"
            )}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s} className="text-navy-900">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lead-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="lead-message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us about your project, land requirement or maintenance need..."
          className={cn(inputCls, "resize-none", dark && "border-white/20 text-white placeholder:text-white/30")}
        />
      </div>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-3 bg-crimson-500 px-8 py-4 font-body text-[12px] font-bold tracking-[0.25em] text-navy-950 uppercase transition-all duration-500 hover:bg-crimson-400 hover:shadow-crimson"
      >
        <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        Submit Inquiry
      </button>
      <p className={cn("text-center text-[11px]", dark ? "text-white/40" : "text-slate-soft")}>
        Your inquiry opens in WhatsApp - no data is stored on our server.
      </p>
    </form>
  );
}
