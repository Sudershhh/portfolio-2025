function Skills() {
  const skills = {
    overall: [
      "Frontend Development",
      "UI Components",
      "AI Streaming",
      "Responsive Design",
      "Web Performance",
      "Full Stack Engineering",
    ],

    engineering: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Node.js",
      "HTML",
      "CSS",
      "SASS/SCSS",
      "Tailwind CSS",
    ],

    database: [
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Firebase",
      "Figma",
      "Docker",
      "CI/CD (Github Actions)",
    ],
  };

  return (
    <div className="py-20 relative max-w-5xl mx-auto mt-8">
      <h2 className="text-5xl mb-10 text-zinc-100 font-extralight text-center sm:text-start">
        Skills
      </h2>

      <div className="flex flex-col gap-4 mt-8 w-full justify-center items-center sm:justify-start sm:items-start">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {skills.overall.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] text-neutral-200 font-medium hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {skills.engineering.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] text-neutral-200 font-medium hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {skills.database.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] font-medium text-neutral-200 hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className=" flex justify-start">
          <button className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] text-neutral-200 hover:bg-zinc-800/50 transition-colors">
            + More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
