import { createBrowserClient } from "@supabase/ssr";
import { authCookieOptions } from "@/lib/auth-cookie";

import { getSupabaseKey, getSupabaseUrl } from "@/lib/supabase-config";

export const createBrowserSupabase = () => createBrowserClient(getSupabaseUrl(), getSupabaseKey(), { cookieOptions: authCookieOptions });
