function Skills() {
  const skills = {
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
    <div className="py-20 relative max-w-5xl mx-auto ">
      <h2 className="text-5xl mb-10 text-zinc-100 font-extralight">Skills</h2>

      <div className="flex flex-col gap-4 mt-8 w-full ">
        <div className="flex flex-wrap gap-4 justify-start">
          {skills.engineering.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] text-neutral-200 font-medium hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-start">
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
