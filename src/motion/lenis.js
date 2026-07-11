import Lenis from "@studio-freight/lenis";

let lenis;
let rafId;

function animate(time) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(animate);
}

export function initLenis() {

    if (lenis) return lenis;

    lenis = new Lenis({
        duration:1.15,
        smoothWheel:true,
        smoothTouch:false,
        wheelMultiplier:1,
        touchMultiplier:1
    });

    rafId = requestAnimationFrame(animate);

    return lenis;
}

export function getLenis() {
    return lenis;
}

export function destroyLenis(){

    if(!lenis) return;

    cancelAnimationFrame(rafId);

    lenis.destroy();

    lenis=null;
}