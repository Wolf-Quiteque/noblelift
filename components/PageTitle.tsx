import Link from "next/link";

// Inner-page hero band. The original used <div class="bg-section"><img/></div>
// which functions.js converts into a background-image on the parent section;
// here we apply that result directly.
export default function PageTitle({
  image,
  imageAlt,
  subtitle,
  title,
  crumb,
}: {
  image: string;
  imageAlt: string;
  subtitle: string;
  title: string;
  crumb: string;
}) {
  return (
    <section
      className="page-title page-title-4 bg-overlay bg-overlay-dark bg-parallax bg-section"
      id="page-title"
      role="img"
      aria-label={imageAlt}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="title text-lg-left">
              <div className="title-sub-heading">
                <p>{subtitle}</p>
              </div>
              <div className="title-heading">
                <h1>{title}</h1>
              </div>
              <div className="clearfix" />
              <ol className="breadcrumb justify-content-lg-start">
                <li className="breadcrumb-item">
                  <Link href="/">Início</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {crumb}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
