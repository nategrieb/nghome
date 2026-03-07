import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession, signInAction } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = typeof params.next === "string" ? params.next : "/";
  const session = await getSession();

  if (session) {
    redirect(nextPath);
  }

  return (
    <section className="mx-auto w-full max-w-xl border border-zinc-300/50 bg-white/75 p-6 md:p-8">
      <header className="space-y-3 border-b border-zinc-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Session Access</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Login to Command Center</h1>
        <p className="text-sm leading-7 text-zinc-600">
          This Phase 1 login sets a secure local session cookie so the shell can expose authenticated state.
        </p>
      </header>

      <form action={signInAction} className="mt-6 space-y-4" noValidate>
        <input type="hidden" name="next" value={nextPath} />

        <label className="block space-y-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600" htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Operator"
            className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm normal-case tracking-normal text-zinc-900 outline-none transition-colors duration-150 placeholder:text-zinc-400 focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
          />
        </label>

        <label className="block space-y-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm normal-case tracking-normal text-zinc-900 outline-none transition-colors duration-150 placeholder:text-zinc-400 focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.16em] text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          >
            Continue as guest
          </Link>

          <button
            type="submit"
            className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 active:scale-95"
          >
            Authenticate
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
            />
          </button>
        </div>
      </form>
    </section>
  );
}
