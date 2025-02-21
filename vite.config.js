import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Make "@" point to "src"
    },
  },
  server: {
    host: "0.0.0.0", // Allows access from network
    allowedHosts: ["dyze-app.com"], // Add your custom hostname here
  },
});
