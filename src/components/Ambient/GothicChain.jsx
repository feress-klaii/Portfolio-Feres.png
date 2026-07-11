import "./GothicChain.css";

// A single thorn as a triangle: base sits on the link's outer edge at
// `angleDeg` (0 = right, 90 = down), tip points radially outward.
function thorn(cx, cy, rx, ry, angleDeg, length, width) {
  const rad = (angleDeg * Math.PI) / 180;
  const nx = Math.cos(rad) * ry; // ellipse-normal approximation
  const ny = Math.sin(rad) * rx;
  const mag = Math.hypot(nx, ny) || 1;
  const ux = nx / mag;
  const uy = ny / mag;

  const baseX = cx + Math.cos(rad) * rx;
  const baseY = cy + Math.sin(rad) * ry;
  const tipX = baseX + ux * length;
  const tipY = baseY + uy * length;
  const perpX = -uy * width;
  const perpY = ux * width;

  return `${baseX - perpX},${baseY - perpY} ${tipX},${tipY} ${baseX + perpX},${baseY + perpY}`;
}

function Link({ cx, cy, rx, ry, strokeWidth, gradId, thornCount, thornLen }) {
  const thorns = Array.from({ length: thornCount }, (_, i) => (360 / thornCount) * i);
  return (
    <g>
      {thorns.map((angle, i) => (
        <polygon
          key={i}
          points={thorn(cx, cy, rx + strokeWidth * 0.4, ry + strokeWidth * 0.4, angle, thornLen, thornLen * 0.22)}
          fill={`url(#${gradId})`}
        />
      ))}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={`url(#${gradId})`} strokeWidth={strokeWidth} fill="none" />
    </g>
  );
}

/**
 * A short gothic/barbed chain — the "crown of thorns wrapped around a
 * chain link" register, not a smooth jewelry chain. Kept low-opacity
 * and blurred by default so it blends into the scene as texture.
 */
function GothicChain({ links = 5, size = 26, top, left, vertical = true, opacity = 0.24, duration = 8 }) {
  const spacing = size * 0.64;
  const pad = size * 1.1;
  const totalLength = spacing * (links - 1) + size * 2.2;
  const gradId = `gothicChainGrad-${size}-${links}-${vertical ? "v" : "h"}`;

  const width = vertical ? size * 2.2 : totalLength;
  const height = vertical ? totalLength : size * 2.2;

  return (
    <svg
      className="gothic-chain-svg"
      style={{ top, left, animationDuration: `${duration}s`, opacity }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chrome-3)" />
          <stop offset="40%" stopColor="var(--cyan)" stopOpacity="0.7" />
          <stop offset="70%" stopColor="var(--chrome-1)" />
          <stop offset="100%" stopColor="var(--chrome-3)" />
        </linearGradient>
      </defs>
      {Array.from({ length: links }).map((_, i) => {
        const alt = i % 2 === 0;
        const pos = i * spacing + pad;
        const rx = alt ? size * 0.32 : size * 0.52;
        const ry = alt ? size * 0.52 : size * 0.32;
        const cx = vertical ? size * 1.1 : pos;
        const cy = vertical ? pos : size * 1.1;
        return (
          <Link
            key={i}
            cx={cx}
            cy={cy}
            rx={vertical ? rx : ry}
            ry={vertical ? ry : rx}
            strokeWidth={size * 0.15}
            gradId={gradId}
            thornCount={5}
            thornLen={size * 0.24}
          />
        );
      })}
    </svg>
  );
}

export default GothicChain;
