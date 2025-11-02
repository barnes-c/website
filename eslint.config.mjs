import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "dist/**"] },

  js.configs.recommended,

  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...(tseslint.configs.recommended.rules ?? {}),
      ...(tseslint.configs.recommendedTypeChecked.rules ?? {}),
      ...(tseslint.configs.strictTypeChecked.rules ?? {}),
      ...(tseslint.configs.stylisticTypeChecked.rules ?? {}),

      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "warn",

      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "react", importNames: ["default"], message: "Use named imports from React." }
          ],
          patterns: ["../*../*../*"]
        }
      ]
    }
  },

  {
    files: [
      "**/*.{js,mjs,cjs}",
      "eslint.config.js",
      "next.config.ts",
      "postcss.config.*",
      "tailwind.config.*",
      "tsup.config.*",
      "vitest.config.*",
      "bunfig.*"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node }
    },
    rules: {
      "no-undef": "off"
    }
  }
];
