import { useEffect, useRef, useState } from "react";
import WorkCard from "../WorkCard/WorkCard";
import SectionLabel from "../Shared/SectionLabel";
import { useView } from "../../motion/ViewContext";
import { getFeaturedWorks } from "../../data/works";
import "./WorkPreview.css";

const SIZES = ["large", "medium", "medium", "small"];

/**
 * The landing page's sneak peek — a handful of public works, not the
 * full archive. "View All Work" is the deliberate handoff to the
 * full Works page, both going through the same spin transition.
 */
function WorkPreview() {
  const { navigate } = useView();
  const works = getFeaturedWorks(4);
  const cardRefs = useRef([]);
  const [revealedIds, setRevealedIds] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            const index = works.findIndex((w) => w.id === id);
            setTimeout(() => {
              setRevealedIds((prev) => new Set(prev).add(id));
            }, index * 90);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="work-preview wrap" id="work">
      <SectionLabel>Selected Work</SectionLabel>
      <div className="specimen-grid">
        {works.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            size={SIZES[i] ?? "medium"}
            onOpen={(id) => navigate("work", id)}
            revealed={revealedIds.has(work.id)}
            ref={(el) => {
              cardRefs.current[i] = el;
              if (el) el.dataset.id = work.id;
            }}
          />
        ))}
      </div>

      <button className="view-all-btn" onClick={() => navigate("works")}>
        View All Work <span className="view-all-arrow">→</span>
      </button>
    </section>
  );
}

export default WorkPreview;
