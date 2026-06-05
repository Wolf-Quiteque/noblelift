import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import PageTitle from "@/components/PageTitle";
import { getProducts, getSiteConfig } from "@/lib/data";
import { breadcrumbJsonLd, productCollectionJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo de produtos Noblelift Angola — empilhadeiras eléctricas, porta-paletes, empilhadores, mesas elevatórias e plataformas elevatórias.",
  alternates: { canonical: "/produtos" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Noblelift Angola",
    title: "Produtos Noblelift Angola",
    description:
      "Empilhadeiras electricas, porta-paletes, empilhadores, mesas elevatorias e plataformas elevatorias Noblelift em Luanda.",
    url: "https://noblelift.ao/produtos",
    images: [
      {
        url: "/assets/images/real/image16.jpeg",
        alt: "Produtos Noblelift Angola no showroom em Luanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Produtos Noblelift Angola",
    description:
      "Catalogo de empilhadeiras, porta-paletes, empilhadores, mesas elevatorias e plataformas em Angola.",
    images: ["/assets/images/real/image16.jpeg"],
  },
};

const styles = `
  .thumb-icon { font-size: 2.5rem; color: #e74d17; margin-bottom: 1rem; }
  .icon, .feature-icon i, .icon-panel i { font-size: 2.2rem; color: #e74d17; margin-bottom: 0.75rem; }
  .feature-panel:hover i { color: #111; }

  .product-section { padding: 80px 0; }
  .product-section.is-alt { background: #f7f7f7; }
  .product-section .section-anchor { display: block; position: relative; top: -90px; visibility: hidden; }
  .product-card { background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); margin-bottom: 30px; transition: transform .25s ease, box-shadow .25s ease; }
  .product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
  .product-card-img { aspect-ratio: 4/3; overflow: hidden; }
  .product-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .product-card-body { padding: 20px 22px; }
  .product-card-body h4 { margin: 0 0 8px; font-size: 1.15rem; }
  .product-card-body p { margin: 0; color: #666; font-size: 0.95rem; }
  .category-cta { margin-top: 30px; }
`;

export default async function ProdutosPage() {
  const [products, site] = await Promise.all([getProducts(), getSiteConfig()]);
  const quickNav = products.slice(0, 4);
  const pageJsonLd = [
    productCollectionJsonLd(products),
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Produtos", path: "/produtos" },
    ]),
  ];

  return (
    <>
      <style href="produtos-extra" precedence="default" dangerouslySetInnerHTML={{ __html: styles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />

      <PageTitle
        image="/assets/images/real/image16.jpeg"
        imageAlt="Showroom Noblelift"
        subtitle="Equipamentos certificados Noblelift"
        title="Os Nossos Produtos"
        crumb="Produtos"
      />

      {/* Categories quick nav */}
      <section className="services-bar">
        <div className="container">
          <div className="row no-gutters">
            {quickNav.map((cat, i) => (
              <div
                key={cat.id}
                className={`col-12 col-md-6 col-lg-3 services-bar-card${i === 0 ? " active" : ""}`}
              >
                <i className={`thumb-icon ${cat.icon}`} />
                <div className="thumb-body">
                  <p>{cat.caption}</p>
                  <h3>
                    <a href={`#${cat.id}`}>{cat.navTitle}</a>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {products.map((cat, idx) => (
        <section
          key={cat.id}
          className={`product-section${idx % 2 === 0 ? " is-alt" : ""}`}
          id={cat.id}
        >
          <span className="section-anchor" />
          <div className="container">
            <div className="heading heading-3">
              <p className="heading-subtitle">{cat.indexLabel}</p>
              <h2 className="heading-title">{cat.title}</h2>
              <p>{cat.description}</p>
            </div>
            <div className="row">
              {cat.cards.map((card, i) => (
                <div className="col-12 col-md-6 col-lg-6" key={i}>
                  <div className="product-card">
                    <div className="product-card-img">
                      <img src={card.image} alt={card.imageAlt} />
                    </div>
                    <div className="product-card-body">
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center category-cta">
              <SmartLink className="btn btn--primary" href="/contato#orcamento">
                <i className="fas fa-file-invoice-dollar" /> Pedir Orçamento
              </SmartLink>
              <SmartLink className="btn btn--secondary ml-2" href={site.catalogPdf} download>
                <i className="fas fa-download" /> Baixar Catálogo Completo
              </SmartLink>
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="cta cta-3 bg-theme">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-7">
              <div className="heading heading-2 heading-light mb-0">
                <p className="heading-subtitle">Não encontrou o que procura?</p>
                <h2 className="heading-title">Fale connosco — temos mais modelos disponíveis.</h2>
              </div>
            </div>
            <div className="col-12 col-lg-5 text-lg-right">
              <SmartLink className="btn btn--white" href="/contato#orcamento">
                Pedir Orçamento
              </SmartLink>
              <a className="btn btn--transparent btn--inverse ml-2" href={`tel:${site.phoneHref}`}>
                <i className="fas fa-phone-alt" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
