import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";

// vite.config.js
export default defineConfig({
    // config options
    plugins: [VitePWA(
        {
            registerType: "autoUpdate",
            manifest: {
                name: "MasterMind",
                short_name: "MasterMind",
                theme_color: "#000000",
                icons: [
                    {
                        src: "./icon.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
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