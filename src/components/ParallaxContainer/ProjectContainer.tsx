import Project from "./Project";
import dm from "@/assets/projects/dm.PNG";
import aio from "@/assets/projects/AIO.PNG";
import invoice from "@/assets/projects/Invoice ai.PNG";
import apple from "@/assets/projects/Apple.webp";
import searchEngine from "@/assets/projects/Google Clone.webp";
import chatApp from "@/assets/projects/Slack Clone.webp";
import eCommerce from "@/assets/projects/Shopping App.webp";

function ProjectContainer() {
  return (
    <section className="flex flex-col items-center justify-center">
      <Project
        title="AI Agent Platform"
        imageUrl={dm}
        description="AI Agent Assistant is a modern web platform that brings together multiple AI tools into a single, intuitive interface. With a user-centered approach, the goal was to create a seamless experience for content analysis and research, allowing users to effortlessly analyze YouTube videos, search through books, and access Wikipedia knowledge through natural conversations with AI agents."
      />

      <Project
        title="dm.AI"
        description="With user-centered approach, the goals was to create an intuitive interface for effortless financial management, With user-centered approach, the goals was to create an intuitive interface for effortless financial management"
        imageUrl={dm}
      />

      <Project
        title="Revamping an E-Commerce Website"
        description="Focus was to create a user-friendly interface that simplified the process of accessing premium operational web scraping proxies."
        imageUrl={aio}
      />

      <Project
        title="Developing a Mobile Health Application"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={invoice}
      />

      <Project
        title="Developing a Mobile Health Application"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={searchEngine}
      />

      <Project
        title="Developing a Mobile Health Application"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={chatApp}
      />

      <Project
        title="Developing a Mobile Health Application"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={eCommerce}
      />
      <Project
        title="Developing a Mobile Health Application"
        description="Creating an accessible health monitoring solution for patients with chronic conditions."
        imageUrl={apple}
      />
    </section>
  );
}

export default ProjectContainer;
