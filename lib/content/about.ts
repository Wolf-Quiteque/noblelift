import type { AboutContent } from "@/lib/types";

export const about: AboutContent = {
  hero: {
    image: "/assets/images/real/company_location_front.jpeg",
    imageAlt: "Showroom Noblelift Angola",
    subtitle: "Representante oficial em Angola",
    title: "Sobre a Noblelift Angola",
  },
  intro: {
    image: "/assets/images/real/company_location_front.jpeg",
    imageAlt: "Showroom Noblelift",
    subtitle: "Quem Somos",
    title: "Soluções Noblelift, com presença e suporte em Luanda.",
    paragraphs: [
      "A Noblelift Angola é o representante oficial da Noblelift no território angolano. Distribuímos a gama completa de equipamentos de movimentação de cargas — empilhadeiras eléctricas, porta-paletes manuais e eléctricos, empilhadores, mesas elevatórias e plataformas — directamente do nosso showroom em Luanda.",
      "Trabalhamos com profissionalismo, suporte técnico local e peças originais para garantir a continuidade das operações dos nossos clientes em todo o país.",
    ],
    details: [
      { title: "qualidade", text: "Equipamentos certificados internacionalmente, prontos para operar em Angola." },
      { title: "proximidade", text: "Atendimento, formação e assistência técnica em português, no nosso showroom em Luanda." },
    ],
    signatureTitle: "Direção Geral",
    signatureName: "Noblelift Angola",
  },
  values: {
    subtitle: "Os nossos valores",
    title: "O que orienta o nosso trabalho.",
    description:
      "Acreditamos que uma boa parceria começa com transparência, equipamentos confiáveis e suporte presente. É por isso que as fotografias que vê neste site são reais — do nosso showroom, do nosso stock, dos nossos equipamentos.",
    panels: [
      {
        icon: "fas fa-handshake",
        title: "Transparência",
        description: "Imagens reais, fichas técnicas claras e preços honestos. Quer ver antes de comprar? Visite-nos.",
        href: "/produtos",
      },
      {
        icon: "fas fa-tools",
        title: "Suporte Local",
        description: "Equipa técnica em Luanda para instalação, manutenção, formação e reposição de peças.",
        href: "/contato",
      },
      {
        icon: "fas fa-truck-fast",
        title: "Disponibilidade",
        description: "Stock disponível no showroom, prontos para entrega — sem esperas longas para começar a operar.",
        href: "/produtos",
      },
    ],
  },
  showroom: {
    subtitle: "O nosso showroom",
    title: "Venha conhecer os equipamentos pessoalmente.",
    intro:
      "Estamos na Paragem da Mutamba, via expresse, em Luanda. Trabalhamos directamente com clientes industriais, armazenistas, distribuidores, empresas de construção e logística em todo o território nacional.",
    advantages: [
      "Showroom com stock de equipamentos eléctricos e manuais",
      "Demonstrações e ensaios mediante marcação",
      "Soluções para empresas de qualquer dimensão",
      "Atendimento técnico em português",
    ],
    panels: [
      {
        image: "/assets/images/real/image16.jpeg",
        imageAlt: "Showroom Noblelift Angola",
        icon: "fas fa-warehouse",
        title: "Showroom Luanda",
        href: "/galeria",
      },
      {
        image: "/assets/images/real/image9.jpeg",
        imageAlt: "Equipamentos em stock",
        icon: "fas fa-boxes-stacked",
        title: "Equipamentos em stock",
        href: "/produtos",
        inverted: true,
      },
    ],
  },
};
