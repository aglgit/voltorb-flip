import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["src/**/*.{js,mjs,cjs,ts}"] },
    { ignores: ["**/node_modules/**", "dist/"] },
    { plugins: { vitest } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
