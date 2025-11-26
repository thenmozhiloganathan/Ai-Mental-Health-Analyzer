import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Ai-Mental-Health-Analyzer/",  // ⭐ REQUIRED for GitHub Pages
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
