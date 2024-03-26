# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

PWA with React + Vite
npm install vite-plugin-pwa --save-dev
<!-- index.html -->
<head>
  <link rel="manifest" href="/manifest.json">
</head>
<!-- vite.config.js -->
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA()],
)}
Create a manifest.json file in the root directory of your project.
npm run build
npx serve dist# Alkhaleej_frontend
