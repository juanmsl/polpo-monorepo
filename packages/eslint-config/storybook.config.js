import { defineConfig } from 'eslint/config';
import reactConfig from "./react.config.js";
import storybook from "eslint-plugin-storybook";
import { FlatCompat } from "@eslint/eslintrc";

import path from "path";
import { fileURLToPath } from "url";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...reactConfig,
  ...compat.extends("plugin:storybook/recommended"),
  {
    files: ["**/*.stories.*"],
    plugins: {
      storybook: storybook,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...storybook.configs.recommended.rules,
      "storybook/no-redundant-story-name": "warn",
    },
  },
]);
