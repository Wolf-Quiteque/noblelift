import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import { getSiteConfig } from "@/lib/data";

// SEO defaults shared by the public site (the admin overrides its own titles).
export const metadata: Metadata = {
  keywords: [
    "Noblelift Angola",
    "empilhadeira eléctrica Luanda",
    "porta-paletes Angola",
    "mesa elevatória",
    "empilhadores",
    "plataforma elevatória",
    "equipamento logístico Angola",
    "movimentação de cargas Luanda",
    "Paragem da Mutamba",
  ],
  authors: [{ name: "Noblelift Angola" }],
  robots: "index, follow",
  other: {
    "geo.region": "AO-LUA",
    "geo.placename": "Luanda, Angola",
  },
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteConfig();

  return (
    <>
      {/* Icon fonts + Google Fonts (CDN, same as the original site).
          React 19 hoists these <link>s to <head>; they load only on site routes. */}
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" precedence="default" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        precedence="default"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com/" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Rubik:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      {/* Theme styles — vendor first, then theme overrides (order matters) */}
      <link href="/assets/css/vendor.min.css" rel="stylesheet" precedence="default" />
      <link href="/assets/css/style.css" rel="stylesheet" precedence="default" />

      <Preloader />
      <div className="wrapper clearfix" id="wrapperParallax">
        <Header site={site} />
        {children}
        <Footer site={site} />
        <BackToTop />
      </div>

      {/* jQuery + theme vendor bundle (owl carousel, niceSelect). afterInteractive
          because beforeInteractive is only valid in the root layout; the
          withJQuery() poll in the interactive components tolerates the later load. */}
      <Script src="/assets/js/vendor/jquery-3.4.1.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/vendor.min.js" strategy="afterInteractive" />
    </>
  );
}
