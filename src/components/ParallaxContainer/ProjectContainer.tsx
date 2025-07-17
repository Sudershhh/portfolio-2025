import Project from "./Project";
import projects from "@/data/projects";

function ProjectContainer() {
  return (
    <div className="flex flex-col items-center justify-start mt-4 md:mt-8 p-2">
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </div>
  );
}

export default ProjectContainer;
