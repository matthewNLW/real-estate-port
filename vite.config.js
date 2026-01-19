import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        developments: resolve(__dirname, "developments.html"),
        developmentDetail: resolve(__dirname, "development-detail.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
