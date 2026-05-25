import { defineConfig } from 'tsup';

export default defineConfig([
  {
    globalName: 'polpo',
    entry: {
      components: './src/components/index.ts',
      hooks: './src/hooks/index.ts',
      layouts: './src/layouts/index.ts',
      types: './src/types/index.ts',
      helpers: './src/helpers/index.ts',
    },
    dts: {
      compilerOptions: {
        incremental: false,
      },
    },
    outDir: './dist',
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
  },
]);
