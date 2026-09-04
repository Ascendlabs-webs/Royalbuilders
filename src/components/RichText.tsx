"use client";

import { PortableText, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/lib/sanity.image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value);
      if (!src) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={value?.alt || ""}
          loading="lazy"
          className="my-8 w-full object-cover"
        />
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display mt-10 text-2xl font-bold text-navy-900 md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-8 text-xl font-bold text-navy-900">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-[15px] leading-relaxed text-graphite md:text-base">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-display mt-6 border-l-2 border-crimson-500 pl-6 text-lg text-navy-900 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="text-crimson-600 underline underline-offset-4 hover:text-crimson-500"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-navy-900">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-graphite">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-graphite">{children}</ol>,
  },
};

export default function RichText({ value }: { value: unknown }) {
  if (!value) return null;
  // PortableText expects TypedObject[]; CMS guarantees block array shape.
  return <PortableText value={value as never} components={components} />;
}
