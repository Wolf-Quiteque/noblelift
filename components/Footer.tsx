import SmartLink from "@/components/SmartLink";
import type { SiteConfig, NavLink } from "@/lib/types";

// Footer "Produtos" links are derived from the nav dropdown; "Site" links from
// the top-level nav (minus the catalogue, which is shown explicitly).
export default function Footer({ site }: { site: SiteConfig }) {
  const productsItem = site.nav.find((n) => n.children);
  const productLinks: NavLink[] = productsItem?.children ?? [];

  return (
    <footer className="footer footer-1">
      <div className="footer-center">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 footer-widget widget-about">
              <div className="footer-logo mb-3">
                <img src={site.logo} alt={site.brand} style={{ borderRadius: 12, maxWidth: 160 }} />
              </div>
              <div className="widget-content">
                <p>{site.footerAbout}</p>
                <div className="module module-social">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      className={`share-${s.label.toLowerCase()}`}
                      href={s.href}
                      aria-label={s.label}
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-2 offset-lg-1 footer-widget widget-links">
              <div className="footer-widget-title">
                <h5>Produtos</h5>
              </div>
              <div className="widget-content">
                <ul>
                  {productLinks.map((l) => (
                    <li key={l.href}>
                      <SmartLink href={l.href}>{l.label}</SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-3 footer-widget widget-links">
              <div className="footer-widget-title">
                <h5>Site</h5>
              </div>
              <div className="widget-content">
                <ul>
                  <li><SmartLink href="/">Início</SmartLink></li>
                  <li><SmartLink href="/sobre">Empresa</SmartLink></li>
                  <li><SmartLink href="/produtos">Produtos</SmartLink></li>
                  <li><SmartLink href="/galeria">Galeria</SmartLink></li>
                  <li><SmartLink href={site.catalogPdf} download>Catálogo 2026</SmartLink></li>
                  <li><SmartLink href="/contato">Contato</SmartLink></li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-3 footer-widget widget-contact">
              <div className="footer-widget-title">
                <h5>Contato</h5>
              </div>
              <div className="widget-content">
                <p>Tem dúvidas ou precisa de ajuda? Fale com a nossa equipa.</p>
                <ul>
                  <li className="phone">
                    <a href={`tel:${site.phoneHref}`}>
                      <i className="fas fa-phone-alt" /> {site.phone}
                    </a>
                  </li>
                  <li className="address">
                    <a href={site.mapsLink} target="_blank" rel="noopener">
                      <i className="fas fa-map-marker-alt" /> {site.addressShort}
                    </a>
                  </li>
                  <li className="email">
                    <a href={`mailto:${site.email}`}>
                      <i className="fas fa-envelope" /> {site.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="row">
          <div className="col-md-12 text--center footer-copyright">
            <div className="copyright">
              <span>&copy; 2026 {site.brand}. Todos os direitos reservados.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
