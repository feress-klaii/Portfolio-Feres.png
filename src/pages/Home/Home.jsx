import { useState } from "react";
import IntroSequence from "../../components/IntroSequence/IntroSequence";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import CursorGlow from "../../components/CursorGlow/CursorGlow";
import PROJECTS from "../../data/projects";
import "./Home.css";

function Home() {
  const [openId, setOpenId] = useState(null);
  const openProject = PROJECTS.find((p) => p.id === openId);

  return (
    <>
      <CursorGlow />
      <header className="site-header wrap">
        <div className="site-name">Feres</div>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <IntroSequence />

      <ProjectGrid projects={PROJECTS} onOpenProject={setOpenId} />

      <section className="about wrap" id="about">
        <div>
          <div className="section-label">About</div>
          <h2 className="about-heading">A bit about you</h2>
        </div>
        <p>
          This is where your bio goes — background, what drives your work, tools you use.
          Two or three short paragraphs is enough. Keep it in your own voice.
        </p>
      </section>

      <footer className="site-footer wrap" id="contact">
        <a className="big-link" href="mailto:you@example.com">you@example.com</a>
        <div className="socials">
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noreferrer">Behance</a>
          <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>

      {openProject && (
        <div className="overlay open" onClick={() => setOpenId(null)}>
          <div className="overlay-inner" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setOpenId(null)}>← Back</button>
            <h2>{openProject.title}</h2>
            <div className="overlay-meta">
              <span>{openProject.role}</span>
              <span>{openProject.year}</span>
            </div>
            <p className="overlay-desc">{openProject.description}</p>
            <div className="overlay-images">
              {openProject.images.map((src) => (
                <img key={src} src={src} alt={openProject.title} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
