/**
 * Gentle accel/decel, no linear movement, no bounce — per the
 * "premium easing" rule. Shared here so every scroll-linked
 * animation in the app uses the same curve rather than each
 * component defining its own.
 */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
