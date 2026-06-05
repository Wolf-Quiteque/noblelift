import type { ProductCategory } from "@/lib/types";

// The 5 product categories. Adding a category here automatically adds it to the
// products page, the quick-nav bar and (where wired) the menu/footer links.
export const products: ProductCategory[] = [
  {
    id: "empilhadeiras",
    indexLabel: "Categoria 1 de 5",
    icon: "fas fa-truck-loading",
    caption: "eléctricas",
    navTitle: "Empilhadeiras",
    title: "Empilhadeiras Eléctricas",
    description:
      "Empilhadeiras eléctricas Noblelift de 4 rodas, com tecnologia de baterias de lítio, ideais para operações intensivas em armazéns, fábricas e centros logísticos. Maior autonomia, menor manutenção e zero emissões.",
    cards: [
      {
        image: "/assets/images/real/image4.jpeg",
        imageAlt: "Empilhadeira eléctrica Noblelift G50",
        title: "Empilhadeira Eléctrica Noblelift",
        description: "Capacidade até 5 toneladas. Operação silenciosa, ideal para uso interior e exterior.",
      },
      {
        image: "/assets/images/real/image3.jpeg",
        imageAlt: "Empilhadeira Noblelift no showroom",
        title: "Linha completa em stock",
        description: "Várias capacidades e configurações de mastro disponíveis para entrega imediata em Luanda.",
      },
    ],
  },
  {
    id: "porta-paletes",
    indexLabel: "Categoria 2 de 5",
    icon: "fas fa-dolly",
    caption: "manuais e eléctricos",
    navTitle: "Porta-paletes",
    title: "Porta-paletes",
    description:
      "Porta-paletes manuais e eléctricos Noblelift, projetados para movimentação rápida de cargas paletizadas. Robustos, leves e fáceis de operar — a base de qualquer operação logística.",
    cards: [
      {
        image: "/assets/images/real/image1.jpeg",
        imageAlt: "Porta-paletes eléctricos Noblelift EDGE",
        title: "Porta-paletes Eléctrico",
        description: "Linha EDGE — 1500/2000/2500 kg de capacidade. Bateria de lítio, manípulo ergonómico, ideal para operação contínua.",
      },
      {
        image: "/assets/images/real/image2.jpeg",
        imageAlt: "Porta-paletes Noblelift em stock",
        title: "Stock disponível em Luanda",
        description: "Modelos prontos para entrega no nosso showroom. Demonstrações no local mediante marcação.",
      },
    ],
  },
  {
    id: "empilhadores",
    indexLabel: "Categoria 3 de 5",
    icon: "fas fa-boxes-stacked",
    caption: "compactos e robustos",
    navTitle: "Empilhadores",
    title: "Empilhadores Manuais e Eléctricos",
    description:
      "Empilhadores Noblelift para movimentação vertical de paletes e cargas. Modelos manuais hidráulicos e eléctricos auto-propulsionados, com diferentes alturas de elevação e capacidades.",
    cards: [
      {
        image: "/assets/images/real/image6.jpeg",
        imageAlt: "Empilhadores manuais Noblelift",
        title: "Empilhador Manual",
        description: "Capacidade 1000 kg — solução económica e fiável para armazéns e operações ligeiras.",
      },
      {
        image: "/assets/images/real/image5.jpeg",
        imageAlt: "Empilhador eléctrico Noblelift",
        title: "Empilhador Eléctrico",
        description: "Auto-propulsionado, ideal para operações intensivas. Múltiplas alturas de elevação disponíveis.",
      },
      {
        image: "/assets/images/real/image7.jpeg",
        imageAlt: "Empilhadores no showroom Noblelift",
        title: "Linha completa",
        description: "Vários modelos em exposição — venha conhecer e testar antes de comprar.",
      },
      {
        image: "/assets/images/real/image9.jpeg",
        imageAlt: "Showroom Noblelift Angola",
        title: "Suporte técnico incluído",
        description: "Cada equipamento entregue com manual, formação básica de operação e garantia.",
      },
    ],
  },
  {
    id: "mesa-elevatoria",
    indexLabel: "Categoria 4 de 5",
    icon: "fas fa-arrows-up-down",
    caption: "alta elevação",
    navTitle: "Mesa Elevatória",
    title: "Mesa Elevatória / Porta-paletes de Alta Elevação",
    description:
      "Porta-paletes de alta elevação Noblelift, ideais para operações de embalagem, montagem e movimentação ergonómica de cargas. Eleva paletes a altura de trabalho cómoda, reduzindo o esforço do operador.",
    cards: [
      {
        image: "/assets/images/real/image10.jpeg",
        imageAlt: "Porta-paletes de alta elevação Noblelift",
        title: "Porta-paletes de Alta Elevação",
        description: "Sistema hidráulico de tesoura. Eleva cargas até nível ergonómico de trabalho — ideal para operações de picking e embalagem.",
      },
      {
        image: "/assets/images/real/image20.jpeg",
        imageAlt: "Mesa elevatória Noblelift",
        title: "Operação Ergonómica",
        description: "Reduz lesões e cansaço dos operadores ao trazer a carga à altura ideal de trabalho.",
      },
    ],
  },
  {
    id: "plataformas",
    indexLabel: "Categoria 5 de 5",
    icon: "fas fa-arrows-up-down",
    caption: "trabalhos em altura",
    navTitle: "Plataformas",
    title: "Plataformas Elevatórias",
    description:
      "Plataformas elevatórias de tesoura Noblelift para trabalhos em altura com segurança — manutenção industrial, instalação eléctrica, montagem de prateleiras e operações em armazéns de grande pé-direito.",
    cards: [
      {
        image: "/assets/images/real/image4.jpeg",
        imageAlt: "Plataforma elevatória Noblelift",
        title: "Plataforma de Tesoura",
        description: "Diferentes alturas de trabalho disponíveis. Operação eléctrica silenciosa, ideal para uso interior.",
      },
      {
        image: "/assets/images/real/image11.jpeg",
        imageAlt: "Plataformas no showroom Noblelift",
        title: "Soluções Personalizadas",
        description: "Avaliamos a sua necessidade e indicamos o modelo certo. Consulte-nos para projetos específicos.",
      },
    ],
  },
];
