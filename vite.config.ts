import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa'; // Importer le plugin PWA

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Options du plugin PWA
      registerType: 'autoUpdate', // Enregistrer automatiquement le service worker

      manifest: {
        name: 'Mon Application PWA',
        short_name: 'Mon App',
        description: 'Une application installable en tant que PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Configuration de Workbox pour la gestion de la mise en cache
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
        clientsClaim: true, // Permet de contrôler les pages immédiatement après l'installation
        skipWaiting: true, // Active la mise à jour immédiate du service worker
      },
      devOptions: {
        enabled: true, // Activer les options en développement
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
