import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  server: {
    watch: {
      usePolling: true, //necesario para actualizar cada modificación
    },
  },
  // Esto ayuda a que Vite encuentre mejor la raíz de tu proyecto
  root: "./",
});
