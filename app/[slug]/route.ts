import { type NextRequest, NextResponse } from "next/server";
import { getUrl, incrementClicks } from "@/lib/kv";
import { isValidSlug } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return NextResponse.redirect(new URL("/not-found", _request.url), 302);
  }

  const entry = await getUrl(slug);
  if (!entry) {
    return NextResponse.redirect(new URL("/not-found", _request.url), 302);
  }

  // Increment clicks asynchronously (fire-and-forget)
  incrementClicks(slug).catch(() => {});

  return NextResponse.redirect(entry.url, 302);
}
