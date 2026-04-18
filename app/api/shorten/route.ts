import { type NextRequest, NextResponse } from "next/server";
import { generateSlug, isValidSlug, isValidUrl, sanitiseUrl } from "@/lib/utils";
import { getUrl, putUrl } from "@/lib/kv";

export async function POST(request: NextRequest) {
  let body: { url?: string; customSlug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const raw = (body.url ?? "").trim();
  if (!raw) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }
  if (!isValidUrl(raw)) {
    return NextResponse.json(
      { error: "Please enter a valid http or https URL." },
      { status: 400 }
    );
  }

  const url = sanitiseUrl(raw);

  // Custom slug validation
  let slug = body.customSlug?.trim() ?? "";
  if (slug) {
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: "Custom slug must be 3–32 alphanumeric characters (a-z, A-Z, 0-9, _, -)." },
        { status: 400 }
      );
    }
    const existing = await getUrl(slug);
    if (existing) {
      return NextResponse.json(
        { error: "That custom slug is already taken. Try another." },
        { status: 409 }
      );
    }
  } else {
    // Generate a unique slug
    let attempts = 0;
    do {
      slug = generateSlug(6);
      const existing = await getUrl(slug);
      if (!existing) break;
      attempts++;
    } while (attempts < 5);
    if (attempts >= 5) {
      return NextResponse.json(
        { error: "Could not generate a unique slug. Try again." },
        { status: 500 }
      );
    }
  }

  await putUrl(slug, { url, createdAt: Date.now(), clicks: 0 });

  const base = process.env.BASE_URL ?? `https://${request.headers.get("host")}`;
  return NextResponse.json({ slug, shortUrl: `${base}/${slug}` }, { status: 201 });
}
