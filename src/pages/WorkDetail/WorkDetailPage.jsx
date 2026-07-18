import WorkCard from "../../components/WorkCard/WorkCard";
import { useView } from "../../motion/ViewContext";
import { getWorkById, getCollectionDesigns, getDesignCollections } from "../../data/works";
import "./WorkDetailPage.css";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long" });
}

function WorkDetailPage({ id }) {
  const { navigate } = useView();
  const work = getWorkById(id);

  if (!work) {
    return (
      <div className="work-detail wrap">
        <button className="works-back" onClick={() => navigate("works")}>← All Work</button>
        <p>That work could not be found.</p>
      </div>
    );
  }

  const isCollection = work.type === "collection";
  const memberDesigns = isCollection ? getCollectionDesigns(work) : [];
  const parentCollections = !isCollection ? getDesignCollections(work) : [];

  return (
    <div className="work-detail wrap">
      <button className="works-back" onClick={() => navigate("works")}>← All Work</button>

      <header className="work-detail-header">
        <span className="work-detail-type eyebrow">
          {isCollection ? "Collection" : "Design"} · {formatDate(work.date)}
        </span>
        <h1 className="work-detail-title display-lg chrome chrome-text">{work.title}</h1>
        {work.description && <p className="work-detail-desc mono">{work.description}</p>}
      </header>

      {!isCollection && (
        <div className="work-detail-images">
          {work.images.map((src) => (
            <img key={src} src={src} alt={work.title} loading="lazy" />
          ))}
        </div>
      )}

      {!isCollection && parentCollections.length > 0 && (
        <section className="work-detail-related">
          <span className="eyebrow">Part of</span>
          <div className="specimen-grid">
            {parentCollections.map((c) => (
              <WorkCard key={c.id} work={{ ...c, cover: c.cover ?? work.images[0] }} size="medium" onOpen={(cid) => navigate("work", cid)} />
            ))}
          </div>
        </section>
      )}

      {isCollection && (
        <section className="work-detail-related">
          <span className="eyebrow">In this collection</span>
          <div className="specimen-grid">
            {memberDesigns.map((d) => (
              <WorkCard key={d.id} work={{ ...d, cover: d.images?.[0] }} size="medium" onOpen={(did) => navigate("work", did)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default WorkDetailPage;
