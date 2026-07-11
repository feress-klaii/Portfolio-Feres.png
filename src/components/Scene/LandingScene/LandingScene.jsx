import Scene from "../../Scene/Scene";
import ChromeRing from "../../Ambient/ChromeRing";
import GlassPrism from "../../Ambient/GlassPrism";
import "./LandingScene.css";

function LandingScene() {
  return (
    <Scene id="landing" className="landing-scene">
      <ChromeRing size={260} top="8%" left="6%" duration={40} />
      <ChromeRing size={140} top="65%" left="82%" duration={26} reverse />
      <GlassPrism size={130} top="18%" left="78%" rotate={-15} duration={11} />

      <p className="landing-eyebrow eyebrow">Welcome to the portfolio of</p>
      <h1 className="landing-name">
        <span className="landing-name-chrome chrome">FERES</span>
      </h1>
      <p className="landing-tagline mono">— placeholder, real line TBD —</p>

      <div className="landing-scroll-hint mono">scroll</div>
    </Scene>
  );
}

export default LandingScene;