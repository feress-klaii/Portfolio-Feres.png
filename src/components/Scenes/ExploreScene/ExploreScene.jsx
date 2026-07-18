import Scene from "../../Scene/Scene";
import { useView } from "../../../motion/ViewContext";
import "./ExploreScene.css";

/**
 * Replaces the old inline contact footer — a directory of every
 * section on the site instead of ending the scroll on a single
 * contact card. Contact info now lives on its own page (see
 * pages/ContactPage), reached the same way Works is: through the
 * spin transition.
 */
function ExploreScene() {
  const { navigate, scrollToId } = useView();

  const items = [
    { label: "Home", action: () => scrollToId("landing") },
    { label: "About", action: () => scrollToId("about") },
    { label: "Works", action: () => navigate("works") },
    { label: "Collections", action: () => navigate("works", null, { anchor: "collections" }) },
    { label: "Contact", action: () => navigate("contact") },
  ];

  return (
    <Scene id="explore" className="explore-scene" eyebrow="Explore">
      <ul className="explore-list">
        {items.map((item, i) => (
          <li key={item.label}>
            <button className="explore-item" onClick={item.action}>
              <span className="explore-index mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="explore-label display-md chrome chrome-text">{item.label}</span>
              <span className="explore-arrow">→</span>
            </button>
          </li>
        ))}
      </ul>
    </Scene>
  );
}

export default ExploreScene;
