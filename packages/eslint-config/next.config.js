import { defineConfig } from 'eslint/config';
import reactConfig from "./react.config.js";
import onlyWarn from 'eslint-plugin-only-warn'
import pluginNext from "@next/eslint-plugin-next";

export default defineConfig([
  ...reactConfig,
  {
    plugins: {
      'only-warn': onlyWarn,
      "@next/next": pluginNext,
    },
    rules: {
      'react/function-component-definition': [
        "off",
        {
          "namedComponents": "arrow-function",
          "unnamedComponents": "arrow-function"
        }
      ],
    }
  }
]);
