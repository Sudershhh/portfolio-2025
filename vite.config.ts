import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api/contact": {
        target: "http://localhost:8888/.netlify/functions/contact",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contact/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: false,
    sourcemap: false,
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks for better caching
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            // Other vendor dependencies
            return "vendor";
          }
        },
      },
    },
  },
});
