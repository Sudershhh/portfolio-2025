import React from "react";

const experiences = [
  {
    role: "Design Lead",
    company: "Geonode",
    period: "Jan 2020 - Jan 2023",
  },
  {
    role: "Lead UX/UI Designer",
    company: "Truely",
    period: "Jan 2018 - Jan 2020",
  },
  {
    role: "Senior Product Designer",
    company: "Nicey Consulting",
    period: "Jun 2016 - Present",
  },
  {
    role: "Co-Founder",
    company: "BrandingMag",
    period: "Jan 2011 - Jun 2015",
  },
];

function Experience() {
  return (
    <div className="py-20 relative max-w-7xl mx-auto">
      <h2 className="text-5xl mb-16 text-zinc-100 font-light">Experience</h2>

      <div className="flex flex-col divide-y divide-zinc-700/50 mt-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex items-center justify-between group py-8 relative  transition-all duration-300"
          >
            <div className="space-y-1">
              <h3 className="text-3xl text-zinc-100 font-light tracking-wide">
                {exp.role}
              </h3>
            </div>

            <div className="text-right space-y-1">
              <h4 className="text-2xl text-zinc-100 font-light">
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
