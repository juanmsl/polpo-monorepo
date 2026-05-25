import { defineConfig } from 'tsup';

const config = {
  globalName: 'polpo',
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'node20',
  format: ['esm', 'cjs'],
  banner: {
    js: '"use client";',
  },
  clean: false,
  splitting: false,
  esbuildTarget: 'es2020',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  loader: {
    '.css': 'local-css',
  },
  esbuildOptions: options => {
    options.packages = 'external';
  },
};

export default defineConfig([
  {
    ...config,
    dts: {
      compilerOptions: {
        incremental: false,
      },
    },
    entry: {
      components: './src/components/index.ts',
      hooks: './src/hooks/index.ts',
      layouts: './src/layouts/index.ts',
      types: './src/types/index.ts',
      helpers: './src/helpers/index.ts',
    },
    outDir: './dist',
  },
  {
    ...config,
    entry: {
      index: './src/index.ts',
    },
    format: ['esm'],
    outDir: './dist/all',
  },
]);
