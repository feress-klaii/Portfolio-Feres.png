import { forwardRef } from "react";
import "./ProjectCard.css";

const ProjectCard = forwardRef(function ProjectCard({ project, onOpen, revealed }, ref) {
  return (
    <div
      ref={ref}
      className={`specimen size-${project.size || "medium"} ${revealed ? "in-view" : "pre-reveal"}`}
      onClick={() => onOpen(project.id)}
    >
      <span className="bracket bracket-tl"></span>
      <span className="bracket bracket-br"></span>

      <div className="specimen-bleed"></div>

      <div className="specimen-thumb">
        <img src={project.cover} alt={project.title} loading="lazy" />
      </div>

      <div className="specimen-meta">
        <span className="specimen-title">{project.title}</span>
        <span className="specimen-role">{project.role}</span>
      </div>
    </div>
  );
});

export default ProjectCard;
