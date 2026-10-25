# polpo-typescript-config

Shared `tsconfig.json` presets used by the Polpo projects: a strict base plus presets for React libraries, Vite apps, Next.js apps and Node.js.

[![npm version](https://badge.fury.io/js/polpo-typescript-config.svg)](https://www.npmjs.com/package/polpo-typescript-config)

## Installation

```bash
npm install -D polpo-typescript-config typescript
```

```bash
pnpm add -D polpo-typescript-config typescript
```

## Usage

Extend the preset that matches your project in your `tsconfig.json`, and add the project specific options (`include`, paths, output directories...):

```json
{
  "extends": "polpo-typescript-config/vite",
  "include": ["src"],
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```

| Preset | Import | For |
| --- | --- | --- |
| Base | `polpo-typescript-config` or `polpo-typescript-config/base` | Shared strict options, extended by every other preset |
| React library | `polpo-typescript-config/react-library` | React component libraries (e.g. built with tsup) |
| Vite | `polpo-typescript-config/vite` | React apps with Vite |
| Next.js | `polpo-typescript-config/nextjs` | Next.js apps |
| Node.js | `polpo-typescript-config/nodejs` | Node.js services, APIs and libraries |

## Presets

### Base

- `strict: true`, `noUnusedLocals`, `noUnusedParameters` and `noFallthroughCasesInSwitch`.
- `isolatedModules`, `esModuleInterop`, `resolveJsonModule`, `forceConsistentCasingInFileNames` and `skipLibCheck`.
- `declaration` and `declarationMap` enabled.
- `lib`: `ESNext`, `DOM` and `DOM.Iterable`; `moduleResolution: "node"`.

### React library

Base + `jsx: "react-jsx"`, `module` and `target` `ESNext`. Declarations are emitted, ready for bundlers like tsup.

### Vite

Base + `jsx: "react-jsx"`, `moduleResolution: "bundler"`, `noEmit` (Vite does the build), `useDefineForClassFields` and `allowSyntheticDefaultImports`.

### Next.js

Base + the `next` TypeScript plugin, `jsx: "preserve"`, `moduleResolution: "bundler"`, `allowJs`, `noEmit` and incremental builds.

### Node.js

Base + extra strictness:

- `exactOptionalPropertyTypes` and `noImplicitReturns`;
- the explicit `strict*` flags;
- `experimentalDecorators` and source maps;
- `module` and `target` `ESNext`.

## License

MIT

## Author

Developed by [Juan Manuel Sánchez Lozano](https://juanmsl.com). Part of the [Polpo monorepo](https://github.com/juanmsl/polpo-monorepo).
