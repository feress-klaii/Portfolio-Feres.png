import { ViewProvider } from "../../motion/ViewContext";
import BackgroundScene from "../../components/BackgroundScene/BackgroundScene";
import CursorGlow from "../../components/CursorGlow/CursorGlow";
import LandingScene from "../../components/Scenes/LandingScene/LandingScene";
import IdentityScene from "../../components/Scenes/IdentityScene/IdentityScene";
import IntroSequence from "../../components/IntroSequence/IntroSequence";
import WorkPreview from "../../components/WorkPreview/WorkPreview";
import ExploreScene from "../../components/Scenes/ExploreScene/ExploreScene";
import WorksPage from "../WorksPage/WorksPage";
import WorkDetailPage from "../WorkDetail/WorkDetailPage";
import ContactPage from "../ContactPage/ContactPage";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import "./Home.css";

// Scene order per the target structure:
// Landing -> Identity -> Transition -> Gallery(preview) -> Explore
// IntroSequence is the Transition Scene. WorkPreview is the landing
// sneak peek; ExploreScene is the site directory that replaced the
// old inline contact footer. "View All Work", any individual piece,
// and "Contact" all hand off to their own page via the spin
// transition — no router, all one page swapping what it renders
// (see ViewContext).

function LandingPage() {
  return (
    <>
      <header className="site-header wrap">
        <div className="site-name">Feres</div>
        <nav>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#explore">Explore</a>
          <ThemeToggle className="theme-toggle--nav" />
        </nav>
      </header>

      <LandingScene />
      <IdentityScene />
      <IntroSequence />
      <WorkPreview />
      <ExploreScene />
    </>
  );
}

function renderView(view) {
  let page;
  switch (view.name) {
    case "works":
      page = <WorksPage />;
      break;
    case "work":
      page = <WorkDetailPage id={view.id} />;
      break;
    case "contact":
      page = <ContactPage />;
      break;
    default:
      page = <LandingPage />;
  }
  return (
    <>
      {page}
      <SiteFooter />
    </>
  );
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
