import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
