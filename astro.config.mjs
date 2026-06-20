// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Custom domain (canonical). `sirous.uk` 301-redirects here via Cloudflare.
  site: 'https://ashkan.sirous.uk',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});