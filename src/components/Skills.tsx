function Skills() {
  const skills = {
    design: [
      "UX Design",
      "UI Design",
      "Product Design",
      "Consulting",
      "Design Systems",
      "Front-End Development",
      "Workshops",
    ],
    process: [
      "Design Sprint",
      "Interaction Design",
      "User Testing",
      "Usability Testing",
      "UX Research",
      "Leadership",
      "Mentoring",
      "No-Code",
    ],
  };

  return (
    <div className="py-20 relative max-w-7xl mx-auto ">
      <h2 className="text-5xl mb-10 text-zinc-100 font-extralight">Skills</h2>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-wrap gap-4 justify-start">
          {skills.design.map((skill) => (
            <div
              key={skill}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-full px-6 py-2.5 text-[15px] text-zinc-100 hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-start">
          {skills.process.map((skill) => (
            <div
              key={skill}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-full px-6 py-2.5 text-[15px] text-zinc-100 hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className=" flex justify-start">
          <button className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-full px-6 py-2.5 text-[15px] text-zinc-100 hover:bg-zinc-800/50 transition-colors">
            + More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
