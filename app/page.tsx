import Link from "next/link";
import { redirect } from "next/navigation";

import { AppCard } from "@/components/AppCard";
import { getSession, isAuthRequired } from "@/lib/auth";
import { apps } from "@/lib/apps";

export default async function Home() {
  // Auth disabled for simplicity
  // const session = await getSession();
  // if (isAuthRequired() && !session) {
  //   redirect("/login?next=/");
  // }

  return (
    <div className="space-y-10">
      <section className="space-y-4 border-b border-zinc-300/50 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Launcher</p>
        <h1 className="max-w-4xl text-2xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          One calm destination for app launch, identity state, and next action.
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-zinc-600 md:text-base">
          Command Center gives you a single, minimal home for THE MENU and NATESTEGRAM. Open each app with one click,
          keep session state visible, and stay ready for token-based SSO handoff.
        </p>
      </section>

      <section aria-labelledby="apps-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 id="apps-heading" className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900">
            Apps
          </h2>
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            Guest session
          </p>
        </div>

        {apps.length > 0 ? (
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
            {apps.map((app, index) => (
              <AppCard key={app.key} app={app} index={index} />
            ))}
          </div>
        ) : (
          <div className="border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
            No apps are configured yet. Add app entries in <code>lib/apps.ts</code>.
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 border-t border-zinc-300/50 pt-7 md:grid-cols-2">
        <article className="border border-zinc-300/50 bg-white/70 p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">Quick Links</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/settings"
              className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
            >
              Preferences
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-2 right-2 h-px origin-left scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
            <a
              href="/health"
              className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
            >
              Health
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-2 right-2 h-px origin-left scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          </div>
        </article>

        <article className="border border-zinc-300/50 bg-white/70 p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span>Checked command center health</span>
              <span className="text-xs uppercase tracking-[0.14em] text-zinc-400">Now</span>
            </li>
            <li className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span>Prepared SSO token handoff contract</span>
              <span className="text-xs uppercase tracking-[0.14em] text-zinc-400">Pending</span>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
