"use client";

import { useState } from "react";

import { createBrowserSupabase } from "@/lib/supabase-browser";

export function GoogleSignInButton() {
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setError(null);
    const { error: oauthError } = await createBrowserSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (oauthError) {
      setError("Couldn't start Google sign-in. Please try again.");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={signIn}
        className="group relative inline-flex h-11 w-full items-center justify-center rounded-none border border-zinc-300 bg-white px-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-900 transition-all duration-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 active:scale-95"
      >
        Continue with Google
      </button>
      {error ? <p className="border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p> : null}
    </div>
  );
}
