import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { copyFileSync, existsSync } from 'fs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    {
      name: 'copy-worker',
      hooks: {
        'astro:build:done': () => {
          if (existsSync('worker.js')) {
            copyFileSync('worker.js', 'dist/worker.js');
          }
        }
      }
    }
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});