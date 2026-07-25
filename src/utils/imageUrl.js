// Wraps an image path in Netlify's Image CDN, which resizes and
// re-compresses on request (and auto-picks AVIF/WebP per browser) —
// this is the actual fix for "images are too heavy" at the code
// level: it applies to every image automatically, including ones
// already in the repo and anything uploaded through the CMS from
// now on, with zero manual resizing ever needed again.
//
// Only external images (http/https) or images already going through
// this helper should be skipped from double-wrapping; local /images
// and /uploads paths are what this is for.
//
// Netlify Image CDN only exists once a site is actually served BY
// Netlify — in local `npm run dev` that URL 404s, so this falls back
// to the raw path during development and only applies the transform
// in production builds.

export function optimizedImage(src, { width, quality = 78 } = {}) {
  if (!src) return src;
  if (import.meta.env.DEV) return src;
  if (/^https?:\/\//.test(src)) return src; // leave external URLs alone

  const params = new URLSearchParams({ url: src, q: String(quality) });
  if (width) params.set("w", String(width));

  return `/.netlify/images?${params.toString()}`;
}
