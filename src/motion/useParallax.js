import { useEffect } from "react";

/**
 * Applies mouse-driven parallax directly to targetRef's element via
 * style.transform, rather than returning position state (which
 * would re-render the consuming component on every mousemove).
 * `strength` controls how many px the element travels at full
 * cursor displacement — pass different values to different elements
 * for a layered depth effect.
 */
export default function useParallax(targetRef, strength = 20) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [targetRef, strength]);
}