import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  base: "/gallery-api",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    watch: {
      usePolling: true, //necesario para actualizar cada modificación
    },
  },

  // Esto ayuda a que Vite encuentre mejor la raíz de tu proyecto
  root: "./",
});
