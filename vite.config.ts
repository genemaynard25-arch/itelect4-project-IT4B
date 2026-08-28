import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- NEW

import path from "path";
export default defineConfig({
  plugins: [react(), tailwindcss()], // <-- tailwindcss() is NEW
  resolve: {
    alias: {
      // import.meta.dirname, not __dirname: this file is an ES module.
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});