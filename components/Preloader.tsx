"use client";

import { useEffect, useState } from "react";

// LOADING SCREEN — fade out shortly after the app mounts, then unmount.
// (The original waited for window "load", but that waits on every image + the
// map iframe and could appear to hang; the theme CSS is render-blocking so
// there's nothing to guard against by waiting longer.)
export default function Preloader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 300);
    const goneTimer = setTimeout(() => setGone(true), 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="preloader"
      style={{ opacity: fading ? 0 : 1, transition: "opacity .5s ease" }}
    >
      <div className="loader-spinner">
        <div>
          <div /><div /><div /><div /><div /><div /><div /><div />
        </div>
      </div>
    </div>
  );
}
