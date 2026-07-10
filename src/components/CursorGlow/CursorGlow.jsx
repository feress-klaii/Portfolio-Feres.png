import { useEffect, useRef } from "react";
import "./CursorGlow.css";

// A soft glow that follows the cursor with slight lag, leaving a
// fading trail. This is the "cursor as something alive" idea from
// the theme reference — glow is reserved for what's active, and
// the cursor itself is the most active thing on the page.

function CursorGlow() {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    let frame;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" ref={dotRef}></div>;
}

export default CursorGlow;
