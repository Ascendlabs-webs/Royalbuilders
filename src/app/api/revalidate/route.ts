import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate — Sanity publish webhook target.
 * Configure in sanity.io/manage → API → Webhooks with header:
 *   Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 * Body: { "paths": ["/", "/real-estate", "/blog"] } (optional)
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, reason: "Revalidate secret not configured." }, { status: 500 });
  }
  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, reason: "Unauthorized." }, { status: 401 });
  }

  let paths = ["/", "/real-estate", "/crm", "/blog"];
  try {
    const body = await req.json();
    if (Array.isArray(body?.paths) && body.paths.length > 0) {
      paths = body.paths.filter((p: unknown) => typeof p === "string");
    }
  } catch {
    /* fall back to defaults */
  }

  for (const p of paths) revalidatePath(p, "page");
  return NextResponse.json({ ok: true, revalidated: paths });
}
