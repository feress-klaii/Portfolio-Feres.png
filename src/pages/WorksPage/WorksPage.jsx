import WorkCard from "../../components/WorkCard/WorkCard";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useView } from "../../motion/ViewContext";
import { getPublicWorksSplit } from "../../data/works";
import "./WorksPage.css";

const SIZES = ["large", "medium", "small"];

function WorksPage() {
  const { navigate } = useView();
  const { designs, collections } = getPublicWorksSplit();

  return (
    <div className="works-page wrap">
      <header className="works-header">
        <div className="works-header-row">
          <button className="works-back" onClick={() => navigate("landing")}>
            ← Feres
          </button>
          <ThemeToggle />
        </div>
        <h1 className="works-title display-lg chrome chrome-text">All Work</h1>
      </header>

      <section className="works-section">
        <span className="eyebrow">Designs</span>
        <div className="specimen-grid works-grid">
          {designs.map((work, i) => (
            <WorkCard
              key={work.id}
              work={work}
              size={SIZES[i % SIZES.length]}
              onOpen={(id) => navigate("work", id)}
            />
          ))}
        </div>
      </section>

      {collections.length > 0 && (
        <section className="works-section" id="collections">
          <span className="eyebrow">Collections</span>
          <div className="specimen-grid works-grid">
            {collections.map((work, i) => (
              <WorkCard
                key={work.id}
                work={work}
                size={SIZES[i % SIZES.length]}
                onOpen={(id) => navigate("work", id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default WorksPage;
