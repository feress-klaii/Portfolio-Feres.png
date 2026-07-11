import Lenis from "lenis";

let lenis = null;

function start() {
  if (typeof window === "undefined" || lenis) return;

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Starts immediately on first import — components can rely on
// getLenis() being ready without caring about mount order.
start();

export function getLenis() {
  return lenis;
}
