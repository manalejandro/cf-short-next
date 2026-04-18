/** Generates a short random alphanumeric slug of given length */
export function generateSlug(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join("");
}

/** Validate a URL is safe and well-formed */
export function isValidUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Sanitise a URL – strip fragment, ensure protocol */
export function sanitiseUrl(raw: string): string {
  const url = new URL(raw);
  url.hash = "";
  return url.toString();
}

export const SLUG_REGEX = /^[a-zA-Z0-9_-]{3,32}$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}
