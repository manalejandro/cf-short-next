import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config for CF Short — no ISR/R2 cache needed for a URL shortener
export default defineCloudflareConfig();
