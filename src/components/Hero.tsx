import profilePic from "@/assets/profile-pic.jpg";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import resume from "@/assets/Sri_Sudersan_Resume.pdf";
import { carouselIcons } from "@/data/projects";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 z-10">
      {/* Profile Image */}
      <img
        src={profilePic}
        alt="Profile"
        className="w-40 h-40 md:w-40 md:h-40 rounded-full border-none shadow-lg object-cover my-8 relative z-10"
        style={{
          boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)",
          imageRendering: "auto", // Prevents pixelation
        }}
      />
      <h1
        className="text-center text-4xl md:text-5xl font-semibold leading-tight mb-8"
        style={{ letterSpacing: "-0.02em" }}
      >
        <span
          className="inline-block text-5xl mb-8"
          style={{
            backgroundImage:
              "radial-gradient(61% 200% at 39.7% 21.9%, rgb(255, 255, 255) 0%, rgba(0, 0, 0, 0.35) 130%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "max(0em, calc((1.3em - 1.3em) / 2))",
          }}
        >
          Sri Sudersan
        </span>
      </h1>
      {/* Subheading */}
      <p className="text-center text-gray-300 max-w-xl text-lg md:text-xl font-normal ">
        Crafting lightning-fast frontends and robust full-stack solutions for
        Startups and Enterprises.
      </p>
      <Button
        className="bg-black text-white font-medium py-3 px-6 rounded-full shadow-none border-none outline-none h-auto min-h-0 min-w-0 text-base md:text-base my-8 hover:bg-neutral-900 transition-colors w-auto"
        asChild
      >
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-full"
          style={{ width: "auto" }}
        >
          Download Resume
        </a>
      </Button>
      {/* Icons Carousel Row */}{" "}
      <div className="relative mx-auto w-1/2 overflow-hidden mt-10">
        <div
          className="flex gap-8 md:gap-14 items-center animate-carousel group"
          style={{
            width: "max-content",
            animation: "carousel-x 120s linear infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          <TooltipProvider>
            {carouselIcons.map((tech, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div
                    className="relative w-20 h-20 rounded-4xl bg-[rgb(18,18,18)] flex items-center justify-center shadow-lg transition-opacity duration-300"
                    style={{
                      boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
                    }}
                  >
                    <img
                      src={tech.src}
                      alt={`${tech.name} logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={6}
                  className="bg-white/95  border-none shadow-lg px-3 py-2"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-sm tracking-wide text-black/90 dark:text-white/90">
                      {tech.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 max-w-[160px] leading-tight">
                      {tech.description}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>{" "}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l  z-10" />
      </div>
    </section>
  );
}
