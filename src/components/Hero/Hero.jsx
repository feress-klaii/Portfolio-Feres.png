import { useEffect, useRef, useState } from "react";
import "./Hero.css";

// Name entrance: bitmap type holds, flickers with RGB channel-split
// glitch interference (cyan/pink/purple offset), then a chrome sweep
// resolves it into the polished display face with an iridescent
// shimmer settling in. Tagline types itself out after.

const TAGLINE = "Graphic design. Rendered in real time.";

function Hero() {
  const wrapRef = useRef(null);
  const bitmapRef = useRef(null);
  const chromeRef = useRef(null);
  const sweepRef = useRef(null);
  const [tagline, setTagline] = useState("");

  const playSequence = () => {
    const bitmap = bitmapRef.current;
    const chrome = chromeRef.current;
    const sweep = sweepRef.current;
    if (!bitmap || !chrome || !sweep) return;

    bitmap.classList.remove("glitching");
    bitmap.style.opacity = "1";
    chrome.style.transition = "none";
    chrome.style.opacity = "0";
    chrome.style.backgroundPosition = "0% 0%";
    sweep.style.transition = "none";
    sweep.style.left = "-20px";
    sweep.style.opacity = "0";
    setTagline("");

    void wrapRef.current.offsetWidth;

    // glitch flicker phase
    bitmap.classList.add("glitching");

    setTimeout(() => {
      bitmap.classList.remove("glitching");

      sweep.style.transition = "left 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.1s";
      sweep.style.opacity = "1";
      sweep.style.left = "calc(100% + 20px)";

      bitmap.style.transition = "opacity 0.25s ease 0.15s";
      bitmap.style.opacity = "0";

      chrome.style.transition = "opacity 0.25s ease 0.2s, background-position 2s ease 0.2s";
      chrome.style.opacity = "1";
      chrome.style.backgroundPosition = "100% 0%";

      setTimeout(() => { sweep.style.opacity = "0"; }, 650);

      // typewriter tagline after the name resolves
      setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
          i++;
          setTagline(TAGLINE.slice(0, i));
          if (i >= TAGLINE.length) clearInterval(typeInterval);
        }, 35);
      }, 900);
    }, 750);
  };

  useEffect(() => {
    playSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="hero wrap">
      <div className="hero-badge">
        <span className="bracket bracket-tl"></span>
        <span className="bracket bracket-br"></span>
        <div className="hero-name" ref={wrapRef} onClick={playSequence}>
          <span className="hero-name-bitmap" ref={bitmapRef} data-text="SIDI">SIDI</span>
          <span className="hero-name-chrome" ref={chromeRef}>SIDI</span>
          <div className="hero-sweep" ref={sweepRef}></div>
        </div>
      </div>

      <h1 className="hero-title">Graphic<br />Designer</h1>

      <p className="hero-subline">
        <span>{tagline}</span>
        <span className="hero-cursor">_</span>
      </p>
    </section>
  );
}

export default Hero;
