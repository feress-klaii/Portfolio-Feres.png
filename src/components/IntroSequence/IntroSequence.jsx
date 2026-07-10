import { useEffect, useRef, useState } from "react";
import "./IntroSequence.css";

// A tall scroll track (STEPS.length * 100vh) with a sticky inner
// viewport. As the user scrolls through the track, a 3D cylinder
// rotates so each face — one "story beat" — comes into view in turn,
// like rolling through a sequence rather than just scrolling past it.
// Floating chrome/bitmap shapes drift in the background independent
// of scroll, for constant ambient motion.
//
// NOTE: text content below is placeholder — replace `small` and
// `big` on each step with real copy once decided.

const STEPS = [
  { small: "Welcome to the portfolio of", big: "FERES" },
  { small: "Every project starts as a problem worth solving", big: "" },
  { small: "Then it becomes a system of decisions", big: "" },
  { small: "Type. Color. Rhythm. Restraint.", big: "" },
  { small: "Some of it is loud. Most of it is quiet.", big: "" },
  { small: "This is the work.", big: "" },
];

function IntroSequence() {
  const trackRef = useRef(null);
  const cylinderRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stepDeg = 360 / STEPS.length;

    const handleScroll = () => {
      const track = trackRef.current;
      const cylinder = cylinderRef.current;
      if (!track || !cylinder) return;

      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      if (trackHeight <= 0) return;

      // progress: 0 when track starts entering, 1 when fully scrolled through
      let progress = -rect.top / trackHeight;
      progress = Math.min(Math.max(progress, 0), 1);

      const rotation = progress * (360 - stepDeg) * (STEPS.length / (STEPS.length - 1));
      cylinder.style.transform = `rotateX(${-rotation}deg)`;

      const step = Math.min(
        STEPS.length - 1,
        Math.round(progress * (STEPS.length - 1))
      );
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stepDeg = 360 / STEPS.length;
  const radius = 340;

  return (
    <div className="intro-track" ref={trackRef} style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="intro-sticky">
        <div className="intro-shapes">
          <div className="drift-shape shape-1"></div>
          <div className="drift-shape shape-2"></div>
          <div className="drift-shape shape-3"></div>
          <div className="drift-shape shape-4"></div>
        </div>

        <div className="intro-cylinder-stage">
          <div className="intro-cylinder" ref={cylinderRef}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="intro-face"
                style={{
                  transform: `rotateX(${i * stepDeg}deg) translateZ(${radius}px)`,
                }}
              >
                <p className="intro-small">{step.small}</p>
                {step.big && <h1 className="intro-big">{step.big}</h1>}
              </div>
            ))}
          </div>
        </div>

        <div className="intro-progress">
          {STEPS.map((_, i) => (
            <span key={i} className={`progress-dot ${i === activeStep ? "active" : ""}`}></span>
          ))}
        </div>

        <div className="scroll-hint">scroll</div>
      </div>
    </div>
  );
}

export default IntroSequence;
