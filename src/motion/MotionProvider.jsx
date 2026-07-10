import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function MotionProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let raf;

    function frame(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}