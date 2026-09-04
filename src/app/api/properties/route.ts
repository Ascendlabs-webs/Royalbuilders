import { NextResponse } from "next/server";
import { getAllPropertiesForCrm } from "@/lib/sanity.queries";
import { getServerWriteClient, isSanityConfigured } from "@/lib/sanity.client";

export const dynamic = "force-dynamic";

/** GET /api/properties — live listings from Sanity (CRM + public site). */
export async function GET() {
  const properties = await getAllPropertiesForCrm().catch(() => []);
  return NextResponse.json({ properties, source: isSanityConfigured ? "cms" : "static" });
}

/**
 * POST /api/properties — publish a CRM property to Sanity.
 * Requires SANITY_API_WRITE_TOKEN on the server. Safe no-op otherwise.
 */
export async function POST(req: Request) {
  const writeClient = getServerWriteClient();
  if (!writeClient) {
    return NextResponse.json(
      { ok: false, reason: "CMS write not configured (missing Project ID or SANITY_API_WRITE_TOKEN). Saved locally only." },
      { status: 202 },
    );
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "Invalid JSON body." }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const propertyId = String(body.id ?? body.propertyId ?? "").trim();
  if (!title || !propertyId) {
    return NextResponse.json({ ok: false, reason: "title and id are required." }, { status: 400 });
  }

  const status = ["available", "sold", "reserved", "draft"].includes(String(body.status))
    ? String(body.status)
    : "available";

  try {
    const doc = await writeClient.create({
      _type: "property",
      propertyId,
      title,
      type: String(body.type ?? "House"),
      location: String(body.location ?? "Unknown"),
      price: Number(body.price) || 0,
      status,
      createdDate: String(body.createdDate ?? new Date().toISOString().slice(0, 10)),
      fullAddress: typeof body.fullAddress === "string" ? body.fullAddress : undefined,
    });
    return NextResponse.json({ ok: true, id: doc._id });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: e instanceof Error ? e.message : "Sanity write failed." },
      { status: 500 },
    );
  }
}
