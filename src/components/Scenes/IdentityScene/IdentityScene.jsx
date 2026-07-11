import Scene from "../../Scene/Scene";
import GlassPanel from "../../Shared/GlassPanel";
import SectionLabel from "../../Shared/SectionLabel";
import GothicChain from "../../Ambient/GothicChain";
import GlassBlob from "../../Ambient/GlassBlob";
import "./IdentityScene.css";

function IdentityScene() {
  return (
    <Scene id="about" className="identity-scene">
      <GlassBlob size={300} top="18%" left="66%" duration={14} />
      <GothicChain links={5} size={26} top="12%" left="90%" opacity={0.26} />

      <GlassPanel className="identity-panel">
        <SectionLabel>Identity</SectionLabel>
        <h2 className="identity-heading display-lg">A bit about you</h2>
        <p className="identity-body mono">
          This is where your bio goes — background, what drives your work,
          tools you use. Two or three short paragraphs is enough. Keep it
          in your own voice.
        </p>
      </GlassPanel>
    </Scene>
  );
}

export default IdentityScene;
