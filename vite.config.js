import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        developments: 'developments.html',
        developmentDetail: 'development-detail.html',
        contact: 'contact.html',
      },
    },
  },
});
