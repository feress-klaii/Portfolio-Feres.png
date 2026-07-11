import { useState } from "react";
import BackgroundScene from "../../components/BackgroundScene/BackgroundScene";
import CursorGlow from "../../components/CursorGlow/CursorGlow";
import LandingScene from "../../components/Scenes/LandingScene/LandingScene";
import IdentityScene from "../../components/Scenes/IdentityScene/IdentityScene";
import IntroSequence from "../../components/IntroSequence/IntroSequence";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import FooterScene from "../../components/Scenes/FooterScene/FooterScene";
import PROJECTS from "../../data/projects";
import "./Home.css";

// Scene order per the target structure:
// Landing -> Identity -> Transition -> Gallery -> Footer
// IntroSequence is the Transition Scene (the approved rotating-
// cylinder walkthrough). Gallery is still card-based for now —
// the museum-exhibit redesign is the next scoped piece of work,
// not bundled in here.

function Home() {
  const [openId, setOpenId] = useState(null);
  const openProject = PROJECTS.find((p) => p.id === openId);

  return (
    <>
      <BackgroundScene />
      <CursorGlow />

      <header className="site-header wrap">
        <div className="site-name">Feres</div>
        <nav>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <LandingScene />
      <IdentityScene />
      <IntroSequence />
      <ProjectGrid projects={PROJECTS} onOpenProject={setOpenId} />
      <FooterScene />

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
