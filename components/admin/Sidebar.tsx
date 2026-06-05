"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Package,
  Images,
  Building2,
  Settings,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard, exact: true },
  { href: "/admin/inicio", label: "Página Inicial", icon: Home },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/galeria", label: "Galeria", icon: Images },
  { href: "/admin/empresa", label: "Empresa", icon: Building2 },
  { href: "/admin/definicoes", label: "Definições", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-16 shrink-0 flex-col border-r border-gray-200 bg-white lg:w-64">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-3 lg:px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand font-bold text-white">
          N
        </div>
        <span className="hidden text-sm font-semibold leading-tight text-gray-900 lg:block">
          Noblelift Angola
          <span className="block text-xs font-normal text-gray-400">Gestor de conteúdo</span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-2 lg:p-3">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition lg:px-3 ${
                active
                  ? "bg-brand/10 text-brand"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="hidden lg:inline">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
