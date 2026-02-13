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
    sitemap({
      filter: (page) => !page.includes('forms-demo') && !page.includes('i18n-demo'),
      customPages: [
        'https://www.onlinenexusmarketing.com/',
        'https://www.onlinenexusmarketing.com/who-am-i',
        'https://www.onlinenexusmarketing.com/what-gets-handled',
        'https://www.onlinenexusmarketing.com/faq',
      ],
    }),
  ],
  redirects: {
    '/about-us': '/who-am-i',
    '/how-it-works': '/what-gets-handled',
    '/expert-level-social-media-google-advertising-team': '/what-gets-handled',
    '/businesses-without-websites-miss-out': '/',
    '/contact': '/',
    '/services': '/what-gets-handled',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
