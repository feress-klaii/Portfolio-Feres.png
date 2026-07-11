import "./Y2KSprite.css";

/**
 * Real Y2K vector shape vocabulary — sparkle bursts, Saturn rings,
 * spirals, atoms, hearts, diamonds, dot clusters — rendered in a
 * single neon accent color with a glow. Matches the sharp graphic
 * register of a Y2K sticker sheet rather than soft abstract blobs.
 */
function Y2KSprite({ variant = "spark", size = 32, top, left, color = "var(--cyan)", duration = 7, opacity = 0.85 }) {
  const style = {
    top,
    left,
    width: size,
    height: size,
    color,
    opacity,
    animationDuration: `${duration}s`,
  };

  switch (variant) {
    case "spark":
      return (
        <svg className="y2k-sprite spark" style={style} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L59 41 L100 50 L59 59 L50 100 L41 59 L0 50 L41 41 Z" />
        </svg>
      );

    case "sparkFat":
      return (
        <svg className="y2k-sprite spark" style={style} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 4 C55 34 66 45 96 50 C66 55 55 66 50 96 C45 66 34 55 4 50 C34 45 45 34 50 4 Z" />
        </svg>
      );

    case "burst":
      return (
        <svg className="y2k-sprite spark" style={style} viewBox="0 0 100 100" fill="currentColor">
          <g>
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M50 6 L54 46 L50 50 L46 46 Z"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
          </g>
        </svg>
      );

    case "ring":
      return (
        <svg className="y2k-sprite ring" style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
          <ellipse cx="50" cy="50" rx="46" ry="17" />
        </svg>
      );

    case "ringCluster":
      return (
        <svg className="y2k-sprite ring" style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="50" cy="50" r="46" strokeDasharray="4 6" />
          <circle cx="50" cy="50" r="32" strokeDasharray="3 5" opacity="0.7" />
          <circle cx="50" cy="50" r="18" opacity="0.5" />
        </svg>
      );

    case "spiral":
      return (
        <svg className="y2k-sprite spiral" style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M50 50 C50 28 68 10 50 10 C22 10 10 32 10 50 C10 72 30 90 52 90 C76 90 90 70 90 50" />
        </svg>
      );

    case "atom":
      return (
        <svg className="y2k-sprite atom" style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <ellipse cx="50" cy="50" rx="46" ry="18" />
          <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
        </svg>
      );

    case "heart":
      return (
        <svg className="y2k-sprite spark" style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round">
          <path d="M50 88 C20 65 6 46 6 28 C6 12 18 3 32 3 C42 3 48 10 50 16 C52 10 58 3 68 3 C82 3 94 12 94 28 C94 46 80 65 50 88 Z" />
        </svg>
      );

    case "diamond":
      return (
        <svg className="y2k-sprite ring" style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round">
          <rect x="24" y="24" width="52" height="52" transform="rotate(45 50 50)" />
        </svg>
      );

    case "dots":
      return (
        <svg className="y2k-sprite ring" style={style} viewBox="0 0 100 100" fill="currentColor">
          {[18, 50, 82].map((cx) =>
            [18, 50, 82].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />)
          )}
        </svg>
      );

    default:
      return null;
  }
}

export default Y2KSprite;
