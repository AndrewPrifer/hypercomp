import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "hypercomp/react": "/lib/useFilter",
      hypercomp: "/lib/main",
    },
  },
});
