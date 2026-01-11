import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import icon from "astro-icon";

export default defineConfig({
  site: 'https://seo-duisburg.com',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE'
        },
        lastmod: new Date()
      }
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/_astro/', '/fonts/', '/captions/']
        }
      ],
      sitemap: true,
      host: 'seo-duisburg.com'
    }),
    icon()
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'lexend': ['@fontsource-variable/lexend']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@heroicons/react', '@headlessui/react']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'seo-duisburg.com'
      }
    ]
  }
});