import SmartLink from "@/components/SmartLink";
import type { ActionPanel } from "@/lib/types";

// The two overlapping image panels used at the bottom of the home CTA and the
// "sobre" showroom section. The original <div class="bg-section"><img/></div> is
// flattened onto .action-panel-img (matches functions.js behaviour).
export default function ActionPanels({ panels }: { panels: ActionPanel[] }) {
  return (
    <div className="action-panels">
      <div className="row no-gutters">
        {panels.map((p) => (
          <div className="col-12 col-lg-6" key={p.title}>
            <div className="action-panel">
              <div
                className="action-panel-img bg-section"
                role="img"
                aria-label={p.imageAlt}
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className={`action-panel-content${p.inverted ? " inverted" : ""}`}>
                <div className="panel-icon">
                  <i className={p.icon} />
                </div>
                <div className="panel-heading">
                  <h3>{p.title}</h3>
                </div>
                <SmartLink href={p.href}>
                  <i className="icon-arrow-right" />
                </SmartLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
