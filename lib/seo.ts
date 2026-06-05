import type { ProductCategory } from "@/lib/types";

export const siteUrl = "https://www.nobliftangola.com";
export const siteName = "Noblelift Angola";
export const defaultOgImage = "/assets/images/real/company_location_front.jpeg";

export const publicRoutes = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/produtos",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/contato",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/sobre",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/galeria",
    priority: 0.6,
    changeFrequency: "monthly" as const,
  },
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl("/assets/images/logo/nobelift.png"),
  email: "txtailai@yeah.net",
  telephone: "+244928283666",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Paragem da Mutamba, via expresse",
    addressLocality: "Luanda",
    addressCountry: "AO",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "pt-AO",
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteName,
  image: absoluteUrl(defaultOgImage),
  url: siteUrl,
  telephone: "+244928283666",
  email: "txtailai@yeah.net",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Paragem da Mutamba, via expresse",
    addressLocality: "Luanda",
    addressCountry: "AO",
  },
  openingHours: ["Mo-Fr 08:00-17:00", "Sa 08:00-13:00"],
  description:
    "Representante oficial Noblelift em Angola. Empilhadeiras electricas, porta-paletes, empilhadores, mesas elevatorias e plataformas elevatorias. Showroom em Luanda.",
};

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productCollectionJsonLd(products: ProductCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Produtos Noblelift Angola",
    url: absoluteUrl("/produtos"),
    inLanguage: "pt-AO",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/produtos#${category.id}`),
        name: category.title,
        description: category.description,
      })),
    },
  };
}
