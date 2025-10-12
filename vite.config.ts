import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "esnext",
    sourcemap: true,
  },
  optimizeDeps: { esbuildOptions: { target: "esnext" } }
});
