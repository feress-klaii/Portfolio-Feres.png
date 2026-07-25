import Lenis from "lenis";
import { tick as tickScroll } from "./scrollTicker";

let lenis = null;

function start() {
  if (typeof window === "undefined" || lenis) return;

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    // Lenis's default (autoResize: true) watches the whole document
    // with a ResizeObserver and recalculates scroll bounds the
    // instant content size changes — including images settling into
    // their final rendered size as they load, even ones with
    // reserved aspect-ratio boxes. If that recalculation happens
    // WHILE the user is actively mid-scroll, Lenis visibly corrects
    // itself: exactly a "pause, then jump forward". Disabling this
    // and only resizing on real window resize (below) removes that
    // trigger entirely.
    autoResize: false,
  });

  function raf(time) {
    lenis.raf(time);
    tickScroll();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // The only legitimate reason to recompute scroll bounds — an
  // actual viewport resize, not content settling mid-scroll.
  // Debounced so rapid resize events don't spam recalculation.
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => lenis.resize(), 150);
  });
}

// Starts immediately on first import — components can rely on
// getLenis() being ready without caring about mount order.
start();

export function getLenis() {
  return lenis;
}
