import "./lenis";
 
// lenis.js self-initializes on import, so this provider's only job
// is to guarantee that import happens before children render. Kept
// as an explicit wrapper in App.jsx so it's obvious the app has
// smooth-scroll active, rather than a silent side-effect import.
export default function MotionProvider({ children }) {
  return children;
}
 