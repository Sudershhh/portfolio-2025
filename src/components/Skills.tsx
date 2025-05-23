function Skills() {
  const skills = {
    design: [
      "UX Design",
      "Product Design",
      "Consulting",
      "Design Systems",
      "Front-End Development",
      "Workshops",
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
    ],
  };

  return (
    <div className="py-20 relative max-w-6xl mx-auto ">
      <h2 className="text-5xl mb-10 text-zinc-100 font-extralight">Skills</h2>

      <div className="flex flex-col gap-4 mt-8 w-11/12 ">
        <div className="flex flex-wrap gap-4 justify-start">
          {skills.design.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] text-neutral-200 hover:bg-zinc-800/50 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-start">
          {skills.process.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 backdrop-blur-sm border border-zinc-800/50 rounded-md px-3 py-2.5 text-[15px] text-neutral-200 hover:bg-zinc-800/50 transition-colors"
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
