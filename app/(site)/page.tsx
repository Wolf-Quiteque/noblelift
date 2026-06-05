import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import Multiline from "@/components/Multiline";
import HeroSlider from "@/components/HeroSlider";
import HomeMap from "@/components/HomeMap";
import ActionPanels from "@/components/ActionPanels";
import { getHomeContent, getSiteConfig } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Noblelift Angola – Empilhadeiras, Porta-paletes e Equipamentos Logísticos em Luanda",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "Noblelift Angola",
    title:
      "Noblelift Angola – Empilhadeiras e Equipamentos Logísticos em Luanda",
    description:
      "Representante oficial Noblelift em Angola. Showroom em Luanda — empilhadeiras eléctricas, porta-paletes, empilhadores, mesas elevatórias e plataformas. Stock e suporte técnico local.",
    url: "https://www.nobliftangola.com/",
    images: [
      {
        url: "/assets/images/real/company_location_front.jpeg",
        alt: "Showroom Noblelift Angola — Paragem da Mutamba, Luanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noblelift Angola – Empilhadeiras e Equipamentos Logísticos",
    description:
      "Representante oficial Noblelift em Angola. Showroom em Luanda, stock disponível e suporte técnico local.",
    images: ["/assets/images/real/company_location_front.jpeg"],
  },
};

const homeStyles = `
  .thumb-icon { font-size: 2.5rem; color: #e74d17; margin-bottom: 1rem; }
  .services-bar-card:hover .thumb-icon { color: #000; }
  .icon, .feature-icon i, .icon-panel i { font-size: 2.2rem; color: #e74d17; margin-bottom: 0.75rem; }
  .feature-panel:hover i { color: #111; }

  .image-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
  .image-strip a { position: relative; display: block; aspect-ratio: 4/3; overflow: hidden; }
  .image-strip img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
  .image-strip a:hover img { transform: scale(1.06); }
  .image-strip .label {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.78) 100%);
    display: flex; align-items: flex-end; padding: 18px 22px;
    color: #fff; font-weight: 600; font-size: 1.05rem; letter-spacing: .3px;
  }
  .image-strip .label i { color: #e74d17; margin-right: 8px; font-size: 1rem; }
  @media (max-width: 768px) {
    .image-strip { grid-template-columns: repeat(2, 1fr); }
  }

  #features-1.features { padding-top: 80px; padding-bottom: 0; }
  .image-strip { margin: 0; padding: 0; }
  .image-strip + .cta { padding-top: 0; }
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Noblelift Angola",
  image: "https://www.nobliftangola.com/assets/images/real/company_location_front.jpeg",
  url: "https://www.nobliftangola.com/",
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
    "Representante oficial Noblelift em Angola. Empilhadeiras eléctricas, porta-paletes, empilhadores, mesas elevatórias e plataformas elevatórias. Showroom em Luanda.",
};

const pageJsonLd = [
  jsonLd,
  breadcrumbJsonLd([{ name: "Inicio", path: "/" }]),
];

export default async function HomePage() {
  const [home, site] = await Promise.all([getHomeContent(), getSiteConfig()]);

  return (
    <>
      <style href="home-extra" precedence="default" dangerouslySetInnerHTML={{ __html: homeStyles }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />

      <HeroSlider slides={home.slides} />

      {/* Services Bar */}
      <section className="services-bar" id="servicesBar">
        <div className="container">
          <div className="row no-gutters">
            {home.servicesBar.map((s, i) => (
              <div
                key={s.title}
                className={`col-12 col-md-6 col-lg-3 services-bar-card${i === 0 ? " active" : ""}`}
              >
                <i className={`thumb-icon ${s.icon}`} />
                <div className="thumb-body">
                  <p>{s.caption}</p>
                  <h3>
                    <SmartLink href={s.href}>{s.title}</SmartLink>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about pt-70" id="about-1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="about-img about-img-left">
                <div
                  className="about-img-warp bg-overlay bg-section"
                  role="img"
                  aria-label={home.about.imageAlt}
                  style={{ backgroundImage: `url(${home.about.image})` }}
                />
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="heading heading-3">
                <p className="heading-subtitle">{home.about.subtitle}</p>
                <h2 className="heading-title">{home.about.title}</h2>
              </div>
              <div className="about-block">
                <div className="row">
                  <div className="col-12 col-lg-7">
                    <div className="block-left">
                      {home.about.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="block-right">
                      {home.about.details.map((d) => (
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
                  <h6>{home.about.signatureTitle}</h6>
                  <p>{home.about.signatureName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Quote */}
      <section
        className="cta bg-overlay bg-overlay-dark2 bg-section"
        id="cta-1"
        role="img"
        aria-label={home.ctaQuote.imageAlt}
        style={{ backgroundImage: `url(${home.ctaQuote.image})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="heading heading-2 heading-light">
                <p className="heading-subtitle">{home.ctaQuote.subtitle}</p>
                <h2 className="heading-title">{home.ctaQuote.title}</h2>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="icon-set">
                {home.ctaQuote.panels.map((p) => (
                  <div className="icon-panel" key={p.label}>
                    <i className={p.icon} />
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 mt-4 text-center">
              <SmartLink className="btn btn--primary" href="/contato#orcamento">
                <i className="fas fa-file-invoice-dollar" /> Solicitar Orçamento
              </SmartLink>
              <SmartLink className="btn btn--white ml-2" href={site.catalogPdf} download>
                <i className="fas fa-download" /> Baixar Catálogo
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features bg-gray" id="features-1">
        <div className="container">
          <div className="heading heading-4">
            <div className="row">
              <div className="col-12 col-lg-6">
                <p className="heading-subtitle">{home.features.subtitle}</p>
                <h2 className="heading-title">{home.features.title}</h2>
              </div>
              <div className="col-12 col-lg-6">
                <p className="heading-desc">{home.features.description}</p>
                <div className="actions-container">
                  <SmartLink className="btn btn-transparent" href="/contato#orcamento">
                    Pedir Orçamento
                  </SmartLink>
                  <div className="employee-info">
                    <div className="employee-body">
                      <h6>
                        <a href={`tel:${site.phoneHref}`} style={{ color: "inherit" }}>
                          {site.phone}
                        </a>
                      </h6>
                      <p>Atendimento Comercial</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {home.features.panels.map((p) => (
              <div className="col-sm-6 col-md-6 col-lg-4" key={p.title}>
                <div className="feature-panel bg-white">
                  <div className="feature-icon">
                    <i className={p.icon} />
                  </div>
                  <div className="feature-content">
                    <i className={p.icon} />
                    <h4>
                      <Multiline text={p.title} />
                    </h4>
                    <p>{p.description}</p>
                    <SmartLink href={p.href}>
                      <i className="icon-arrow-right" /> saiba mais
                    </SmartLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="more-features">
            <p>
              {home.features.moreText}{" "}
              <SmartLink href={home.features.moreLinkHref}>
                {home.features.moreLinkLabel}
              </SmartLink>
            </p>
          </div>
        </div>
      </section>

      {/* Image Strip */}
      <section className="image-strip">
        {home.imageStrip.map((it) => (
          <SmartLink key={it.label} href={it.href}>
            <img src={it.image} alt={it.imageAlt} loading="lazy" />
            <span className="label">
              <i className="fas fa-arrow-right" /> {it.label}
            </span>
          </SmartLink>
        ))}
      </section>

      {/* CTA: Advantages */}
      <section className="cta cta-3 bg-theme" id="cta-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="heading heading-2 heading-light">
                <p className="heading-subtitle">{home.ctaAdvantages.subtitle}</p>
                <h2 className="heading-title">{home.ctaAdvantages.title}</h2>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-1">
              <div className="prief-set">
                <p>{home.ctaAdvantages.intro}</p>
                <ul className="advantages-list">
                  {home.ctaAdvantages.advantages.map((a) => (
                    <li key={a}>
                      <i className="fas fa-check-circle" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <ActionPanels panels={home.ctaAdvantages.panels} />
        </div>
      </section>

      {/* Map / Location */}
      <HomeMap site={site} />
    </>
  );
}
