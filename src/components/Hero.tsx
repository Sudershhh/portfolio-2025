import profilePic from "@/assets/profile-pic.jpg";
import { Button } from "@/components/ui/button";
import htmlLogo from "@/assets/html.svg";
import cssLogo from "@/assets/css.svg";
import tailwindLogo from "@/assets/tailwind.svg";
import reactLogo from "@/assets/react.svg";
import reduxLogo from "@/assets/redux.svg";
import nextjsLogo from "@/assets/nextjs.svg";
import pythonLogo from "@/assets/python.svg";
import figmaLogo from "@/assets/figma.svg";
import javaScriptLogo from "@/assets/javascript.svg";
import typescriptLogo from "@/assets/typescript.svg";
import nodeLogo from "@/assets/nodejs.svg";
import mongoLogo from "@/assets/mongodb.svg";
import expressLogo from "@/assets/express.svg";
import postgresLogo from "@/assets/postgresql.svg";
import redisLogo from "@/assets/redis.svg";
import firebaseLogo from "@/assets/firebase.svg";
import awsLogo from "@/assets/aws.svg";
import resume from "@/assets/Sri_Sudersan_Resume.pdf";

const icons = [
  htmlLogo,
  cssLogo,
  figmaLogo,
  tailwindLogo,
  javaScriptLogo,
  typescriptLogo,
  reactLogo,
  nextjsLogo,
  pythonLogo,
  nodeLogo,
  mongoLogo,
  reduxLogo,
  expressLogo,
  postgresLogo,
  redisLogo,
  firebaseLogo,
  awsLogo,
];

const carouselIcons = [...icons, ...icons];

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
        className="bg-black text-white font-medium py-3 px-6 rounded-full shadow-none border-none outline-none h-auto min-h-0 min-w-0 text-base md:text-lg my-8 hover:bg-neutral-900 transition-colors w-auto"
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
      {/* Icons Carousel Row */}
      <div className="relative mx-auto w-1/2 overflow-hidden mt-10">
        <div
          className="flex gap-8 md:gap-14 items-center animate-carousel"
          style={{
            width: "max-content",
            animation: "carousel-x 80s linear infinite",
          }}
        >
          {carouselIcons.map((logo, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-4xl bg-neutral-900 flex items-center justify-center shadow-lg transition-opacity duration-700"
              style={{
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
                opacity: 1,
              }}
            >
              <img
                src={logo}
                alt="tech logo"
                className="w-10 h-10 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-transparent to-transparent z-10" />
      </div>
    </section>
  );
}
