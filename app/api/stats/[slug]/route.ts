import { type NextRequest, NextResponse } from "next/server";
import { getUrl } from "@/lib/kv";
import { isValidSlug } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const entry = await getUrl(slug);
  if (!entry) {
    return NextResponse.json({ clicks: 0, exists: false }, { status: 404 });
  }

  return NextResponse.json({ clicks: entry.clicks, createdAt: entry.createdAt, exists: true });
}
