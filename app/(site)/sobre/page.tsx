import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import PageTitle from "@/components/PageTitle";
import ActionPanels from "@/components/ActionPanels";
import { getAboutContent, getSiteConfig } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Sobre a Noblelift Angola — representante oficial Noblelift, distribuição de empilhadeiras, porta-paletes e equipamentos logísticos em Luanda.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Noblelift Angola",
    title: "Sobre a Noblelift Angola",
    description:
      "Representante oficial Noblelift em Angola, com showroom em Luanda e suporte local para equipamentos logisticos.",
    url: "https://noblelift.ao/sobre",
    images: [
      {
        url: "/assets/images/real/company_location_front.jpeg",
        alt: "Showroom Noblelift Angola em Luanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre a Noblelift Angola",
    description:
      "Distribuicao Noblelift, showroom em Luanda e suporte local para equipamentos logisticos.",
    images: ["/assets/images/real/company_location_front.jpeg"],
  },
};

const styles = `
  .thumb-icon { font-size: 2.5rem; color: #e74d17; margin-bottom: 1rem; }
  .icon, .feature-icon i, .icon-panel i { font-size: 2.2rem; color: #e74d17; margin-bottom: 0.75rem; }
  .feature-panel:hover i { color: #111; }
  .cta.cta-3 .action-panels { transform: none; margin-top: 0; padding-top: 60px; }
`;

export default async function SobrePage() {
  const [about, site] = await Promise.all([getAboutContent(), getSiteConfig()]);
  const pageJsonLd = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Empresa", path: "/sobre" },
  ]);

  return (
    <>
      <style href="sobre-extra" precedence="default" dangerouslySetInnerHTML={{ __html: styles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />

      <PageTitle
        image={about.hero.image}
        imageAlt={about.hero.imageAlt}
        subtitle={about.hero.subtitle}
        title={about.hero.title}
        crumb="Empresa"
      />

      {/* About */}
      <section className="about about-4 pt-70" id="about-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="about-img about-img-left">
                <div
                  className="about-img-warp bg-overlay bg-section"
                  role="img"
                  aria-label={about.intro.imageAlt}
                  style={{ backgroundImage: `url(${about.intro.image})` }}
                />
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="heading heading-3">
                <p className="heading-subtitle">{about.intro.subtitle}</p>
                <h2 className="heading-title">{about.intro.title}</h2>
              </div>
              <div className="about-block">
                <div className="row">
                  <div className="col-12 col-lg-7">
                    <div className="block-left">
                      {about.intro.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="block-right">
                      {about.intro.details.map((d) => (
                        <div className="detail" key={d.title}>
                          <h6>{d.title}</h6>
                          <p>{d.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="signature-block">
                <div className="signature-body">
                  <h6>{about.intro.signatureTitle}</h6>
                  <p>{about.intro.signatureName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="features bg-gray" id="features-1">
        <div className="container">
          <div className="heading heading-4">
            <div className="row">
              <div className="col-12 col-lg-6">
                <p className="heading-subtitle">{about.values.subtitle}</p>
                <h2 className="heading-title">{about.values.title}</h2>
              </div>
              <div className="col-12 col-lg-6">
                <p className="heading-desc">{about.values.description}</p>
              </div>
            </div>
          </div>

          <div className="row">
            {about.values.panels.map((p) => (
              <div className="col-sm-6 col-md-6 col-lg-4" key={p.title}>
                <div className="feature-panel bg-white">
                  <div className="feature-icon">
                    <i className={p.icon} />
                  </div>
                  <div className="feature-content">
                    <i className={p.icon} />
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom panels */}
      <section className="cta cta-3 bg-theme">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="heading heading-2 heading-light">
                <p className="heading-subtitle">{about.showroom.subtitle}</p>
                <h2 className="heading-title">{about.showroom.title}</h2>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-1">
              <div className="prief-set">
                <p>{about.showroom.intro}</p>
                <ul className="advantages-list">
                  {about.showroom.advantages.map((a) => (
                    <li key={a}>
                      <i className="fas fa-check-circle" /> {a}
                    </li>
                  ))}
                </ul>
                <SmartLink className="btn btn--white mt-3" href="/contato">
                  Marcar uma visita
                </SmartLink>
                <SmartLink className="btn btn--transparent btn--inverse ml-2 mt-3" href={site.catalogPdf} download>
                  Baixar Catálogo
                </SmartLink>
              </div>
            </div>
          </div>

          <ActionPanels panels={about.showroom.panels} />
        </div>
      </section>
    </>
  );
}
