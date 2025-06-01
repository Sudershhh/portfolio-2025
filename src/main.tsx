import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Function to load non-critical CSS
const loadStyles = () => {
  return new Promise<void>((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/index.css";
    link.onload = () => resolve();
    document.head.appendChild(link);
  });
};

const init = async () => {
  // Wait for critical font
  await document.fonts.load("1em Satoshi-Regular");

  // Render the app
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // Load non-critical styles
  await loadStyles();
};

// Start initialization
init().catch(console.error);
