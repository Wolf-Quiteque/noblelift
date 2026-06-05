"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/types";

// Home "Map / Location" section with the accordion card (bootstrap collapse
// reimplemented as controlled React state).
export default function HomeMap({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="map map-3" id="map-1">
      <iframe
        className="map-gray"
        src={site.mapEmbedSrc}
        width={600}
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Localização Noblelift Angola"
      />

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="accordion accordion-4" id="accordion01">
              <h4 className="panel">Localização Angola</h4>

              <div className={`card${open ? " active-acc" : ""}`}>
                <div className="card-heading">
                  <a
                    className={`card-link${open ? "" : " collapsed"}`}
                    href="#collapse01-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen((v) => !v);
                    }}
                  >
                    Showroom Luanda
                  </a>
                </div>
                <div className={`collapse${open ? " show" : ""}`} id="collapse01-1">
                  <div className="card-body">
                    <ul className="list-unstyled info">
                      <li>
                        <span className="fas fa-map-marker-alt" />
                        <a href={site.mapsLink} target="_blank" rel="noopener">
                          {site.address}
                        </a>
                      </li>
                      <li>
                        <span className="fas fa-envelope" />
                        <a href={`mailto:${site.email}`}>{site.email}</a>
                      </li>
                      <li>
                        <span className="fas fa-phone-alt" />
                        <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
