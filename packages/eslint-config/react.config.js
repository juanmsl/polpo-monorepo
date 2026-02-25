import { defineConfig } from 'eslint/config';
import baseConfig, { prettierConfig } from "./base.config.js";
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        React: true,
        JSX: true,
      }
    },
    rules: {
      'react/destructuring-assignment': ['error', 'always'],
      'react/jsx-fragments': ['error', 'syntax'],
      "react/jsx-no-target-blank": ['error', {
        "allowReferrer": true,
      }],
      'react/jsx-no-useless-fragment': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'prettier/prettier': [
        'error',
        {
          ...prettierConfig,
          plugins: []
        },
      ],
    },
  }
]);
