import "./GlassBlob.css";

let uid = 0;

/**
 * The glossy liquid-glass reference: an organic blob body with a
 * saturated iridescent rim, a bright specular hotspot, a smaller
 * glass sphere nested at its edge, and a couple of tiny droplets.
 * Not a flat morphing div — a real layered SVG render, pushed bold
 * enough in color/contrast to actually read against a near-black page.
 */
function GlassBlob({ size = 220, top, left, duration = 13 }) {
  const id = uid++;
  const bodyId = `blobBody-${id}`;
  const rimId = `blobRim-${id}`;
  const sphereId = `blobSphere-${id}`;
  const glowId = `blobGlow-${id}`;

  return (
    <div className="glass-blob" style={{ width: size, height: size, top, left, "--spin-duration": `${duration}s` }}>
      <svg className="glass-blob-svg" viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id={bodyId} x1="5%" y1="0%" x2="95%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="30%" stopColor="#6ee7ff" />
            <stop offset="55%" stopColor="var(--purple)" />
            <stop offset="80%" stopColor="var(--pink)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={rimId} cx="50%" cy="50%" r="55%">
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="90%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={sphereId} cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="var(--chrome-1)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--purple)" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* soft outer bloom so it reads instantly against dark bg */}
        <circle cx="100" cy="100" r="95" fill={`url(#${glowId})`} />

        {/* organic body — bold, fully opaque so the color actually pops */}
        <path
          d="M100,26 C132,22 165,42 176,73 C187,104 178,142 151,163 C124,184 84,186 55,169 C26,152 10,116 16,82 C22,48 55,31 100,26 Z"
          fill={`url(#${bodyId})`}
        />
        <path
          d="M100,26 C132,22 165,42 176,73 C187,104 178,142 151,163 C124,184 84,186 55,169 C26,152 10,116 16,82 C22,48 55,31 100,26 Z"
          fill={`url(#${rimId})`}
        />

        {/* main specular hotspot — the "glossy" tell */}
        <ellipse cx="74" cy="66" rx="28" ry="19" fill="#ffffff" opacity="0.9" filter="blur(2px)" />
        <ellipse cx="66" cy="60" rx="9" ry="6" fill="#ffffff" opacity="0.95" />

        {/* nested satellite sphere, like a bubble caught inside the glass */}
        <circle cx="122" cy="112" r="32" fill={`url(#${sphereId})`} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="110" cy="98" r="8" fill="#ffffff" opacity="0.95" />

        {/* tiny droplets */}
        <circle cx="152" cy="152" r="7" fill="var(--cyan)" opacity="0.9" />
        <circle cx="36" cy="142" r="5" fill="var(--pink)" opacity="0.85" />
        <circle cx="152" cy="152" r="2.4" fill="#ffffff" opacity="0.9" />
      </svg>
    </div>
  );
}

export default GlassBlob;
