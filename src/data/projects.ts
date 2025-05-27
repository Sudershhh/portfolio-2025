interface Project {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  bgColor: string;
  stats?: Array<{ label: string; value: string }>;
}

const projects: Project[] = [
  {
    title: "AI Agent Platform",
    description:
      "AI Agent Assistant is a modern web platform that brings together multiple AI tools into a single, intuitive interface. With a user-centered approach, the goal was to create a seamless experience for content analysis and research, allowing users to effortlessly analyze YouTube videos, search through books, and access Wikipedia knowledge through natural conversations with AI agents.",
    imageUrl: "/src/assets/projects/agent.PNG",
    demoUrl: "https://ai-agents-murex.vercel.app",
    githubUrl: "https://github.com/Sudershhh/ai-agents",
    bgColor: "rgb(130, 201, 94)",
  },
  {
    title: "dm.AI",
    description:
      "With user-centered approach, the goals was to create an intuitive interface for effortless financial management, With user-centered approach, the goals was to create an intuitive interface for effortless financial management",
    imageUrl: "/src/assets/projects/dm.PNG",
    demoUrl: "https://saas-dm-automations.vercel.app/",
    githubUrl: "https://github.com/Sudershhh/saas-dm-automations",
    bgColor: "rgb(212, 135, 64)",
  },
  {
    title: "AIO Analysis",
    description:
      "Focus was to create a user-friendly interface that simplified the process of accessing premium operational web scraping proxies.",
    imageUrl: "/src/assets/projects/AIO.PNG",
    demoUrl: "https://aio-analysis.vercel.app",
    githubUrl: "https://github.com/Sudershhh/AIO-Analysis",
    bgColor: "rgb(186, 138, 214)",
  },
  {
    title: "Invoice AI",
    description:
      "Creating an accessible health monitoring solution for patients with chronic conditions.",
    imageUrl: "/src/assets/projects/Invoice ai.PNG",
    demoUrl: "https://invoice-intelligence.vercel.app",
    githubUrl: "https://github.com/Sudershhh/invoice-intelligence",
    bgColor: "rgb(201, 155, 94)",
  },
  {
    title: "Apple Landing Page",
    description:
      "Creating an accessible health monitoring solution for patients with chronic conditions.",
    imageUrl: "/src/assets/projects/Apple.webp",
    demoUrl: "https://apple-landing-page.netlify.app",
    githubUrl: "https://github.com/Sudershhh/Apple-Landing-Page",
    bgColor: "rgb(94, 201, 130)",
  },
];

export default projects;
