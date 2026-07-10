import "./BackgroundScene.css";
import useParallax from "../../motion/useParallax";
import useScrollProgress from "../../motion/useScrollProgress";

export default function BackgroundScene() {
    const mouse=useParallax();
    const progress=useScrollProgress();
  return (
    <div className="bg-scene" style={{

    transform:`
    translateY(${progress*220}px)
    translateX(${mouse.x*18}px)
    `

    }} >

      <div className="bg-gradient"></div>

      <div className="bg-grid"></div>

      <div className="bg-noise"></div>

      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="ring ring-1"></div>
      <div className="ring ring-2"></div>

      <div className="star star-1"></div>
      <div className="star star-2"></div>
      <div className="star star-3"></div>

    </div>
  );
}