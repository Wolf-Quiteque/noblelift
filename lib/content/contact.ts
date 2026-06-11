import type { ContactContent } from "@/lib/types";

export const contact: ContactContent = {
  hero: {
    image: "/assets/images/real/company_location_front.jpeg",
    imageAlt: "Showroom Noblelift Angola",
    subtitle: "Estamos disponíveis para o ajudar",
    title: "Fale Connosco",
    crumb: "Contato",
  },
  info: {
    subtitle: "Como nos encontrar",
    title: "Showroom Luanda",
    description:
      "Visite-nos, telefone ou envie-nos um email - a nossa equipa responde em português, em horário comercial.",
    cards: [
      { icon: "fas fa-map-marker-alt", title: "Morada", kind: "address" },
      { icon: "fas fa-phone-alt", title: "Telefone", kind: "phone" },
      { icon: "fas fa-envelope", title: "Email", kind: "email" },
      { icon: "fas fa-clock", title: "Horário", kind: "hours" },
    ],
  },
  form: {
    subtitle: "Pedido de orçamento",
    title: "Envie-nos a sua questão",
    description:
      "Preencha o formulário e entraremos em contacto consigo o mais rapidamente possível. Pode também enviar email directo para",
    downloadLabel: "Baixar Catálogo Noblelift 2026",
  },
  mapTitle: "Localização Noblelift Angola",
};
