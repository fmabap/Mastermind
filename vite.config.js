import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";

// vite.config.js
export default defineConfig({
    // config options
    plugins: [VitePWA(
        {
            registerType: "autoUpdate",
            strategies: "injectManifest",
            includeAssets: ["favicon.png", "icon.png"],
            manifest: {
                name: "MasterMind",
                short_name: "MasterMind",
                description: "Play Mastermind game offline",
                theme_color: "#000000",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "./index.html",
                icons: [
                    {
                        src: "./icon.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        }),
    viteSingleFile()],
    base: "./",
    build: {
        outDir: "./docs",
        publicDir: "./public"
    }
});