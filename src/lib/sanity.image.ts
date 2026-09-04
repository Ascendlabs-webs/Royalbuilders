import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "./sanity.client";

const builder = createImageUrlBuilder({ projectId: projectId || "missing", dataset });

/**
 * Build an optimized Sanity CDN URL. Falls back to the raw string when
 * the source is already a URL (local /images/*, Unsplash) or CMS is unwired.
 */
export function urlFor(source: SanityImageSource | string | null | undefined) {
  if (!source) return "";
  if (typeof source === "string") return source;
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return "";
  }
}

/** Responsive srcSet helper for <img> tags. */
export function responsiveSrc(
  source: SanityImageSource | string | null | undefined,
  widths: number[] = [640, 960, 1280, 1920],
): string {
  if (!source || typeof source === "string") return "";
  try {
    return widths
      .map((w) => `${builder.image(source).width(w).auto("format").url()} ${w}w`)
      .join(", ");
  } catch {
    return "";
  }
}
