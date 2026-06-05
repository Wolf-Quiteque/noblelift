"use client";

import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/types";

// Masonry gallery + lightbox. Reproduces the original galeria.html inline script
// (open/close, prev/next, keyboard + backdrop click) in React.
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const open = useCallback((i: number) => {
    setOpenIdx(((i % images.length) + images.length) % images.length);
  }, [images.length]);

  const shut = useCallback(() => setOpenIdx(null), []);

  useEffect(() => {
    if (openIdx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") shut();
      if (e.key === "ArrowLeft") setOpenIdx((v) => (v === null ? v : (v - 1 + images.length) % images.length));
      if (e.key === "ArrowRight") setOpenIdx((v) => (v === null ? v : (v + 1) % images.length));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [openIdx, images.length, shut]);

  const current = openIdx === null ? null : images[openIdx];

  return (
    <>
      <div className="gallery-grid" id="galleryGrid">
        {images.map((img, i) => (
          <div
            key={img.src + i}
            className={`gallery-item${img.size ? " " + img.size : ""}`}
            data-src={img.src}
            onClick={() => open(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="gallery-overlay">{img.caption}</div>
          </div>
        ))}
      </div>

      <div
        className={`lightbox${openIdx !== null ? " open" : ""}`}
        id="lightbox"
        role="dialog"
        aria-label="Visualizador de imagens"
        onClick={(e) => {
          if (e.target === e.currentTarget) shut();
        }}
      >
        <button className="lightbox-close" id="lightboxClose" aria-label="Fechar" onClick={shut}>
          &times;
        </button>
        <button
          className="lightbox-prev"
          id="lightboxPrev"
          aria-label="Anterior"
          onClick={(e) => {
            e.stopPropagation();
            open((openIdx ?? 0) - 1);
          }}
        >
          <i className="fas fa-chevron-left" />
        </button>
        {current && <img id="lightboxImg" src={current.src} alt={current.alt} />}
        <button
          className="lightbox-next"
          id="lightboxNext"
          aria-label="Próxima"
          onClick={(e) => {
            e.stopPropagation();
            open((openIdx ?? 0) + 1);
          }}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </>
  );
}
