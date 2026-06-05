// Helper to run code once window.jQuery (loaded via next/script) is available.
// jQuery is loaded beforeInteractive, so it is normally ready on mount, but we
// poll briefly to be safe.
type JQ = (selector: unknown) => any;

export function withJQuery(cb: (jq: JQ) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const w = window as unknown as { jQuery?: JQ };
  let cancelled = false;
  let tries = 0;

  const run = () => {
    if (cancelled) return;
    if (w.jQuery) {
      cb(w.jQuery);
    } else if (tries++ < 120) {
      setTimeout(run, 40);
    }
  };
  run();

  return () => {
    cancelled = true;
  };
}
