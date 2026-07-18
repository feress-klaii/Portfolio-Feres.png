import WorkCard from "../../components/WorkCard/WorkCard";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useView } from "../../motion/ViewContext";
import { getPublicWorks } from "../../data/works";
import "./WorksPage.css";

const SIZES = ["large", "medium", "small"];

function WorksPage() {
  const { navigate } = useView();
  const works = getPublicWorks();

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

      <div className="specimen-grid works-grid">
        {works.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            size={SIZES[i % SIZES.length]}
            onOpen={(id) => navigate("work", id)}
          />
        ))}
      </div>
    </div>
  );
}

export default WorksPage;
