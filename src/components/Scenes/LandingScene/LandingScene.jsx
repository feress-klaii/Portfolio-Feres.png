import Scene from "../../Scene/Scene";
import ChromeRing from "../../Ambient/ChromeRing";
import GlassBlob from "../../Ambient/GlassBlob";
import Y2KSprite from "../../Ambient/Y2KSprite";
import "./LandingScene.css";

function LandingScene() {
  return (
    <Scene id="landing" className="landing-scene">
      <ChromeRing size={260} top="8%" left="6%" duration={40} />
      <ChromeRing size={140} top="65%" left="82%" duration={26} reverse />
      <GlassBlob size={170} top="16%" left="74%" duration={12} />
      <Y2KSprite variant="spark" size={30} top="30%" left="12%" duration={5} color="var(--pink)" />

      <p className="landing-eyebrow eyebrow">Welcome to the portfolio of</p>
      <h1 className="landing-name">
        <span className="landing-name-chrome chrome">FERES</span>
      </h1>
      <p className="landing-tagline mono">— Digital dreams, Translated visually —</p>

      <div className="landing-scroll-hint mono">scroll</div>
    </Scene>
  );
}

export default LandingScene;
