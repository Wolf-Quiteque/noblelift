import type { SiteConfig } from "@/lib/types";

// Global, site-wide content. Editing anything here updates the header, footer,
// contact details and navigation across every page.
export const site: SiteConfig = {
  brand: "Noblelift Angola",
  logo: "/assets/images/logo/nobelift.png",
  catalogPdf: "/assets/downloads/Noblelift-Catalogo-2026.pdf",
  phone: "+244 928 283 666",
  phoneHref: "+244928283666",
  email: "txtailai@yeah.net",
  address: "Paragem da Mutamba, via expresse, Luanda, Angola",
  addressShort: "Paragem da Mutamba, via expresse, Luanda – Angola",
  mapsLink: "https://maps.google.com/?q=Paragem+da+Mutamba,+Luanda,+Angola",
  hours: ["Segunda a Sexta: 08h00 – 17h00", "Sábado: 08h00 – 13h00"],
  social: [
    { label: "Facebook", href: "#", icon: "fab fa-facebook-f" },
    { label: "Instagram", href: "#", icon: "fab fa-instagram" },
    { label: "LinkedIn", href: "#", icon: "fab fa-linkedin-in" },
  ],
  nav: [
    { label: "Início", href: "/" },
    { label: "Empresa", href: "/sobre" },
    {
      label: "Produtos",
      href: "/produtos",
      children: [
        { label: "Empilhadeiras Eléctricas", href: "/produtos#empilhadeiras" },
        { label: "Porta-paletes", href: "/produtos#porta-paletes" },
        { label: "Empilhadores", href: "/produtos#empilhadores" },
        { label: "Mesa Elevatória", href: "/produtos#mesa-elevatoria" },
        { label: "Plataformas Elevatórias", href: "/produtos#plataformas" },
      ],
    },
    { label: "Galeria", href: "/galeria" },
    { label: "Catálogo", href: "/assets/downloads/Noblelift-Catalogo-2026.pdf", download: true },
    { label: "Contato", href: "/contato" },
  ],
  footerAbout:
    "A Noblelift Angola é representante oficial da Noblelift na distribuição de empilhadeiras, porta-paletes, mesas elevatórias e soluções logísticas em todo território nacional.",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=Paragem%20da%20Mutamba%2C%20Luanda%2C%20Angola&t=m&z=15&output=embed&iwloc=near",
};
