import "server-only";

import { redirect } from "next/navigation";

import type { Session } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase-config";
import { createServerSupabase } from "@/lib/supabase-server";

function getSafeNextPath(nextPath: string | null): string {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/";
  }

  return nextPath;
}

/** The signed-in user (verified with Supabase), or null for guests. */
export async function getSession(): Promise<Session | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    const { user } = data;
    const meta = (user.user_metadata ?? {}) as { full_name?: string; name?: string };
    const name = meta.full_name || meta.name || user.email?.split("@")[0] || "Signed in";

    return { user: { name, email: user.email ?? undefined }, createdAt: user.last_sign_in_at ?? user.created_at };
  } catch {
    return null;
  }
}

export async function signOutAction(formData: FormData): Promise<void> {
  "use server";

  const nextPath = getSafeNextPath(formData.get("next")?.toString() ?? "/login");

  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabase();
    await supabase.auth.signOut();
  }

  redirect(nextPath);
}
