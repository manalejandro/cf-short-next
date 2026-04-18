import { getRequestContext } from "@cloudflare/next-on-pages";

export interface ShortEntry {
  url: string;
  createdAt: number;
  clicks: number;
}

function getKV(): KVNamespace {
  const ctx = getRequestContext();
  return (ctx.env as Env).CF_SHORT_KV;
}

export async function getUrl(slug: string): Promise<ShortEntry | null> {
  const kv = getKV();
  const raw = await kv.get(slug, "json");
  return raw as ShortEntry | null;
}

export async function putUrl(slug: string, entry: ShortEntry): Promise<void> {
  const kv = getKV();
  await kv.put(slug, JSON.stringify(entry));
}

export async function incrementClicks(slug: string): Promise<void> {
  const kv = getKV();
  const raw = await kv.get<ShortEntry>(slug, "json");
  if (raw) {
    raw.clicks = (raw.clicks ?? 0) + 1;
    await kv.put(slug, JSON.stringify(raw));
  }
}

export async function deleteUrl(slug: string): Promise<void> {
  const kv = getKV();
  await kv.delete(slug);
}
