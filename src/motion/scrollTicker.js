const subscribers = new Set();
let rafId = null;

function tick() {
  const scrollY = window.scrollY;
  subscribers.forEach((fn) => fn(scrollY));
  rafId = requestAnimationFrame(tick);
}

function ensureRunning() {
  if (rafId == null && typeof window !== "undefined") {
    rafId = requestAnimationFrame(tick);
  }
}

/**
 * Subscribe to the real, currently-committed window.scrollY on every
 * animation frame. This is intentionally NOT Lenis's own `scroll`
 * event — that fires on Lenis's internal easing tick, which can
 * momentarily disagree with what the browser has actually painted
 * (Lenis is still driving toward it). Reading window.scrollY directly
 * guarantees whatever moves in response is always exactly in sync
 * with the page the user is looking at — no drift, no snap-correct.
 */
export function onScrollY(callback) {
  ensureRunning();
  subscribers.add(callback);
  callback(window.scrollY);
  return () => subscribers.delete(callback);
}
