import { TextShine } from "./TextShine";

function Background() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center text-zinc-100 scroll-mt-[100px]">
      <p className=" text-base md:text-2xl">
        Software Engineer with expertise in <TextShine>React.js</TextShine> and{" "}
        <TextShine>Next.js</TextShine>, specializing in building scalable web
        applications.
      </p>

      <p className="text-base md:text-2xl">
        4+ years of experience crafting{" "}
        <TextShine>responsive interfaces</TextShine> and{" "}
        <TextShine>design systems</TextShine>
      </p>

      <p className="text-base md:text-2xl">
        Currently working as <TextShine>Founding Engineer</TextShine> at
        DataParts, building enterprise SaaS solutions.
      </p>
    </div>
  );
}

export default Background;
