import "./GlassPrism.css";

/**
 * A glass-material prism (pentagon clip-path), slowly rotating and
 * floating. `rotate` sets the resting angle; the animation adds a
 * gentle wobble on top of it.
 */
function GlassPrism({ size = 140, top = "20%", left = "70%", rotate = 20, duration = 12 }) {
  return (
    <div
      className="glass-prism glass"
      style={{
        width: size,
        height: size,
        top,
        left,
        "--rotate": `${rotate}deg`,
        animationDuration: `${duration}s`,
      }}
    ></div>
  );
}

export default GlassPrism;