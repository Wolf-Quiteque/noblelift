import type { Metadata, Viewport } from "next";
import {
  defaultOgImage,
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

// Minimal root layout. Public-site chrome (theme CSS, jQuery, header/footer) lives
// in app/(site)/layout.tsx; the admin has its own chrome in app/(admin). This keeps
// the two worlds fully isolated (no Tailwind on the site, no theme CSS in admin).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  title: {
    default:
      "Noblelift Angola – Empilhadeiras, Porta-paletes e Equipamentos Logísticos em Luanda",
    template: "%s — Noblelift Angola",
  },
  description:
    "Representante oficial Noblelift em Angola. Showroom em Luanda com empilhadeiras eléctricas, porta-paletes, empilhadores, mesas elevatórias e plataformas. Stock disponível e suporte técnico local.",
  icons: {
    icon: "/assets/images/favicon/favicon.png",
    apple: "/assets/images/favicon/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName,
    url: siteUrl,
    title:
      "Noblelift Angola â€“ Empilhadeiras, Porta-paletes e Equipamentos LogÃ­sticos em Luanda",
    description:
      "Representante oficial Noblelift em Angola. Showroom em Luanda com empilhadeiras elÃ©ctricas, porta-paletes, empilhadores, mesas elevatÃ³rias e plataformas.",
    images: [
      {
        url: defaultOgImage,
        alt: "Showroom Noblelift Angola em Luanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noblelift Angola â€“ Equipamentos LogÃ­sticos em Luanda",
    description:
      "Empilhadeiras elÃ©ctricas, porta-paletes, empilhadores, mesas elevatÃ³rias e plataformas com suporte local em Angola.",
    images: [defaultOgImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e74d17",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr" lang="pt-AO">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
