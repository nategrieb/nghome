import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";

import { BrandIcon } from "@/components/BrandIcon";
import { SessionProvider } from "@/components/session-provider";
import { getSession, signOutAction } from "@/lib/auth";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nategrieb.com"),
  title: "NATE GRIEB",
  description: "App launcher for Nate Grieb sites.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://nategrieb.com",
    siteName: "NATE GRIEB",
    title: "NATE GRIEB",
    description: "App launcher for Nate Grieb sites.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NATE GRIEB",
    description: "App launcher for Nate Grieb sites.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <SessionProvider session={session}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-zinc-300 focus:bg-white focus:px-3 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.14em]"
          >
            Skip to content
          </a>

          <div className="relative min-h-screen overflow-x-hidden">
            <div className="backdrop-orb" aria-hidden="true" />

            <header className="relative z-10 border-b border-zinc-300/40 bg-white/75 backdrop-blur-sm">
              <nav
                className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 md:px-8"
                aria-label="Primary"
              >
                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 rounded-none border border-transparent px-1 py-1 hover:border-zinc-300/80 focus-visible:border-zinc-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
                >
                  <span className="relative inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
                    <BrandIcon shape="circle" className="absolute h-5 w-5" />
                    <BrandIcon shape="triangle" className="absolute h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.22em] text-zinc-900 md:text-sm">
                    NATE GRIEB
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href="/settings"
                    className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 active:scale-95"
                  >
                    Settings
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
                    />
                  </Link>

                  {session ? (
                    <form action={signOutAction}>
                      <input type="hidden" name="next" value="/login" />
                      <button
                        type="submit"
                        className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 active:scale-95"
                      >
                        Logout
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
                        />
                      </button>
                    </form>
                  ) : (
                    <Link
                      href="/login"
                      className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 active:scale-95"
                    >
                      Login
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
                      />
                    </Link>
                  )}
                </div>
              </nav>
            </header>

            <main id="main-content" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
              {children}
            </main>

            <footer className="relative z-10 border-t border-zinc-300/40 bg-white/65 py-4">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-xs tracking-[0.12em] text-zinc-500 uppercase md:px-8">
                <p>Nate Grieb</p>
                <p>{session ? `Signed in as ${session.user.name}` : "Guest mode"}</p>
              </div>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
