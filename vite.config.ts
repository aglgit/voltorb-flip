import { defineConfig } from "vite";

export default defineConfig({
    server: {
        hmr: true,
    },
    base: "/voltorb-flip/",
    resolve: {
        alias: {
            "@src": "/src",
        },
    },
});
