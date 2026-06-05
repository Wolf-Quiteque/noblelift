import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cookie-based Supabase client for Server Components, Server Actions and Route
// Handlers. RLS applies based on the logged-in user's session.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component (read-only cookies). Safe to ignore
            // — middleware refreshes the session cookie on each request.
          }
        },
      },
    }
  );
}
