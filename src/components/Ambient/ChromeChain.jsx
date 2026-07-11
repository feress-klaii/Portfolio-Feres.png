import "./ChromeChain.css";

/**
 * A chain of interlocking oval links, alternating orientation to
 * read as actually interlocked (not just a row of circles). Rendered
 * at low opacity with a metallic gradient so it blends into the
 * scene rather than reading as a bold foreground illustration.
 */
function ChromeChain({ links = 6, size = 26, top, left, vertical = true, opacity = 0.32, duration = 7 }) {
  const spacing = size * 0.62;
  const pad = size * 0.85;
  const totalLength = spacing * (links - 1) + size * 1.7;
  const gradId = `chromeChainGrad-${size}-${links}-${vertical ? "v" : "h"}`;

  const width = vertical ? size * 1.7 : totalLength;
  const height = vertical ? totalLength : size * 1.7;

  return (
    <svg
      className="chrome-chain-svg"
      style={{ top, left, animationDuration: `${duration}s`, opacity }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chrome-3)" />
          <stop offset="45%" stopColor="var(--chrome-2)" />
          <stop offset="100%" stopColor="var(--chrome-1)" />
        </linearGradient>
      </defs>
      {Array.from({ length: links }).map((_, i) => {
        const alt = i % 2 === 0;
        const pos = i * spacing + pad;
        const rx = alt ? size * 0.3 : size * 0.5;
        const ry = alt ? size * 0.5 : size * 0.3;
        const cx = vertical ? size * 0.85 : pos;
        const cy = vertical ? pos : size * 0.85;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={vertical ? rx : ry}
            ry={vertical ? ry : rx}
            stroke={`url(#${gradId})`}
            strokeWidth={size * 0.14}
          />
        );
      })}
    </svg>
  );
}

export default ChromeChain;
