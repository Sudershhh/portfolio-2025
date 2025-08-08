// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     chunkSizeWarningLimit: 1000,
//     cssCodeSplit: false,
//     sourcemap: false,
//   },
//   server: {
//     open: true,
//     port: 3000,
//   },
// });

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
  },
  assetsInclude: ["**/*.html"],
});
