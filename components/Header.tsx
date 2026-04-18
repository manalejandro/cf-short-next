import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo.svg" alt="CF Short logo" width={32} height={32} priority />
          <span className="text-lg font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--brand)] transition-colors">
            CF Short
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <a
            href="https://github.com/manalejandro/cf-short-next"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-all"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://developers.cloudflare.com/workers/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-all"
            title="Powered by Cloudflare Workers"
          >
            <CloudflareIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Workers</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function CloudflareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 15.5c.28-.96.17-1.85-.34-2.51-.47-.61-1.2-.97-2.06-1.02l-.35-.01-.12-.33c-.39-1.1-1.43-1.83-2.65-1.83-1.71 0-3.1 1.4-3.1 3.11v.2l-.2.03c-.97.15-1.68.99-1.68 1.99 0 1.11.9 2.01 2.01 2.01h7.49c.94 0 1.7-.63 1.9-1.5l.1-.14zm2.09-1.95c-.11-.42-.29-.82-.54-1.17 1.08-.29 1.95-1.28 1.95-2.49 0-1.42-1.16-2.57-2.57-2.57-.33 0-.65.06-.94.18-.22-2.22-2.09-3.96-4.37-3.96-2.17 0-3.97 1.59-4.3 3.66-.34-.17-.71-.27-1.12-.27-1.38 0-2.5 1.12-2.5 2.5 0 .48.14.93.38 1.31C3.8 11.1 3 12.21 3 13.5c0 1.71 1.39 3.1 3.1 3.1h10.84c1.41 0 2.56-1.15 2.56-2.56 0-.52-.15-1-.41-1.39l.5-.1z" />
    </svg>
  );
}
