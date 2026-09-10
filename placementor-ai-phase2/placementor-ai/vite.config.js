import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for PlaceMentor AI frontend.
// No backend/proxy is configured yet — Pallavi's API base URL
// will be added here later (see src/services/api.js).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
