import "./GlassOrb.css";

/**
 * A glossy iridescent/chrome liquid sphere: a morphing iridescent
 * body, a bright specular highlight to read as "glass/liquid" rather
 * than flat gradient, and a small satellite droplet underneath.
 * Replaces the earlier flat clip-path prism.
 */
function GlassOrb({ size = 220, top, left, duration = 11 }) {
  return (
    <div
      className="glass-orb"
      style={{ width: size, height: size, top, left, "--morph-duration": `${duration}s` }}
    >
      <div className="glass-orb-body iridescent"></div>
      <div className="glass-orb-highlight"></div>
      <div className="glass-orb-droplet iridescent"></div>
    </div>
  );
}

export default GlassOrb;
