import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GradientBlur from "./components/GradientBlur";
import ProjectContainer from "./components/ParallaxContainer/ProjectContainer";
// Lazy load components that are not immediately visible
// const ProjectContainer = lazy(
//   () => import("./components/ParallaxContainer/ProjectContainer")
// );
const Background = lazy(() => import("./components/Background"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
          backgroundImage:
            "url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)",
          opacity: 0.075,
          borderRadius: 0,
        }}
      />
      <GradientBlur />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Suspense fallback={<div className="h-screen" />}>
          <ProjectContainer />
          <Background />
          <Testimonials />
          <Skills />
          <Experience />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
