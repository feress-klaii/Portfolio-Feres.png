import { onScrollY } from "./scrollTicker";

const IDLE_SPEED = 0.028; // px/ms drift when the page is still
const VELOCITY_GAIN = 0.9; // how strongly scroll speed boosts the slide
const MAX_SPEED = 3.2; // px/ms hard cap so a huge scroll jump can't teleport it

let offset = 0;
let lastScrollY = null;
let lastTime = null;
const subscribers = new Set();

onScrollY((scrollY) => {
  const now = performance.now();
  if (lastTime == null) {
    lastTime = now;
    lastScrollY = scrollY;
    return;
  }
  const dt = Math.max(now - lastTime, 1);
  const velocity = Math.abs(scrollY - lastScrollY) / dt; // px/ms of page scroll
  lastTime = now;
  lastScrollY = scrollY;

  const speed = Math.min(IDLE_SPEED + velocity * VELOCITY_GAIN, MAX_SPEED);
  offset += speed * dt;
  subscribers.forEach((fn) => fn(offset));
});

/** Subscribe to the shared chain offset, advanced every real scroll frame. */
export function onChainOffset(callback) {
  subscribers.add(callback);
  callback(offset);
  return () => subscribers.delete(callback);
}
