// Augment the global CloudflareEnv interface (from @opennextjs/cloudflare)
// with application-specific bindings.
declare global {
  interface CloudflareEnv {
    CF_SHORT_KV: KVNamespace;
    BASE_URL: string;
  }
}

export {};
