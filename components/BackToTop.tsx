"use client";

import { useEffect, useState } from "react";

// BACK TO TOP — show after 200px, smooth-scroll to top (mirrors functions.js).
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`backtop${show ? " show" : ""}`}
      id="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fas fa-chevron-up" />
    </div>
  );
}
