import "./LiquidBlob.css";

/**
 * An iridescent blob whose border-radius continuously morphs
 * ("liquid" feel) while the surface color shifts (iridescent
 * material). Both animations run on the same element via
 * animation-name lists — see LiquidBlob.css.
 */
function LiquidBlob({ size = 260, top = "50%", left = "20%", duration = 10 }) {
  return (
    <div
      className="liquid-blob iridescent"
      style={{
        width: size,
        height: size,
        top,
        left,
        "--morph-duration": `${duration}s`,
      }}
    ></div>
  );
}

export default LiquidBlob;