"use client";

import { useState, useRef } from "react";

interface Result {
  slug: string;
  shortUrl: string;
}

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), customSlug: customSlug.trim() || undefined }),
      });
      const data = await res.json() as { error?: string; slug?: string; shortUrl?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult({ slug: data.slug!, shortUrl: data.shortUrl! });
        setUrl("");
        setCustomSlug("");
        setShowAdvanced(false);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleNewLink() {
    setResult(null);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main URL input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <LinkIcon className="h-5 w-5 text-[var(--muted)]" />
              </div>
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-long-url.com/paste-here"
                required
                autoFocus
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-11 pr-4 py-4 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] transition-all focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="shrink-0 rounded-xl bg-[var(--brand)] px-6 py-4 text-base font-semibold text-white transition-all hover:bg-[var(--brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon className="h-4 w-4 animate-spin" />
                  Shortening…
                </span>
              ) : (
                "Shorten"
              )}
            </button>
          </div>

          {/* Advanced options toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <ChevronIcon
                className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
              />
              {showAdvanced ? "Hide" : "Custom slug (optional)"}
            </button>

            {showAdvanced && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                <span className="shrink-0 text-sm text-[var(--muted)] font-mono">
                  {typeof window !== "undefined" ? window.location.host : "cfshort.link"}/
                </span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                  placeholder="my-custom-slug"
                  maxLength={32}
                  className="min-w-0 flex-1 bg-transparent text-base text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none font-mono"
                />
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <ErrorIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </form>
      ) : (
        /* Success card */
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--brand)]/10 to-transparent px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--brand)]">
              <CheckIcon className="h-4 w-4" />
              Link shortened successfully!
            </div>
          </div>

          <div className="px-6 py-5 space-y-4">
            {/* Short URL display */}
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5">
              <span className="flex-1 font-mono text-base font-semibold text-[var(--brand)] truncate">
                {result.shortUrl}
              </span>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 rounded-lg bg-[var(--brand)] px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-[var(--brand-dark)] active:scale-95"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Original URL */}
            <div className="text-sm text-[var(--muted)]">
              <span className="font-medium">Original: </span>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)] transition-colors truncate max-w-full inline-block align-bottom"
              >
                {url || "…"}
              </a>
            </div>

            <button
              onClick={handleNewLink}
              className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--background)] active:scale-[0.99]"
            >
              Shorten another link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Inline micro-icons ---- */
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  );
}
function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
  );
}
function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  );
}
