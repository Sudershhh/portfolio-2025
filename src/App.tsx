import Header from "@/components/Header";
import GradientBlur from "@/components/GradientBlur";
import Hero from "@/components/Hero";
import ProjectContainer from "./components/ParallaxContainer/ProjectContainer";

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
        <ProjectContainer />
      </div>
    </div>
  );
}

export default App;
