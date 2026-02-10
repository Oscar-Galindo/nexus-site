import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from '@unocss/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.onlinenexusmarketing.com',
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    UnoCSS({
      injectReset: true,
    }),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
