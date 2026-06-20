// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User-pages site served at the apex — no `base` needed (that's only for project pages).
  site: 'https://ashkansirous.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});