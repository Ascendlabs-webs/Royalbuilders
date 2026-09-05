import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient, isSanityConfigured } from "./sanity.client";
import { DEFAULT_LISTINGS, type ListingProperty } from "@/data/site-data";

/* ---------------------------------- Types --------------------------------- */

export type CmsProperty = {
  _id: string;
  propertyId: string;
  title: string;
  type: string;
  location: string;
  price: number;
  status: ListingProperty["status"];
  createdDate: string;
  photo: string;
  fullAddress?: string;
  pricePerSqft?: number;
  sellingPoints?: string[];
  totalArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  facing?: string;
  legal?: Record<string, boolean>;
  gallery?: string[];
  mapLink?: string;
};

export type CmsPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown;
  author?: string;
  publishedAt: string;
  tags?: string[];
  coverImage?: unknown;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsServicePage = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  packages?: { name: string; price: number; features: string[] }[];
  faqs?: { q: string; a: string }[];
};

export type CmsSiteSettings = {
  heroBanners?: { title: string; subtitle?: string; image?: SanityImageSource }[];
  testimonials?: { name: string; text: string; service?: string }[];
  faqs?: { q: string; a: string }[];
};

/* ---------------------------------- GROQ ---------------------------------- */

const PROPERTY_PROJECTION = groq`{
  _id,
  "propertyId": coalesce(propertyId, _id),
  title,
  type,
  location,
  price,
  status,
  "createdDate": coalesce(createdDate, _createdAt),
  "photo": coalesce(photo.asset->url, photoUrl),
  fullAddress,
  pricePerSqft,
  sellingPoints,
  totalArea,
  bedrooms,
  bathrooms,
  facing,
  legal,
  "gallery": gallery[].asset->url,
  mapLink
}`;

export const PROPERTIES_QUERY = groq`*[_type == "property" && status != "draft"] | order(createdDate desc) ${PROPERTY_PROJECTION}`;
export const ALL_PROPERTIES_QUERY = groq`*[_type == "property"] | order(createdDate desc) ${PROPERTY_PROJECTION}`;
export const PROPERTY_BY_ID_QUERY = groq`*[_type == "property" && propertyId == $id][0] ${PROPERTY_PROJECTION}`;

export const POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, body,
  "author": author->name, publishedAt, tags,
  coverImage, "coverImageUrl": coverImage.asset->url,
  seoTitle, seoDescription
}`;
export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, body,
  "author": author->name, publishedAt, tags,
  coverImage, "coverImageUrl": coverImage.asset->url,
  seoTitle, seoDescription
}`;

export const SERVICE_BY_SLUG_QUERY = groq`*[_type == "servicePage" && slug.current == $slug][0] {
  _id, "slug": slug.current, title, description, packages, faqs
}`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  heroBanners, testimonials, faqs
}`;

/* --------------------------------- Fetchers ------------------------------- */
/* Every fetcher falls back to static data when Sanity is unwired/empty,     */
/* so the live site never breaks during rollout.                             */

async function safeFetch<T>(query: string, params?: Record<string, unknown>, fresh = false): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch<T>(query, params ?? {}, fresh
      ? { cache: "no-store" }
      : { next: { revalidate: 3600 } });
  } catch {
    return null;
  }
}

/** Properties for public pages — falls back to DEFAULT_LISTINGS. */
export async function getProperties(): Promise<ListingProperty[]> {
  const rows = await safeFetch<CmsProperty[]>(PROPERTIES_QUERY);
  if (!rows || rows.length === 0) return [...DEFAULT_LISTINGS];
  return rows.map((p) => ({
    id: p.propertyId,
    title: p.title,
    type: p.type,
    location: p.location,
    price: p.price ?? 0,
    status: p.status ?? "available",
    createdDate: (p.createdDate ?? "").slice(0, 10),
    photo: p.photo || "https://via.placeholder.com/400x300?text=No+Image",
  }));
}

/** All properties incl. drafts — for the CRM dashboard. Always fresh (runtime API). */
export async function getAllPropertiesForCrm(): Promise<ListingProperty[]> {
  const rows = await safeFetch<CmsProperty[]>(ALL_PROPERTIES_QUERY, undefined, true);
  if (!rows || rows.length === 0) return [...DEFAULT_LISTINGS];
  return rows.map((p) => ({
    id: p.propertyId,
    title: p.title,
    type: p.type,
    location: p.location,
    price: p.price ?? 0,
    status: p.status ?? "available",
    createdDate: (p.createdDate ?? "").slice(0, 10),
    photo: p.photo || "https://via.placeholder.com/400x300?text=No+Image",
  }));
}

export async function getPosts(): Promise<CmsPost[]> {
  return (await safeFetch<CmsPost[]>(POSTS_QUERY)) ?? [];
}

/** Full detail for one property — fresh, with static fallback. */
export async function getPropertyById(id: string): Promise<CmsProperty | null> {
  const decoded = decodeURIComponent(id);
  const row = await safeFetch<CmsProperty>(PROPERTY_BY_ID_QUERY, { id: decoded }, true);
  if (row) return row;
  const fb = DEFAULT_LISTINGS.find((p) => p.id.toLowerCase() === decoded.toLowerCase());
  if (!fb) return null;
  return {
    _id: fb.id,
    propertyId: fb.id,
    title: fb.title,
    type: fb.type,
    location: fb.location,
    price: fb.price,
    status: fb.status,
    createdDate: fb.createdDate,
    photo: fb.photo,
  };
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  return await safeFetch<CmsPost>(POST_BY_SLUG_QUERY, { slug });
}

export async function getServicePage(slug: string): Promise<CmsServicePage | null> {
  return await safeFetch<CmsServicePage>(SERVICE_BY_SLUG_QUERY, { slug });
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  return await safeFetch<CmsSiteSettings>(SITE_SETTINGS_QUERY);
}
