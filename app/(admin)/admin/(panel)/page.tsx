import Link from "next/link";
import { Home, Package, Images, Building2, Phone, Settings, ArrowRight } from "lucide-react";

const cards = [
  { href: "/admin/inicio", label: "Pagina Inicial", desc: "Slides, secoes e destaques da homepage.", icon: Home },
  { href: "/admin/produtos", label: "Produtos", desc: "Categorias e fichas de produtos.", icon: Package },
  { href: "/admin/galeria", label: "Galeria", desc: "Fotografias do showroom.", icon: Images },
  { href: "/admin/empresa", label: "Empresa", desc: "Pagina Sobre e valores.", icon: Building2 },
  { href: "/admin/contato", label: "Contato", desc: "Texto, cartoes e formulario da pagina de contato.", icon: Phone },
  { href: "/admin/definicoes", label: "Definicoes", desc: "Contactos, menu, redes sociais e rodape.", icon: Settings },
];

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel</h1>
        <p className="mt-1 text-sm text-gray-500">
          Edite qualquer secao do site. As alteracoes ficam visiveis assim que clicar em
          Guardar e publicar.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="flex items-center gap-1 font-semibold text-gray-900">
                {label}
                <ArrowRight size={16} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
