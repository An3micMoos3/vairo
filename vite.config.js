import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/vairo/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["img/placeholder.webp"],
      manifest: {
        name: "Viro Vapes",
        short_name: "Viro Vapes",
        description: "Browse your local Viro Vapes store and order online.",
        theme_color: "#111111",
        background_color: "#111111",
        display: "standalone",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,webp,png,jpg,jpeg,svg,ico}"],
      },
    }),
  ],
});