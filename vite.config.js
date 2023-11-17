// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react-swc'
// import { VitePWA } from 'vite-plugin-pwa';


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh(), react(), VitePWA()],
// })
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'My PWA',
      short_name: 'My App',
      start_url: '/',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: [
        {
          src: 'icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  }),]
})
