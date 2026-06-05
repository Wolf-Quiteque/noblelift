import type { HomeContent } from "@/lib/types";

export const home: HomeContent = {
  slides: [
    {
      image: "/assets/images/real/image16.jpeg",
      imageAlt: "Showroom Noblelift Angola",
      headline: "Soluções completas\npara movimentação de cargas!",
      isPrimary: true,
      description:
        "Representante oficial Noblelift em Angola. Empilhadeiras, porta-paletes e equipamentos logísticos com suporte local.",
      buttons: [
        { label: "Nossos Produtos", href: "/produtos", variant: "primary" },
        { label: "Sobre Nós", href: "/sobre", variant: "white" },
      ],
    },
    {
      image: "/assets/images/real/image13.jpeg",
      imageAlt: "Vista panorâmica do showroom Noblelift Angola",
      subheadline: "Desempenho elevado com precisão",
      headline: "Empilhadeiras eléctricas\nrápidas, seguras e sustentáveis!",
      description:
        "Conheça a nova geração de empilhadeiras eléctricas Noblelift, disponíveis no nosso showroom em Luanda.",
      buttons: [
        { label: "Ver Empilhadeiras", href: "/produtos#empilhadeiras", variant: "primary" },
        { label: "Pedir Orçamento", href: "/contato#orcamento", variant: "white" },
      ],
    },
    {
      image: "/assets/images/real/company_location_front.jpeg",
      imageAlt: "Showroom Noblelift Angola — Paragem da Mutamba, Luanda",
      subheadline: "Visite o nosso showroom",
      headline: "Equipamentos prontos\npara entrega em Luanda!",
      description:
        "Paragem da Mutamba, via expresse — venha conhecer o nosso stock completo Noblelift.",
      buttons: [
        { label: "Como Chegar", href: "/contato", variant: "primary" },
        { label: "Baixar Catálogo", href: "/assets/downloads/Noblelift-Catalogo-2026.pdf", variant: "white", download: true },
      ],
    },
  ],
  servicesBar: [
    { icon: "fas fa-truck-loading", caption: "eléctricas", title: "Empilhadeiras", href: "/produtos#empilhadeiras" },
    { icon: "fas fa-dolly", caption: "manuais e eléctricos", title: "Porta-paletes", href: "/produtos#porta-paletes" },
    { icon: "fas fa-boxes-stacked", caption: "compactos e robustos", title: "Empilhadores", href: "/produtos#empilhadores" },
    { icon: "fas fa-arrows-up-down", caption: "alta elevação", title: "Mesa Elevatória", href: "/produtos#mesa-elevatoria" },
  ],
  about: {
    image: "/assets/images/real/company_location_front.jpeg",
    imageAlt: "Showroom Noblelift Angola",
    subtitle: "Distribuidor Oficial em Angola de Soluções Noblelift.",
    title: "Soluções de movimentação fiáveis e eficientes para o seu negócio.",
    paragraphs: [
      "A Noblelift Angola representa oficialmente um dos maiores fabricantes mundiais de empilhadeiras e equipamentos de movimentação de cargas, oferecendo soluções adaptadas ao mercado angolano.",
      "Trabalhamos com tecnologia de ponta, assistência técnica local e formação contínua, para garantir máxima eficiência nas operações logísticas dos nossos clientes.",
    ],
    details: [
      { title: "qualidade", text: "Produtos certificados internacionalmente e adaptados às condições do mercado africano." },
      { title: "confiabilidade", text: "Garantia de performance, suporte local e peças de origem em todas as fases de operação." },
    ],
    signatureTitle: "Direção Geral",
    signatureName: "Noblelift Angola",
  },
  ctaQuote: {
    image: "/assets/images/real/image9.jpeg",
    imageAlt: "Showroom Noblelift",
    subtitle: "Porque escolher a Noblelift?",
    title: "Soluções logísticas inteligentes, acessíveis e prontas para o futuro.",
    panels: [
      { icon: "fas fa-money-check-alt", label: "preços transparentes" },
      { icon: "fas fa-shipping-fast", label: "entrega rápida em Luanda" },
      { icon: "fas fa-tools", label: "assistência técnica local" },
    ],
  },
  features: {
    subtitle: "Equipamentos seguros e fiáveis",
    title: "A movimentar grandes operações em Angola.",
    description:
      "A nossa experiência em movimentação de cargas, aliada à tecnologia Noblelift, oferece soluções adaptadas à indústria angolana com suporte local e eficiência internacional.",
    panels: [
      {
        icon: "fas fa-truck-loading",
        title: "Empilhadeiras\nEléctricas",
        description:
          "Soluções eficientes e ecológicas para manuseio de cargas, com tecnologia de baterias de lítio e autonomia prolongada.",
        href: "/produtos#empilhadeiras",
      },
      {
        icon: "fas fa-dolly",
        title: "Porta-paletes\ne Empilhadores",
        description:
          "Equipamentos compactos e robustos, ideais para centros logísticos, supermercados e armazéns industriais.",
        href: "/produtos#porta-paletes",
      },
      {
        icon: "fas fa-arrows-up-down",
        title: "Mesas Elevatórias\ne Plataformas",
        description:
          "Mesas elevatórias hidráulicas e plataformas para optimizar a movimentação vertical no seu armazém.",
        href: "/produtos#mesa-elevatoria",
      },
    ],
    moreText: "Soluções Noblelift para movimentar o seu negócio.",
    moreLinkLabel: "Veja o catálogo completo",
    moreLinkHref: "/produtos",
  },
  imageStrip: [
    { image: "/assets/images/real/image4.jpeg", imageAlt: "Empilhadeira eléctrica Noblelift", label: "Empilhadeiras", href: "/produtos#empilhadeiras" },
    { image: "/assets/images/real/image1.jpeg", imageAlt: "Porta-paletes eléctricos Noblelift", label: "Porta-paletes", href: "/produtos#porta-paletes" },
    { image: "/assets/images/real/image6.jpeg", imageAlt: "Empilhadores manuais Noblelift", label: "Empilhadores", href: "/produtos#empilhadores" },
    { image: "/assets/images/real/image10.jpeg", imageAlt: "Porta-paletes de alta elevação Noblelift", label: "Mesa Elevatória", href: "/produtos#mesa-elevatoria" },
  ],
  ctaAdvantages: {
    subtitle: "Direção certa para o seu negócio",
    title: "Movimentação de cargas que poupa o seu tempo!",
    intro:
      "Fornecemos equipamentos Noblelift de alta performance, ideais para empresas que valorizam agilidade, eficiência e segurança nas suas operações logísticas — desde empilhadeiras eléctricas a porta-paletes e plataformas, com confiança em cada carga.",
    advantages: [
      "Equipamentos certificados internacionalmente",
      "Stock disponível no showroom em Luanda",
      "Garantia e assistência pós-venda",
      "Equipa técnica especializada",
      "Peças e acessórios de origem",
      "Atendimento profissional em português",
    ],
    panels: [
      {
        image: "/assets/images/real/image7.jpeg",
        imageAlt: "Empilhadores Noblelift",
        icon: "flaticon-015-scale",
        title: "Equipamentos certificados, prontos a entregar",
        href: "/produtos",
      },
      {
        image: "/assets/images/real/image10.jpeg",
        imageAlt: "Porta-paletes de alta elevação Noblelift",
        icon: "flaticon-017-pallet",
        title: "Eficiência operacional garantida",
        href: "/galeria",
        inverted: true,
      },
    ],
  },
};
