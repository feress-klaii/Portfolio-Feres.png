import "./ChromeRing.css";

/**
 * A thin ring rendered in the chrome material. Prop-driven so it
 * can be reused/repositioned across scenes rather than being a
 * one-off fixed decoration.
 */
function ChromeRing({ size = 200, top = "10%", left = "10%", duration = 30, reverse = false }) {
  return (
    <div
      className="chrome-ring"
      style={{
        width: size,
        height: size,
        top,
        left,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <div className="chrome-ring-inner chrome"></div>
    </div>
  );
}

export default ChromeRing;