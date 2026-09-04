/**
 * Migrate static site-data.ts content into Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-to-sanity.mjs          # dry run
 *   node --env-file=.env.local scripts/migrate-to-sanity.mjs --commit  # write to Sanity
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (optional),
 *   SANITY_API_WRITE_TOKEN (Editor role)
 */
import { createClient } from "@sanity/client";

const COMMIT = process.argv.includes("--commit");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Fill it in .env.local first.");
  process.exit(1);
}
if (COMMIT && !token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Create an Editor token in sanity.io/manage > API > Tokens.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });

// Node 24 strips types on import — site-data.ts is erasable TS (as const + export type).
const siteData = await import("../src/data/site-data.ts");

const docs = [];

// 1. Properties from DEFAULT_LISTINGS
for (const p of siteData.DEFAULT_LISTINGS ?? []) {
  docs.push({
    _type: "property",
    _id: `property-${p.id}`,
    propertyId: p.id,
    title: p.title,
    type: p.type,
    location: p.location,
    price: p.price,
    status: p.status,
    createdDate: p.createdDate,
    photoUrl: p.photo,
  });
}

// 2. Construction service page from SERVICES + packages + FAQs
const construction = (siteData.SERVICES ?? []).find((s) => s.slug === "construction");
if (construction) {
  docs.push({
    _type: "servicePage",
    _id: "servicePage-construction",
    title: construction.title,
    slug: { _type: "slug", current: "construction" },
    description: construction.description,
    packages: (siteData.CONSTRUCTION_PACKAGES ?? []).map((pkg) => ({
      _type: "package",
      _key: pkg.name,
      name: pkg.name,
      price: pkg.price,
      features: [...pkg.features],
    })),
    faqs: (siteData.CONSTRUCTION_FAQS ?? []).map((f, i) => ({ _type: "faq", _key: `f${i}`, q: f.q, a: f.a })),
    cta: { label: "Get Free Consultation", href: "/contact" },
  });
}

// 3. Other service pages (interiors / real-estate / maintenance) — descriptions only
for (const s of siteData.SERVICES ?? []) {
  if (s.slug === "construction") continue;
  docs.push({
    _type: "servicePage",
    _id: `servicePage-${s.slug}`,
    title: s.title,
    slug: { _type: "slug", current: s.slug },
    description: s.description,
    cta: { label: "Get Free Consultation", href: "/contact" },
  });
}

// 4. Site settings singleton (testimonials + FAQs)
docs.push({
  _type: "siteSettings",
  _id: "siteSettings",
  testimonials: (siteData.TESTIMONIALS ?? []).map((t, i) => ({
    _type: "testimonial",
    _key: `t${i}`,
    name: t.name,
    text: t.text,
    service: t.service,
  })),
  faqs: (siteData.CONSTRUCTION_FAQS ?? []).map((f, i) => ({ _type: "faq", _key: `f${i}`, q: f.q, a: f.a })),
});

console.log(`Prepared ${docs.length} documents for dataset "${dataset}" (mode: ${COMMIT ? "COMMIT" : "dry-run"}).`);
for (const d of docs) console.log(` - ${d._type}: ${d._id}`);

if (COMMIT) {
  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  const res = await tx.commit();
  console.log(`Committed ${res.results.length} documents.`);
} else {
  console.log("Dry run — nothing written. Re-run with --commit to write.");
}
