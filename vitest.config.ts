import path from 'path';
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        exclude: [...configDefaults.exclude],
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        },
      },
});
