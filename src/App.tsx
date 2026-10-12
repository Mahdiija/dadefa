import { RouterProvider } from "react-router";
import { LazyMotion } from "framer-motion";
import "./App.css";
import { router } from "./router";

function App() {
  const loadMotionFeatures = () =>
    import("./motionFeatures").then((module) => module.default);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <RouterProvider router={router} />
    </LazyMotion>
  );
}

export default App;
