import { useEffect, useRef, useState } from "react";
import "./HoloChain.css";
import { onChainOffset } from "../../motion/chainDrive";

let uid = 0;

function thornPoints(cx, cy, rx, ry, angleDeg, length, width) {
  const rad = (angleDeg * Math.PI) / 180;
  const nx = Math.cos(rad) * ry;
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

// One canonical thorned link, centered at the origin, reused via <g>
// transforms for every position around the ring.
function LinkShape({ size, gradId }) {
  const rx = size * 0.5;
  const ry = size * 0.3;
  const strokeWidth = size * 0.12;
  const thornCount = 6;
  const angles = Array.from({ length: thornCount }, (_, i) => (360 / thornCount) * i);

  return (
    <g>
      {angles.map((angle, i) => (
        <polygon
          key={i}
          points={thornPoints(0, 0, rx + strokeWidth * 0.4, ry + strokeWidth * 0.4, angle, size * 0.26, size * 0.07)}
          fill={`url(#${gradId})`}
        />
      ))}
      <ellipse rx={rx} ry={ry} stroke={`url(#${gradId})`} strokeWidth={strokeWidth} fill="none" />
    </g>
  );
}

// Links placed evenly around a circle, each oriented tangent to the
// ring (with a small alternating twist for the interlocked look) — a
// closed loop with no start or end, unlike a strip.
function RingLinks({ count, linkSize, radius, gradId }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const twist = i % 2 === 0 ? -11 : 11;
        const rotation = angle + 90 + twist;
        return (
          <g key={i} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
            <g className="holo-chain-ghost" transform="translate(2, 1.5)">
              <LinkShape size={linkSize} gradId={gradId} />
            </g>
            <LinkShape size={linkSize} gradId={gradId} />
          </g>
        );
      })}
    </>
  );
}

/**
 * A large closed chain ring anchored off a viewport corner — most of
 * the ring sits outside the visible frame, so only a sweeping arc of
 * it shows, and because it's a full loop there is never a visible
 * start or end. The whole ring spins slowly at rest and speeds up
 * with scroll velocity (shared drive from motion/chainDrive.js).
 */
function HoloChain({
  corner = "top-left",
  radius = 260,
  linkSize = 58,
  linkCount = 18,
  opacity = 0.6,
  reverse = false,
  speedFactor = 1,
  hue = 0,
}) {
  const [id] = useState(() => uid++);
  const gradId = `holoChainGrad-${id}`;
  const groupRef = useRef(null);

  const box = radius * 2 + linkSize * 2.4;
  const center = box / 2;

  useEffect(() => {
    return onChainOffset((offset) => {
      if (!groupRef.current) return;
      const angle = (offset * 0.045 * speedFactor) % 360;
      groupRef.current.setAttribute(
        "transform",
        `translate(${center}, ${center}) rotate(${reverse ? -angle : angle})`
      );
    });
  }, [center, reverse, speedFactor]);

  const cornerStyle = {
    width: box,
    height: box,
    opacity,
    filter: hue ? `hue-rotate(${hue}deg)` : undefined,
    top: corner.includes("top") ? -box * 0.4 : corner.includes("bottom") ? "auto" : undefined,
    bottom: corner.includes("bottom") ? -box * 0.4 : undefined,
    left: corner.includes("left") ? -box * 0.4 : corner.includes("right") ? "auto" : undefined,
    right: corner.includes("right") ? -box * 0.4 : undefined,
  };

  return (
    <div className="holo-chain-corner" style={cornerStyle}>
      <div className="holo-chain-inner">
        <svg className="holo-chain-svg" viewBox={`0 0 ${box} ${box}`} width={box} height={box}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <g ref={groupRef}>
            <RingLinks count={linkCount} linkSize={linkSize} radius={radius} gradId={gradId} />
          </g>
        </svg>
        <div className="holo-chain-scanlines" />
      </div>
    </div>
  );
}

export default HoloChain;
