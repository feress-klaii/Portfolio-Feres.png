import Scene from "../../Scene/Scene";
import GlassPanel from "../../Shared/GlassPanel";
import SectionLabel from "../../Shared/SectionLabel";
import GlassBlob from "../../Ambient/GlassBlob";
import "./IdentityScene.css";

function IdentityScene() {
  return (
    <Scene id="about" className="identity-scene">
      <GlassBlob size={300} top="18%" left="66%" duration={14} />

      <GlassPanel className="identity-panel">
        <SectionLabel>Identity</SectionLabel>
        <h2 className="identity-heading display-lg">A bit about me🦦 </h2>
        <p className="identity-body mono">
          I'm Fares, a graphic designer and Computer Science student with a passion for creating visuals that are both meaningful and memorable. I enjoy transforming ideas into designs that communicate clearly, capture attention, and leave a lasting impression.
Whether it's branding, posters, album artwork, or digital experiences, I approach every project with creativity, curiosity, and attention to detail. I believe great design isn't just about how it looks—it's about how it connects, communicates, and solves problems.
        </p>
      </GlassPanel>
    </Scene>
  );
}

export default IdentityScene;
