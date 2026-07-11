import { useEffect } from "react";
import { getLenis } from "./lenis";

/**
 * Subscribes a callback to Lenis's scroll event. The callback
 * receives Lenis's event object ({ scroll, velocity, ... }) every
 * frame Lenis updates — this is the base primitive other scroll-
 * driven hooks build on.
 */
export default function useLenisScroll(callback) {
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    lenis.on("scroll", callback);
    return () => lenis.off("scroll", callback);
  }, [callback]);
}