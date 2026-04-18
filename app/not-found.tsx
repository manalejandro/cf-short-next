import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Image src="/logo.svg" alt="CF Short" width={56} height={56} className="mb-8 opacity-60" />
      <h1 className="text-5xl font-bold text-[var(--foreground)] mb-3">404</h1>
      <p className="text-xl text-[var(--muted)] mb-2">Link not found</p>
      <p className="text-sm text-[var(--muted)] mb-8 max-w-sm">
        This short link doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] transition-colors"
      >
        Create a new link
      </Link>
    </main>
  );
}
