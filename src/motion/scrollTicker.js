const subscribers = new Set();

/**
 * Called once per frame from motion/lenis.js's existing raf loop —
 * this file must NEVER call requestAnimationFrame itself. Doing so
 * creates a second, independent, permanently-running per-frame loop
 * alongside Lenis's own — two unconditional loops competing for the
 * same 16ms frame budget during active scrolling, a real and
 * measurable cause of scroll stutter, not a style preference.
 */
export function tick() {
  const scrollY = window.scrollY;
  subscribers.forEach((fn) => fn(scrollY));
}

export function onScrollY(callback) {
  subscribers.add(callback);
  callback(window.scrollY);
  return () => subscribers.delete(callback);
}
