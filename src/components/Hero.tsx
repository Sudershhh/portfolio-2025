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

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 z-10">
      {/* Profile Image */}
      <img
        src={profilePic}
        alt="Profile"
        className="w-32 h-32 rounded-full border-none shadow-lg object-cover my-8 relative z-10"
        style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)" }}
      />

      <h1
        className="text-center text-4xl md:text-5xl font-medium leading-tight mb-8"
        style={{ letterSpacing: "-0.02em" }}
      >
        <span
          data-text-fill="true"
          className="inline-block text-6xl mb-6"
          style={{
            backgroundImage:
              "radial-gradient(61% 200% at 39.7% 21.9%, rgb(255, 255, 255) 0%, rgba(0, 0, 0, 0.35) 100%)",
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
      <p className="text-center text-gray-300 max-w-xl text-base md:text-lg font-normal ">
        Helping startups and brands to craft expressive and engaging solutions
        for their software needs.
      </p>
      {/* Buttons */}
      {/* <nav className="flex gap-4 mb-12 mt-6" aria-label="Resume download">
        <a
          href="#" // TODO: Replace with your resume link
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center"
          style={{ borderRadius: 118, minWidth: 180, minHeight: 48 }}
          aria-label="Download resume"
        >


          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(39.8% 73.9% at 32.4% 52.2%, rgb(181, 225, 255) 0%, rgba(181, 225, 255, 0) 100%)",
              borderRadius: 72,
              filter: "blur(15px)",
              opacity: 1,
              zIndex: 1,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-gradient-x"
            style={{
              background:
                "radial-gradient(36.1% 88.3% at 32.4% 52.2%, rgb(125, 203, 255) 0%, rgba(141, 209, 255, 0) 100%)",
              borderRadius: 72,
              opacity: 1,
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundColor: "rgb(10, 10, 10)",
              borderRadius: 114,
              opacity: 1,
              zIndex: 3,
            }}
          />
          <span
            className="relative z-10 flex items-center justify-center px-8 py-2"
            style={{ borderRadius: 114 }}
          >
            <Button
              asChild
              className="bg-transparent text-white font-semibold px-0 py-0 rounded-full shadow-none border-none outline-none h-auto min-h-0 min-w-0 text-base"
            >
              Download Resume
            </Button>
          </span>
        </a>
      </nav> */}

      <Button className="bg-black text-white font-semibold py-4 px-6 cursor-pointer rounded-full shadow-none border-none outline-none h-auto min-h-0 min-w-0 text-xs  m-4">
        Download Resume
      </Button>
      {/* Icons Carousel Row */}
      <div className="relative mx-auto w-1/2 overflow-hidden mt-20">
        <div
          className="flex gap-8 md:gap-10 items-center animate-carousel"
          style={{
            width: "max-content",
            animation: "carousel-x 60s linear infinite", // Increased from 18s to 30s
          }}
        >
          {icons.map((logo, i) => (
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
        {/* Gradient masks for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-transparent to-transparent z-10" />
      </div>
    </section>
  );
}
