const experiences = [
  {
    role: "Founding Engineer",
    company: "Kivane Tech (Dataparts)",
    period: "Dec 2024 - Present",
  },
  {
    role: "Full Stack Engineer",
    company: "Curajoy",
    period: "Oct 2024 - Mar 2025",
  },
  {
    role: "Frontend Engineer",
    company: "One Community Global",
    period: "Jun 2024 - Oct 2024",
  },
  {
    role: "Frontend Web3 Intern",
    company: "VanEck",
    period: "June 2023 - Aug 2023",
  },
  {
    role: "Full Stack Engineer",
    company: "TCS (American Express)",
    period: "Aug 2021 - Aug 2022",
  },
];

function Experience() {
  return (
    <div className="py-20 relative max-w-5xl mx-auto" id="experience">
      <h2 className="text-5xl mb-16 text-zinc-100 font-normal tracking-tight">
        Experience
      </h2>

      <div className="flex flex-col divide-y divide-zinc-700/50 mt-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex items-center justify-between group py-8 relative  transition-all duration-300"
          >
            <div className="space-y-1">
              <h3 className="text-[20px] text-zinc-400 font-light tracking-wide">
                {exp.role}
              </h3>
            </div>

            <div className="text-right space-y-1">
              <h4 className="text-2xl text-zinc-400 font-light">
                {exp.company}
              </h4>
              <p className="text-sm text-zinc-400">{exp.period}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
