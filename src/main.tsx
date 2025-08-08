import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Import styles directly
import "./index.css";

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
};

// Start initialization
init().catch(console.error);
