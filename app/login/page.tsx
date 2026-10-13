import Link from "next/link";
import { redirect } from "next/navigation";

import { BrandIcon } from "@/components/BrandIcon";
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
    <section className="mx-auto w-full max-w-sm py-6 md:py-14">
      <div className="border border-zinc-300/60 bg-white/85 px-6 py-8 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:px-8 md:py-10">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <BrandIcon shape="triangle" className="h-6 w-6" />
            <BrandIcon shape="circle" className="h-6 w-6" />
            <BrandIcon shape="square" className="h-6 w-6" />
          </span>
          <div className="space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">Sign in</h1>
            <p className="text-sm text-zinc-500">One login to rule them all.</p>
          </div>
        </div>

        {params.error === "google" ? (
          <p className="mb-4 border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
            Google sign-in didn&apos;t complete. Please try again.
          </p>
        ) : null}

        <GoogleSignInButton />
      </div>

      <p className="mt-5 text-center">
        <Link
          href="/"
          className="text-xs text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:text-zinc-700 focus-visible:underline"
        >
          Continue as guest
        </Link>
      </p>
    </section>
  );
}
