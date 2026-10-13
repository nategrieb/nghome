import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy · NATE GRIEB",
  description: "How Nate Grieb's personal apps handle sign-in and data.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "October 13, 2026";

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-full max-w-2xl border border-zinc-300/50 bg-white/75 p-6 md:p-8">
      <header className="space-y-2 border-b border-zinc-200 pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Last updated {UPDATED}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Privacy</h1>
      </header>

      <div className="mt-6 space-y-6 text-sm leading-7 text-zinc-700">
        <p>
          These are personal projects run by Nate Grieb at nategrieb.com: a photo gallery, a recipe and meal-planning
          app, and a workout tracker (LFD). This page explains what they collect and why. It is written in plain
          language and applies to all of them.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900">Browsing</h2>
          <p>
            You don&apos;t need an account to view this site, look at photos, or open a shared link. These pages don&apos;t
            ask for your name or email, and they don&apos;t use advertising or tracking cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900">Signing in</h2>
          <p>
            Some areas need a login. You can sign in with an email and password or with Google. When you use Google,
            Google tells us your email address and name, and nothing else (not your contacts, files or calendar). We use
            them only to recognize you and decide which apps you may use.
          </p>
          <p>
            A small cookie keeps you signed in, and is used for that purpose only. We never see your Google password.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900">What is stored</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your account: email address, display name, and which apps you have access to.</li>
            <li>What you create in an app, such as workouts and profile details in LFD, or recipes and meal plans.</li>
            <li>
              If you choose to connect Strava in LFD, the connection details needed to sync your workouts. You can
              disconnect at any time.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900">Who else handles it</h2>
          <p>
            The apps run on a few services that process data on our behalf: Supabase (accounts and database), Vercel
            (hosting) and Google (the sign-in option). We don&apos;t sell your information, share it for advertising, or
            give it to anyone else.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900">Your choices</h2>
          <p>
            You can ask to see, correct or delete your account and the data tied to it at any time by emailing{" "}
            <a className="underline underline-offset-4" href="mailto:nate@nategrieb.com">
              nate@nategrieb.com
            </a>
            . Deleting your account removes your profile and what you created in the apps.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900">Changes</h2>
          <p>If this changes in a meaningful way, the date above will be updated.</p>
        </section>

        <p>
          <Link href="/" className="text-xs uppercase tracking-[0.16em] text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
