import Project from "./Project";
import dm from "../../assets/projects/dm.PNG";
import aio from "@/assets/projects/AIO.PNG";
import invoice from "@/assets/projects/Invoice ai.PNG";
import apple from "@/assets/projects/Apple.webp";
import searchEngine from "@/assets/projects/Google Clone.webp";

function ProjectContainer() {
  return (
    <section
      className="flex flex-col items-center justify-start mt-10"
      id="work"
    >
      <Project
        title="AI Agent Platform"
        imageUrl={dm}
        description="AI Agent Assistant is a modern web platform that brings together multiple AI tools into a single, intuitive interface. With a user-centered approach, the goal was to create a seamless experience for content analysis and research, allowing users to effortlessly analyze YouTube videos, search through books, and access Wikipedia knowledge through natural conversations with AI agents."
        bgColor="rgb(130, 201, 94)" // Green glow
      />

      <Project
        title="dm.AI"
        description="With user-centered approach, the goals was to create an intuitive interface for effortless financial management, With user-centered approach, the goals was to create an intuitive interface for effortless financial management"
        imageUrl={dm}
        bgColor="rgb(212, 135, 64)" // Blue glow
      />

      <Project
        title="AIO Analysis"
        description="Focus was to create a user-friendly interface that simplified the process of accessing premium operational web scraping proxies."
        imageUrl={aio}
        bgColor="rgb(186, 138, 214)" // Purple glow
      />

      <Project
        title="Invoice AI"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={invoice}
        bgColor="rgb(201, 155, 94)" // Orange glow
      />

      <Project
        title="Search Engine"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={searchEngine}
        bgColor="rgb(15, 100, 153)" // Teal glow
      />

      <Project
        title="Apple Landing Page"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={apple}
        bgColor="rgb(94, 201, 130)" // Green-blue glow
      />
    </section>
  );
}

export default ProjectContainer;
