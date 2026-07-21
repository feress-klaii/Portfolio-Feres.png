/* eslint-disable react-refresh/only-export-components -- context + hook pair is intentional */
import { createContext, useContext, useRef, useState, useCallback } from "react";
import { animate } from "animejs";
import { getLenis } from "./lenis";

const ViewCtx = createContext(null);

const SPIN_OUT_MS = 340;
const SPIN_IN_MS = 380;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { duration: 1.1 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Owns which "page" is showing (`{ name, id }`) and the stage element
 * everything renders inside. navigate() runs a fast spin-out on the
 * current content, swaps the view at the midpoint (content is fully
 * blurred/rotated away, so the swap is invisible), then spins the new
 * content in. No router, no URL change — this is a single page that
 * changes what it's showing.
 *
 * Pass `{ anchor: 'some-id' }` to scroll to an element within the new
 * view once the spin-in finishes (e.g. landing on the Works page
 * already scrolled to its Collections section).
 */
export function ViewProvider({ renderView, children }) {
  const [view, setView] = useState({ name: "landing", id: null });
  const stageRef = useRef(null);
  const busyRef = useRef(false);

  const navigate = useCallback((name, id = null, opts = {}) => {
    if (busyRef.current) return;
    const { anchor } = opts;
    const el = stageRef.current;
    if (!el) {
      setView({ name, id });
      return;
    }

    busyRef.current = true;

    animate(el, {
      rotate: [0, -16],
      scale: [1, 0.86],
      filter: ["blur(0px)", "blur(18px)"],
      opacity: [1, 0.35],
      duration: SPIN_OUT_MS,
      ease: "inExpo",
      onComplete: () => {
        setView({ name, id });
        window.scrollTo(0, 0);
        // starting state for the spin-in, applied before paint
        el.style.transform = "rotate(16deg) scale(0.86)";
        el.style.filter = "blur(18px)";
        el.style.opacity = "0.35";

        requestAnimationFrame(() => {
          animate(el, {
            rotate: [16, 0],
            scale: [0.86, 1],
            filter: ["blur(18px)", "blur(0px)"],
            opacity: [0.35, 1],
            duration: SPIN_IN_MS,
            ease: "outExpo",
            onComplete: () => {
              busyRef.current = false;
              if (anchor) {
                // give the new view a frame to lay out before measuring it
                requestAnimationFrame(() => scrollToId(anchor));
              }
            },
          });
        });
      },
    });
  }, []);

  /**
   * Same spin-out/spin-in sequence as navigate(), but for staying on
   * the current view and scrolling to an in-page anchor instead of
   * swapping which page renders. Used by every same-page nav trigger
   * (top nav links, the Explore list's Home/About items) so *every*
   * navigation action on the site — page swap or in-page scroll —
   * shares the identical transition.
   */
  const goToSection = useCallback((id) => {
    if (busyRef.current) return;
    const el = stageRef.current;
    if (!el) {
      scrollToId(id);
      return;
    }

    busyRef.current = true;

    animate(el, {
      rotate: [0, -16],
      scale: [1, 0.86],
      filter: ["blur(0px)", "blur(18px)"],
      opacity: [1, 0.35],
      duration: SPIN_OUT_MS,
      ease: "inExpo",
      onComplete: () => {
        scrollToId(id);
        el.style.transform = "rotate(16deg) scale(0.86)";
        el.style.filter = "blur(18px)";
        el.style.opacity = "0.35";

        requestAnimationFrame(() => {
          animate(el, {
            rotate: [16, 0],
            scale: [0.86, 1],
            filter: ["blur(18px)", "blur(0px)"],
            opacity: [0.35, 1],
            duration: SPIN_IN_MS,
            ease: "outExpo",
            onComplete: () => {
              busyRef.current = false;
            },
          });
        });
      },
    });
  }, []);

  return (
    <ViewCtx.Provider value={{ view, navigate, scrollToId, goToSection }}>
      <div ref={stageRef} className="view-stage">
        {renderView(view)}
      </div>
      {children}
    </ViewCtx.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewCtx);
  if (!ctx) throw new Error("useView must be used inside ViewProvider");
  return ctx;
}
