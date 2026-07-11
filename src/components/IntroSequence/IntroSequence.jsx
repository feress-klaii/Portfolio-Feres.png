import { useCallback, useRef, useState } from "react";
import useSceneProgress from "../../motion/useSceneProgress";
import { easeInOutCubic } from "../../motion/easing";
import "./IntroSequence.css";

// This is the "Transition Scene" in the target structure — the
// approved rotating-cylinder walkthrough, now driven by the shared
// useSceneProgress hook (Lenis-smoothed, continuous, reversible)
// instead of a bespoke scroll listener. Cylinder rotation is a
// direct function of scroll progress through this section; nothing
// here is a one-shot trigger.
//
// NOTE: text content below is placeholder — replace `small` and
// `big` on each step with real copy once decided.

const STEPS = [
  { small: "Every project starts as a problem worth solving", big: "" },
  { small: "Then it becomes a system of decisions", big: "" },
  { small: "Type. Color. Rhythm. Restraint.", big: "" },
  { small: "Some of it is loud. Most of it is quiet.", big: "" },
  { small: "This is the work.", big: "" },
];

const STEP_DEG = 360 / STEPS.length;
const RADIUS = 340;

function IntroSequence() {
  const trackRef = useRef(null);
  const cylinderRef = useRef(null);
  const shapesRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const lastStep = useRef(0);

  const onProgress = useCallback((progress) => {
    const cylinder = cylinderRef.current;
    if (!cylinder) return;

    const eased = easeInOutCubic(progress);
    const totalRotation = eased * (360 - STEP_DEG) * (STEPS.length / (STEPS.length - 1));
    cylinder.style.transform = `rotateX(${-totalRotation}deg)`;

    shapesRef.current.forEach((el, i) => {
      if (!el) return;
      const depth = 20 + i * 12;
      el.style.setProperty("--parallax-y", `${eased * depth}px`);
    });

    const step = Math.min(STEPS.length - 1, Math.round(progress * (STEPS.length - 1)));
    if (step !== lastStep.current) {
      lastStep.current = step;
      setActiveStep(step);
    }
  }, []);

  useSceneProgress(trackRef, onProgress);

  return (
    <div className="intro-track" ref={trackRef} style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="intro-sticky">
        <div className="intro-shapes">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => (shapesRef.current[i] = el)}
              className={`drift-parallax parallax-${i + 1}`}
            >
              <div className={`drift-shape shape-${i + 1}`}></div>
            </div>
          ))}
        </div>

        <div className="intro-cylinder-stage">
          <div className="intro-cylinder" ref={cylinderRef}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="intro-face"
                style={{ transform: `rotateX(${i * STEP_DEG}deg) translateZ(${RADIUS}px)` }}
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
