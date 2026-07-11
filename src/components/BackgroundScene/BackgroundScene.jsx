import { useEffect, useRef, useState } from "react";
import "./BackgroundScene.css";
import { onScrollY } from "../../motion/scrollTicker";
import ChromeRing from "../Ambient/ChromeRing";
import GothicChain from "../Ambient/GothicChain";
import GlassBlob from "../Ambient/GlassBlob";
import Y2KSprite from "../Ambient/Y2KSprite";

// Anchor zones spread across the viewport — a respawning shape picks
// a fresh one each cycle so the field never repeats the same
// composition twice in a row. Kept off dead-center where headline
// text usually sits.
const ZONES = [
  { top: "8%", left: "10%" }, { top: "14%", left: "82%" },
  { top: "22%", left: "42%" }, { top: "30%", left: "6%" },
  { top: "34%", left: "68%" }, { top: "46%", left: "90%" },
  { top: "52%", left: "20%" }, { top: "58%", left: "50%" },
  { top: "64%", left: "78%" }, { top: "70%", left: "12%" },
  { top: "78%", left: "60%" }, { top: "86%", left: "34%" },
  { top: "90%", left: "86%" }, { top: "96%", left: "8%" },
];

const SPRITE_VARIANTS = ["spark", "sparkFat", "burst", "ring", "ringCluster", "spiral", "atom", "heart", "diamond", "dots"];
const COLORS = ["var(--cyan)", "var(--pink)", "var(--purple)", "#ffffff"];

function randomOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// A slot's full visual descriptor is randomized fresh on every
// respawn: kind, position, size, color, speed (parallax depth), and
// how long it lives before fading out again.
function rollDescriptor() {
  const roll = Math.random();
  const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
  const speed = 0.05 + Math.random() * 0.28;
  const life = 7000 + Math.random() * 7000;

  if (roll < 0.12) {
    return { kind: "chain", ...zone, speed, life, size: 20 + Math.random() * 10, links: 4 + Math.floor(Math.random() * 3) };
  }
  if (roll < 0.24) {
    return { kind: "blob", ...zone, speed, life, size: 140 + Math.random() * 140 };
  }
  if (roll < 0.32) {
    return { kind: "ring", ...zone, speed, life, size: 90 + Math.random() * 110 };
  }
  return {
    kind: "sprite",
    variant: randomOf(SPRITE_VARIANTS),
    color: randomOf(COLORS),
    ...zone,
    speed,
    life,
    size: 26 + Math.random() * 46,
  };
}

function renderShape(d) {
  switch (d.kind) {
    case "chain":
      return <GothicChain links={d.links} size={d.size} vertical opacity={0.22} />;
    case "blob":
      return <GlassBlob size={d.size} />;
    case "ring":
      return <ChromeRing size={d.size} duration={26 + Math.random() * 20} />;
    case "sprite":
      return <Y2KSprite variant={d.variant} size={d.size} color={d.color} />;
    default:
      return null;
  }
}

function FloatingSlot({ slotIndex }) {
  const [descriptor, setDescriptor] = useState(rollDescriptor);
  const [visible, setVisible] = useState(false);
  const outerRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const activeTimers = timers.current;

    // stagger initial entrances so the whole field doesn't fade in at once
    activeTimers.push(setTimeout(() => setVisible(true), 200 + slotIndex * 260));

    function scheduleCycle(life) {
      activeTimers.push(
        setTimeout(() => {
          setVisible(false);
          activeTimers.push(
            setTimeout(() => {
              const next = rollDescriptor();
              setDescriptor(next);
              requestAnimationFrame(() => setVisible(true));
              scheduleCycle(next.life);
            }, 1400 + Math.random() * 1200) // gap while faded out, before respawning elsewhere
          );
        }, life)
      );
    }
    // captures the initial descriptor from this render's closure —
    // fine since this effect only runs once on mount
    scheduleCycle(descriptor.life);

    return () => activeTimers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallax depth: written every real scroll frame, combined with
  // this slot's own drift animation which lives on the inner element
  // so the two transforms never fight over the same style property.
  useEffect(() => {
    return onScrollY((scrollY) => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(0, ${-scrollY * descriptor.speed}px, 0)`;
      }
    });
  }, [descriptor.speed]);

  return (
    <div
      ref={outerRef}
      className="bg-shape-outer"
      style={{ top: descriptor.top, left: descriptor.left }}
    >
      <div className={`bg-shape-inner${visible ? " is-visible" : ""}`}>
        {renderShape(descriptor)}
      </div>
    </div>
  );
}

function BackgroundScene() {
  const gradientRef = useRef(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Mouse parallax is applied to the atmosphere layer only (gradient +
  // grid), in its own rAF loop, lerp-smoothed, independent of the
  // per-shape scroll transforms above so nothing races over the same
  // style property.
  useEffect(() => {
    function handleMove(e) {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMove);

    let rafId;
    const tick = () => {
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;
      if (gradientRef.current) {
        const { x, y } = mouseCurrent.current;
        gradientRef.current.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="bg-scene">
      <div className="bg-gradient" ref={gradientRef}></div>
      <div className="bg-grid"></div>
      <div className="bg-noise"></div>

      {Array.from({ length: 11 }).map((_, i) => (
        <FloatingSlot key={i} slotIndex={i} />
      ))}
    </div>
  );
}

export default BackgroundScene;
