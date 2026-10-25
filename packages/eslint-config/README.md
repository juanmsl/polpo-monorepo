# polpo-eslint-config

Shared ESLint 9 (flat config) presets used by the Polpo projects: TypeScript, imports, Prettier formatting, React, Next.js and Storybook.

[![npm version](https://badge.fury.io/js/polpo-eslint-config.svg)](https://www.npmjs.com/package/polpo-eslint-config)

## Installation

```bash
npm install -D polpo-eslint-config eslint prettier
```

```bash
pnpm add -D polpo-eslint-config eslint prettier
```

The plugins and parsers come with the package; you only need `eslint` and `prettier` (used by `eslint-plugin-prettier`). It requires ESLint 9 with flat config (`eslint.config.js`).

## Usage

Create an `eslint.config.js` and spread the preset that matches your project:

```js
// eslint.config.js
import EslintConfig from 'polpo-eslint-config/react';
import { defineConfig } from 'eslint/config';

export default defineConfig([...EslintConfig]);
```

The import resolver reads the `tsconfig.json` of the directory where ESLint runs, so run ESLint from the project root (or the package folder in a monorepo).

| Preset | Import | For |
| --- | --- | --- |
| Base | `polpo-eslint-config` or `polpo-eslint-config/base` | TypeScript/JavaScript projects: libraries, Node.js, APIs |
| React | `polpo-eslint-config/react` | React apps and libraries (Vite, etc.) |
| Next.js | `polpo-eslint-config/next` | Next.js apps |
| Storybook | `polpo-eslint-config/storybook` | React projects with Storybook stories |

Each preset extends the previous one: `base` → `react` → `next` / `storybook`.

Add your own rules or ignores after the preset:

```js
export default defineConfig([
  ...EslintConfig,
  { ignores: ['storybook-static/**'] },
  { rules: { 'no-console': 'off' } },
]);
```

## What it enforces

### Base

- **Recommended rules** of `@eslint/js` and `typescript-eslint`. Unused variables are warnings (prefix them with `_` to ignore them) and `any` is not allowed.
- **Formatting with Prettier** as an ESLint rule:
  - `printWidth: 120`;
  - single quotes, also in JSX;
  - semicolons and trailing commas;
  - `arrowParens: 'avoid'`.
- **Imports** (`eslint-plugin-import`, TypeScript resolver):
  - ordered and alphabetized groups separated by blank lines;
  - no cycles, no namespace imports, no duplicates and no extraneous dependencies;
  - unused imports are removed (`unused-imports`).
- **Style:**
  - `Array<T>` instead of `T[]`;
  - `eqeqeq`;
  - comments above the code and multi-line comments as `/* */` blocks;
  - blank lines around `return`, `if`, loops and `switch`;
  - `no-console` as a warning.
- **Ignored paths:** `dist`, `.next`, `node_modules` and `*.d.ts`. Browser and Node.js globals are enabled.

The Prettier options are also exported, in case you want to share them with your editor:

```js
import { prettierConfig } from 'polpo-eslint-config/base';
```

### React

`eslint-plugin-react` recommended rules plus:

- `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps` as errors;
- props destructuring (`react/destructuring-assignment`);
- `<>` fragments instead of `<Fragment>`;
- no need to import React for JSX.

### Next.js

The React preset, with the `@next/eslint-plugin-next` and `eslint-plugin-only-warn` plugins registered.

### Storybook

The React preset plus the recommended `eslint-plugin-storybook` rules for `*.stories.*` files.

## Fixing problems

Most rules are auto-fixable:

```bash
npx eslint . --fix
```

## License

MIT

## Author

Developed by [Juan Manuel Sánchez Lozano](https://juanmsl.com). Part of the [Polpo monorepo](https://github.com/juanmsl/polpo-monorepo).
