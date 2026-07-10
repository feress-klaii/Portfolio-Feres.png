import { useState } from "react";
import IntroSequence from "../../components/IntroSequence/IntroSequence";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import BackgroundScene from "../../components/BackgroundScene/BackgroundScene";
import CursorGlow from "../../components/CursorGlow/CursorGlow";
import PROJECTS from "../../data/projects";
import "./Home.css";

function Home() {
  const [openId, setOpenId] = useState(null);
  const openProject = PROJECTS.find((p) => p.id === openId);

  return (
    <>

    <BackgroundScene/>

    <Scene>

    Landing

    </Scene>

    <Scene>

    Identity

    </Scene>

    <Scene>

    Gallery

    </Scene>

    <Scene>

    Footer

    </Scene>

    </>
  );
}

export default Home;
