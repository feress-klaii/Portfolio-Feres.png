import "./App.css";
import Home from "./pages/Home/Home";
import MotionProvider from "./motion/MotionProvider";

function App() {
  return (
    <MotionProvider>
      <Home />
    </MotionProvider>
  );
}

export default App;