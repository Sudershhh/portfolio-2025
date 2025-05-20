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
        title="dm.AI"
        description="With user-centered approach, the goals was to create an intuitive interface for effortless financial management"
        imageUrl={dm}
      />

      <Project
        title="Revamping an E-Commerce Website"
        description="Focus was to create a user-friendly interface that simplified the process of accessing premium operational web scraping proxies."
        imageUrl={aio}
        stats={[
          { label: "Usability", value: "85%" },
          { label: "User Retention", value: "70%" },
        ]}
        hasButton
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
