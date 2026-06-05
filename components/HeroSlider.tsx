"use client";

import { useEffect, useRef } from "react";
import SmartLink from "@/components/SmartLink";
import Multiline from "@/components/Multiline";
import { withJQuery } from "@/lib/jquery";
import type { Slide } from "@/lib/types";

// Hero owl-carousel. Initializes the original theme's owl-carousel on mount and
// destroys it on unmount so it re-initializes cleanly across client navigation.
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cancel = withJQuery((jq) => {
      const $car = jq(el) as any;
      if (typeof $car.owlCarousel !== "function") return;
      $car.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        margin: 0,
        nav: true,
        dots: true,
        smartSpeed: 800,
        animateOut: "fadeOut",
      });
    });

    return () => {
      cancel();
      const w = window as any;
      if (w.jQuery && el) {
        const $car = w.jQuery(el);
        try {
          $car.trigger("destroy.owl.carousel");
          $car.removeClass("owl-loaded owl-hidden");
          $car.find(".owl-stage-outer").children().unwrap();
        } catch {
          /* no-op */
        }
      }
    };
  }, [slides]);

  return (
    <section className="slider slider-1" id="slider-1">
      <div className="container-fluid pr-0 pl-0">
        <div
          ref={ref}
          className="carousel owl-carousel custom-carousel carousel-navs carousel-dots"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="slide d-flex align-items-center bg-overlay bg-overlay-dark bg-section"
              role="img"
              aria-label={slide.imageAlt}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-7">
                    <div className="slide-content">
                      {slide.subheadline && (
                        <p className="slide-subheadline">{slide.subheadline}</p>
                      )}
                      {slide.isPrimary ? (
                        <h1 className="slide-headline">
                          <Multiline text={slide.headline} />
                        </h1>
                      ) : (
                        <h2 className="slide-headline">
                          <Multiline text={slide.headline} />
                        </h2>
                      )}
                      <p className="slide-desc">{slide.description}</p>
                      <div className="slide-buttons">
                        {slide.buttons.map((btn) => (
                          <SmartLink
                            key={btn.label}
                            className={`btn btn--${btn.variant}`}
                            href={btn.href}
                            download={btn.download}
                          >
                            {btn.label}
                          </SmartLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
