import { createClient, type ClientConfig } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-01-01";

/** False until the user pastes their Project ID into .env.local / Vercel env. */
export const isSanityConfigured = projectId.length > 0;

const baseConfig: ClientConfig = {
  // "missing" keeps builds green before env is wired; all fetchers
  // check isSanityConfigured first and fall back to static site-data.
  projectId: isSanityConfigured ? projectId : "missing",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
};

/** Public, CDN-backed client — safe for Server Components. */
export const sanityClient = createClient(baseConfig);

/**
 * Server-only client with read token (private datasets + draft preview).
 * Import ONLY from Route Handlers / Server Components.
 */
export function getServerReadClient() {
  const token = process.env.SANITY_API_READ_TOKEN?.trim();
  if (!isSanityConfigured) return null;
  return createClient({
    ...baseConfig,
    useCdn: false,
    token: token || undefined,
  });
}

/**
 * Server-only client with write token (CRM publish via /api/properties).
 * Import ONLY from Route Handlers.
 */
export function getServerWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!isSanityConfigured || !token) return null;
  return createClient({
    ...baseConfig,
    useCdn: false,
    token,
  });
}
