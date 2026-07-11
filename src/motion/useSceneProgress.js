import { useEffect, useRef, useCallback } from "react";
import { onScrollY } from "./scrollTicker";

/**
 * Scroll is the timeline: onProgress is called every real animation
 * frame with a continuous 0-1 value representing how far scrolled
 * through `targetRef`'s element the viewport currently is. Scrolling
 * up naturally reverses the value — there is no one-shot trigger here.
 *
 * Driven by the real window.scrollY (see motion/scrollTicker.js), not
 * Lenis's internal `scroll` event — the same single source of truth
 * everything else on the page renders from, so this can never drift
 * out of sync with what's on screen.
 *
 * onProgress should write directly to the DOM (style.transform,
 * style.opacity, etc.) rather than calling setState, to avoid a
 * React re-render on every scroll frame.
 */
export default function useSceneProgress(targetRef, onProgress) {
  const topRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (targetRef.current) {
        topRef.current = targetRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [targetRef]);

  const handle = useCallback(
    (scrollY) => {
      const el = targetRef.current;
      if (!el) return;
      const height = el.offsetHeight - window.innerHeight;
      if (height <= 0) return;
      let progress = (scrollY - topRef.current) / height;
      progress = Math.min(1, Math.max(0, progress));
      onProgress(progress);
    },
    [targetRef, onProgress]
  );

  useEffect(() => onScrollY(handle), [handle]);
}
