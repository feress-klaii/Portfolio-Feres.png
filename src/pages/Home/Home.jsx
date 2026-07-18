import { ViewProvider } from "../../motion/ViewContext";
import BackgroundScene from "../../components/BackgroundScene/BackgroundScene";
import CursorGlow from "../../components/CursorGlow/CursorGlow";
import LandingScene from "../../components/Scenes/LandingScene/LandingScene";
import IdentityScene from "../../components/Scenes/IdentityScene/IdentityScene";
import IntroSequence from "../../components/IntroSequence/IntroSequence";
import WorkPreview from "../../components/WorkPreview/WorkPreview";
import FooterScene from "../../components/Scenes/FooterScene/FooterScene";
import WorksPage from "../WorksPage/WorksPage";
import WorkDetailPage from "../WorkDetail/WorkDetailPage";
import "./Home.css";

// Scene order per the target structure:
// Landing -> Identity -> Transition -> Gallery(preview) -> Footer
// IntroSequence is the Transition Scene. WorkPreview is the landing
// sneak peek; "View All Work" and any individual piece hand off to
// the Works page / a work's own page via the spin transition — no
// router, all one page swapping what it renders (see ViewContext).

function LandingPage() {
  return (
    <>
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
      <WorkPreview />
      <FooterScene />
    </>
  );
}

function renderView(view) {
  switch (view.name) {
    case "works":
      return <WorksPage />;
    case "work":
      return <WorkDetailPage id={view.id} />;
    default:
      return <LandingPage />;
  }
}

function Home() {
  return (
    <ViewProvider renderView={renderView}>
      <BackgroundScene />
      <CursorGlow />
    </ViewProvider>
  );
}

export default Home;
