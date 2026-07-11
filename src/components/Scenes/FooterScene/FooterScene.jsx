import Scene from "../../Scene/Scene";
import "./FooterScene.css";

function FooterScene() {
  return (
    <Scene id="contact" className="footer-scene">
      <a className="footer-big-link display-lg" href="mailto:you@example.com">
        you@example.com
      </a>
      <div className="footer-socials mono">
        <a href="#" target="_blank" rel="noreferrer">Instagram</a>
        <a href="#" target="_blank" rel="noreferrer">Behance</a>
        <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </Scene>
  );
}

export default FooterScene;
