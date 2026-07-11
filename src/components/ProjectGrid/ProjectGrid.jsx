import { useEffect, useRef, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import SectionLabel from "../Shared/SectionLabel";
import "./ProjectGrid.css";

// Staggered scroll reveal: each card observes its own visibility and
// reveals with a slight delay based on its index, so cards cascade in
// rather than all appearing at once. This is the anime.js-style
// "scroll drives real animation state" idea, not a one-shot fade.

function ProjectGrid({ projects, onOpenProject }) {
  const cardRefs = useRef([]);
  const [revealedIds, setRevealedIds] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            const index = projects.findIndex((p) => p.id === id);
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
  }, [projects]);

  return (
    <section className="work wrap" id="work">
      <div className="section-label">
        <span className="section-label-glow"></span>
        Selected Work
      </div>
      <div className="specimen-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpenProject}
            revealed={revealedIds.has(project.id)}
            ref={(el) => {
              cardRefs.current[i] = el;
              if (el) el.dataset.id = project.id;
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectGrid;