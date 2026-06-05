import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import PageTitle from "@/components/PageTitle";
import Gallery from "@/components/Gallery";
import { getGalleryImages, getSiteConfig } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria fotográfica do showroom Noblelift Angola — fotos reais dos nossos equipamentos e instalações em Luanda.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Noblelift Angola",
    title: "Galeria Noblelift Angola",
    description:
      "Fotos reais do showroom Noblelift Angola, equipamentos disponiveis e instalacoes em Luanda.",
    url: "https://www.nobliftangola.com/galeria",
    images: [
      {
        url: "/assets/images/real/image9.jpeg",
        alt: "Galeria do showroom Noblelift Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeria Noblelift Angola",
    description:
      "Fotos reais dos equipamentos e instalacoes Noblelift Angola em Luanda.",
    images: ["/assets/images/real/image9.jpeg"],
  },
};

const styles = `
  .thumb-icon { font-size: 2.5rem; color: #e74d17; margin-bottom: 1rem; }

  .gallery-section { padding: 70px 0; background: #f7f7f7; }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-auto-rows: 220px;
    grid-auto-flow: dense;
    gap: 14px;
  }
  .gallery-item {
    overflow: hidden;
    border-radius: 6px;
    position: relative;
    cursor: zoom-in;
    background: #ddd;
  }
  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .35s ease;
  }
  .gallery-item:hover img { transform: scale(1.04); }
  .gallery-item.tall { grid-row: span 2; }
  .gallery-item.wide { grid-column: span 2; }
  .gallery-item.tall img,
  .gallery-item.wide img { height: 100%; }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%);
    opacity: 0;
    transition: opacity .25s ease;
    display: flex;
    align-items: flex-end;
    padding: 16px 18px;
    color: #fff;
    font-weight: 500;
    font-size: 0.95rem;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }

  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.92);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  }
  .lightbox.open { display: flex; }
  .lightbox img {
    max-width: 95vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 4px;
  }
  .lightbox-close {
    position: absolute;
    top: 18px;
    right: 22px;
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
  }
  .lightbox-prev, .lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.12);
    border: 0;
    color: #fff;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .lightbox-prev { left: 18px; }
  .lightbox-next { right: 18px; }
  .lightbox-prev:hover, .lightbox-next:hover { background: rgba(255,255,255,0.25); }
  @media (max-width: 600px) {
    .gallery-grid { grid-auto-rows: 180px; gap: 10px; }
  }
`;

export default async function GaleriaPage() {
  const [images, site] = await Promise.all([getGalleryImages(), getSiteConfig()]);
  const pageJsonLd = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Galeria", path: "/galeria" },
  ]);

  return (
    <>
      <style href="galeria-extra" precedence="default" dangerouslySetInnerHTML={{ __html: styles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />

      <PageTitle
        image="/assets/images/real/image9.jpeg"
        imageAlt="Showroom Noblelift Angola"
        subtitle="Fotos reais — sem retoques"
        title="Galeria do Showroom"
        crumb="Galeria"
      />

      <section className="gallery-section">
        <div className="container">
          <div className="heading text-center mb-5">
            <p className="heading-subtitle">{images.length} fotografias do nosso showroom em Luanda</p>
            <h2 className="heading-title">Conheça os nossos equipamentos.</h2>
            <p>
              Todas as imagens são reais, tiradas no nosso showroom na Paragem da Mutamba. Clique em
              qualquer fotografia para ampliar.
            </p>
          </div>

          <Gallery images={images} />

          <div className="text-center mt-5">
            <SmartLink className="btn btn--primary" href="/contato#orcamento">
              <i className="fas fa-file-invoice-dollar" /> Pedir Orçamento
            </SmartLink>
            <SmartLink className="btn btn--secondary ml-2" href={site.catalogPdf} download>
              <i className="fas fa-download" /> Baixar Catálogo Completo
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}
