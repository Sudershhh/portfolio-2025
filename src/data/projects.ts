// Import SVG icons
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

// Import project images - these will be loaded lazily
const agentImage = () =>
  import("../assets/projects/agent.webp").then((m) => m.default);
const dmImage = () =>
  import("../assets/projects/dm.webp").then((m) => m.default);
const aioImage = () =>
  import("../assets/projects/AIO.webp").then((m) => m.default);
const invoiceImage = () =>
  import("../assets/projects/Invoice ai.webp").then((m) => m.default);
const appleImage = () =>
  import("../assets/projects/Apple.webp").then((m) => m.default);

interface TechInfo {
  src: string;
  name: string;
  description: string;
}

const techStack: TechInfo[] = [
  {
    src: htmlLogo,
    name: "HTML",
    description: "Standard markup language for web pages",
  },
  {
    src: cssLogo,
    name: "CSS",
    description: "Style sheet language for web design",
  },
  {
    src: figmaLogo,
    name: "Figma",
    description: "Design tool for creating and collaborating",
  },
  {
    src: tailwindLogo,
    name: "Tailwind",
    description: "Utility-first CSS framework for rapid development",
  },
  {
    src: javaScriptLogo,
    name: "JavaScript",
    description: "Dynamic programming language for web apps",
  },
  {
    src: typescriptLogo,
    name: "TypeScript",
    description: "Typed superset of JavaScript for scalability",
  },
  {
    src: reactLogo,
    name: "React",
    description: "UI library for building user interfaces",
  },
  {
    src: nextjsLogo,
    name: "Next.js",
    description: "React framework for production-grade apps",
  },
  {
    src: pythonLogo,
    name: "Python",
    description: "Versatile language for backend development",
  },
  {
    src: nodeLogo,
    name: "Node.js",
    description: "JavaScript runtime for server-side development",
  },
  {
    src: mongoLogo,
    name: "MongoDB",
    description: "NoSQL database for modern applications",
  },
  {
    src: reduxLogo,
    name: "Redux",
    description: "State management for JavaScript apps",
  },
  {
    src: expressLogo,
    name: "Express",
    description: "Web framework for Node.js applications",
  },
  {
    src: postgresLogo,
    name: "PostgreSQL",
    description: "Powerful open-source relational database",
  },
  {
    src: redisLogo,
    name: "Redis",
    description: "In-memory data structure store/cache",
  },
  {
    src: firebaseLogo,
    name: "Firebase",
    description: "Platform for mobile and web applications",
  },
  {
    src: awsLogo,
    name: "AWS",
    description: "Cloud computing services platform",
  },
];

export const carouselIcons = [...techStack, ...techStack];

interface Project {
  title: string;
  description: string;
  imageUrl: Promise<string>;
  demoUrl?: string;
  githubUrl?: string;
  bgColor?: string;
}

const projects: Project[] = [
  {
    title: "AI Agent Platform",
    description:
      "AI Agent Assistant is a modern web platform that brings together multiple AI tools into a single, intuitive interface. With a user-centered approach, the goal was to create a seamless experience for content analysis and research, allowing users to effortlessly analyze YouTube videos, search through books, and access Wikipedia knowledge through natural conversations with AI agents.",
    imageUrl: agentImage(),
    demoUrl: "https://ai-agents-murex.vercel.app",
    githubUrl: "https://github.com/Sudershhh/ai-agents",
    bgColor: "rgb(130, 201, 94)",
  },
  {
    title: "dm.ai",
    description:
      "A practical Instagram automation tool that helps businesses manage their social media presence. Features include automated responses to comments and DMs, customizable message templates, and AI-powered conversation handling for better engagement with followers.",
    imageUrl: dmImage(),
    demoUrl: "https://saas-dm-automations.vercel.app/",
    githubUrl: "https://github.com/Sudershhh/saas-dm-automations",
    bgColor: "rgb(212, 135, 64)",
  },
  {
    title: "AIO Analysis",
    description:
      "A tool for web developers to analyze and improve their site's crawler accessibility. Checks robots.txt configurations, provides SEO recommendations, and helps optimize site structure for better search engine visibility.",
    imageUrl: aioImage(),
    demoUrl: "https://aio-analysis.vercel.app",
    githubUrl: "https://github.com/Sudershhh/AIO-Analysis",
    bgColor: "rgb(186, 138, 214)",
  },
  {
    title: "Invoice AI",
    description:
      "A straightforward invoice processing tool that uses AI to extract data from invoices. Simplifies data entry, organizes financial documents, and helps businesses manage their invoicing workflow more efficiently.",
    imageUrl: invoiceImage(),
    demoUrl: "https://invoice-intelligence.vercel.app",
    githubUrl: "https://github.com/Sudershhh/invoice-intelligence",
    bgColor: "rgb(201, 155, 94)",
  },
  {
    title: "Apple Landing Page",
    description:
      "A responsive recreation of Apple's homepage featuring smooth animations and clean design. Built with modern CSS and focusing on performance and mobile-first approach.",
    imageUrl: appleImage(),
    demoUrl: "https://apple-landing-page.netlify.app",
    githubUrl: "https://github.com/Sudershhh/Apple-Landing-Page",
    bgColor: "rgb(94, 201, 130)",
  },
];

export default projects;
