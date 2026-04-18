import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CF Short — Fast URL Shortener on Cloudflare Workers",
    template: "%s | CF Short",
  },
  description:
    "A fast, minimal, open-source URL shortener powered by Cloudflare Workers and KV storage. Shorten any URL in seconds.",
  metadataBase: new URL("https://cf-short-next.pages.dev"),
  keywords: ["url shortener", "cloudflare workers", "kv storage", "open source", "nextjs"],
  authors: [{ name: "manalejandro", url: "https://github.com/manalejandro" }],
  creator: "manalejandro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cf-short-next.pages.dev",
    siteName: "CF Short",
    title: "CF Short — Fast URL Shortener on Cloudflare Workers",
    description:
      "A fast, minimal, open-source URL shortener powered by Cloudflare Workers and KV storage.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CF Short — Fast URL Shortener on Cloudflare Workers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CF Short — Fast URL Shortener on Cloudflare Workers",
    description:
      "A fast, minimal, open-source URL shortener powered by Cloudflare Workers and KV storage.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
