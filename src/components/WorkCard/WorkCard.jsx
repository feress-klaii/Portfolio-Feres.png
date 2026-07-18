import { forwardRef } from "react";
import "./WorkCard.css";

const WorkCard = forwardRef(function WorkCard({ work, onOpen, size = "medium", revealed = true }, ref) {
  const year = new Date(work.date).getFullYear();

  return (
    <div
      ref={ref}
      className={`specimen size-${size} ${revealed ? "in-view" : "pre-reveal"}`}
      onClick={() => onOpen(work.id)}
    >
      <span className="bracket bracket-tl"></span>
      <span className="bracket bracket-br"></span>

      <div className="specimen-bleed"></div>

      <div className="specimen-thumb">
        {work.cover && <img src={work.cover} alt={work.title} loading="lazy" />}
      </div>

      <div className="specimen-meta">
        <span className="specimen-title">{work.title}</span>
        <span className="specimen-role">
          {work.type === "collection" ? "Collection" : "Design"} · {year}
        </span>
      </div>
    </div>
  );
});

export default WorkCard;
