/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'bypass-polpo-internal-css',
      enforce: 'pre',
      resolveId(source, importer) {
        if (source.endsWith('.styles.css') && (importer?.includes('polpo') || source.includes('polpo'))) {
          return '\0virtual:void-style.css';
        }

        return null;
      },
      load(id) {
        if (id === '\0virtual:void-style.css') {
          return '';
        }

        return null;
      },
    },
  ],
  build: {
    manifest: true,
    sourcemap: 'hidden',
    cssCodeSplit: false,
    commonjsOptions: {
      include: [/polpo/, /node_modules/],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    include: ['polpo/components'],
  },
});
