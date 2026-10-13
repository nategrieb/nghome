import Link from "next/link";
import { redirect } from "next/navigation";

import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { getSession } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata = { title: "Sign in · NATE GRIEB", robots: { index: false } };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="mx-auto w-full max-w-xl border border-zinc-300/50 bg-white/75 p-6 md:p-8">
      <header className="space-y-3 border-b border-zinc-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Sign in</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">One login for every app</h1>
        <p className="text-sm leading-7 text-zinc-600">
          Sign in with Google to use the apps you have access to.
        </p>
      </header>

      <div className="mt-6 space-y-4">
        {params.error === "google" ? (
          <p className="border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
            Google sign-in didn&apos;t complete. Please try again.
          </p>
        ) : null}

        <GoogleSignInButton />

        <div className="pt-2">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.16em] text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          >
            Continue as guest
          </Link>
        </div>
      </div>
    </section>
  );
}
