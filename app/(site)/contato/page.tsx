import type { Metadata } from "next";
import { Fragment } from "react";
import SmartLink from "@/components/SmartLink";
import PageTitle from "@/components/PageTitle";
import ContactForm from "@/components/ContactForm";
import { getSiteConfig } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Contacte a Noblelift Angola — telefone, email, morada e formulário de pedido de orçamento. Showroom em Luanda.",
  alternates: { canonical: "/contato" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Noblelift Angola",
    title: "Contato Noblelift Angola",
    description:
      "Telefone, email, morada, mapa e pedido de orcamento para equipamentos Noblelift em Luanda.",
    url: "https://www.nobliftangola.com/contato",
    images: [
      {
        url: "/assets/images/real/company_location_front.jpeg",
        alt: "Entrada do showroom Noblelift Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato Noblelift Angola",
    description:
      "Contacte o showroom Noblelift Angola em Luanda para orcamentos e suporte.",
    images: ["/assets/images/real/company_location_front.jpeg"],
  },
};

const styles = `
  .thumb-icon { font-size: 2.5rem; color: #e74d17; margin-bottom: 1rem; }
  .icon, .feature-icon i, .icon-panel i { font-size: 2.2rem; color: #e74d17; margin-bottom: 0.75rem; }

  .contact-info-card {
    background: #fff;
    padding: 30px 28px;
    border-radius: 8px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.06);
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
  }
  .contact-info-card i {
    font-size: 1.6rem;
    color: #e74d17;
    margin-top: 4px;
  }
  .contact-info-card h5 { margin: 0 0 6px; font-size: 1rem; }
  .contact-info-card p, .contact-info-card a { margin: 0; color: #444; line-height: 1.55; }
  .contact-info-card a:hover { color: #e74d17; }

  .quote-form-wrap {
    background: #fff;
    padding: 36px 30px;
    border-radius: 8px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.06);
  }

  #map-container iframe { width: 100%; height: 420px; border: 0; display: block; }
`;

export default async function ContatoPage() {
  const site = await getSiteConfig();
  const pageJsonLd = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Contato", path: "/contato" },
  ]);

  return (
    <>
      <style href="contato-extra" precedence="default" dangerouslySetInnerHTML={{ __html: styles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />

      <PageTitle
        image="/assets/images/real/company_location_front.jpeg"
        imageAlt="Showroom Noblelift Angola"
        subtitle="Estamos disponíveis para o ajudar"
        title="Fale Connosco"
        crumb="Contato"
      />

      {/* Contact Info + Form */}
      <section className="contact-section pt-70 pb-70" style={{ background: "#f7f7f7" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="heading heading-3">
                <p className="heading-subtitle">Como nos encontrar</p>
                <h2 className="heading-title">Showroom Luanda</h2>
                <p>
                  Visite-nos, telefone ou envie-nos um email — a nossa equipa responde em português,
                  em horário comercial.
                </p>
              </div>

              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt" />
                <div>
                  <h5>Morada</h5>
                  <p>
                    <a href={site.mapsLink} target="_blank" rel="noopener">
                      {site.address}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <i className="fas fa-phone-alt" />
                <div>
                  <h5>Telefone</h5>
                  <p>
                    <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <i className="fas fa-envelope" />
                <div>
                  <h5>Email</h5>
                  <p>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <i className="fas fa-clock" />
                <div>
                  <h5>Horário</h5>
                  <p>
                    {site.hours.map((h, i) => (
                      <Fragment key={i}>
                        {h}
                        {i < site.hours.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="quote-form-wrap" id="orcamento">
                <div className="heading heading-3 mb-4">
                  <p className="heading-subtitle">Pedido de orçamento</p>
                  <h2 className="heading-title">Envie-nos a sua questão</h2>
                  <p>
                    Preencha o formulário e entraremos em contacto consigo o mais rapidamente
                    possível. Pode também enviar email directo para{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                </div>

                <ContactForm email={site.email} />

                <div className="text-center mt-4">
                  <SmartLink className="btn btn--secondary" href={site.catalogPdf} download>
                    <i className="fas fa-download" /> Baixar Catálogo Noblelift 2026
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map-container">
        <iframe
          src={site.mapEmbedSrc}
          allowFullScreen
          loading="lazy"
          title="Localização Noblelift Angola"
        />
      </section>
    </>
  );
}
