import EslintConfig from '@polpo/eslint-config/base';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...EslintConfig,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
