import js from "@eslint/js";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist", "eslint.config.*"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-dom": reactDom,
      "react-refresh": reactRefresh,
      "react-x": reactX,
      "@typescript-eslint": tseslint.plugin,
    },

    languageOptions: {
      ecmaVersion: 2025,
      globals: globals.browser,
      parserOptions: {
        project: [
          "./tsconfig.node.json",
          "./tsconfig.app.json",
          "./tsconfig.test.json",
          "./tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      ...(reactHooks.configs["recommended-latest"]?.rules ?? {}),
      ...(reactRefresh.configs?.vite?.rules ?? {}),
      ...(reactX.configs["recommended-typescript"]?.rules ?? {}),
    },
  },
]);
