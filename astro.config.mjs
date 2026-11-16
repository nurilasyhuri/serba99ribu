import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://serba99ribu.com',
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ],
  server: {
    port: 4323,
    host: true
  }
});
