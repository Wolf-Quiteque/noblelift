import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import { signOut } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Authenticated admin shell: sidebar + topbar. Middleware already enforces auth;
// this also reads the user for display.
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-3 border-b border-gray-200 bg-white px-4 lg:px-8">
          <span className="mr-auto hidden text-sm text-gray-400 sm:block">
            {user?.email}
          </span>
          <Link
            href="/"
            target="_blank"
            className="admin-btn-ghost"
            title="Abrir o site num separador novo"
          >
            <ExternalLink size={16} /> Ver site
          </Link>
          <form action={signOut}>
            <button type="submit" className="admin-btn-ghost">
              <LogOut size={16} /> Sair
            </button>
          </form>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
