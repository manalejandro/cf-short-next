import ShortenerForm from "@/components/ShortenerForm";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero section */}
      <section className="hero-bg flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/5 px-4 py-1.5 text-sm text-[var(--brand)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
          Powered by Cloudflare Workers &amp; KV
        </div>

        {/* Heading */}
        <h1 className="mb-4 max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
          Short links,{" "}
          <span className="text-[var(--brand)]">lightning fast</span>
        </h1>
        <p className="mb-10 max-w-lg text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Paste a long URL and get a short, shareable link in seconds — served from Cloudflare&apos;s
          global edge network.
        </p>

        {/* Shortener form */}
        <ShortenerForm />
      </section>

      {/* Features */}
      <section className="py-16 px-6 border-t border-[var(--border)]">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Why CF Short?</h2>
          <p className="text-[var(--muted)]">No accounts, no tracking, no fuss. Just fast links.</p>
        </div>
        <FeatureCards />
      </section>
    </main>
  );
}
