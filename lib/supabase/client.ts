import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client — used by the login page for signInWithPassword and
// signOut. Only the public anon key is exposed here.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
