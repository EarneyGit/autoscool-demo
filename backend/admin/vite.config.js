import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: parseInt(import.meta.env.VITE_PORT || "3001", 10),
      host: true,
      proxy: {
        "/api": {
          target: import.meta.env.VITE_API_URL || "http://localhost:8000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            query: ["@tanstack/react-query"],
            forms: ["react-hook-form", "@hookform/resolvers", "zod"],
            ui: ["@headlessui/react", "@heroicons/react"],
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@tanstack/react-query",
        "react-hook-form",
        "@hookform/resolvers/zod",
        "zod",
        "@headlessui/react",
        "@heroicons/react/24/outline",
        "@heroicons/react/24/solid",
        "axios",
        "clsx",
      ],
    },
  });
};
