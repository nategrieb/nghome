import Link from "next/link";

import { getSession } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    return (
      <section className="mx-auto w-full max-w-2xl border border-zinc-300/50 bg-white/75 p-6 md:p-8">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">Settings</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Sign in to manage profile and preference defaults for future SSO flows.
        </p>
        <Link
          href="/login?next=/settings"
          className="group relative mt-6 inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
        >
          Login to Continue
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl border border-zinc-300/50 bg-white/75 p-6 md:p-8">
      <header className="space-y-2 border-b border-zinc-200 pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Profile</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Settings</h1>
      </header>

      <form className="mt-6 space-y-4" aria-label="User preferences">
        <label htmlFor="display-name" className="block space-y-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
          Display Name
          <input
            id="display-name"
            defaultValue={session.user.name}
            className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm normal-case tracking-normal text-zinc-900 outline-none transition-colors duration-150 focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
          />
        </label>

        <label htmlFor="timezone" className="block space-y-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
          Timezone
          <select
            id="timezone"
            defaultValue="America/New_York"
            className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm normal-case tracking-normal text-zinc-900 outline-none transition-colors duration-150 focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
          >
            <option value="America/New_York">America/New_York</option>
            <option value="America/Chicago">America/Chicago</option>
            <option value="America/Denver">America/Denver</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
          </select>
        </label>

        <label htmlFor="launch-mode" className="block space-y-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
          Launch Mode
          <select
            id="launch-mode"
            defaultValue="new-tab"
            className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm normal-case tracking-normal text-zinc-900 outline-none transition-colors duration-150 focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
          >
            <option value="new-tab">Open apps in new tab</option>
            <option value="same-tab">Open apps in same tab</option>
          </select>
        </label>

        <p className="pt-3 text-xs leading-6 tracking-[0.12em] text-zinc-500 uppercase">
          Preferences are UI placeholders for Phase 2 profile persistence.
        </p>
      </form>
    </section>
  );
}
