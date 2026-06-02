import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    outDir: './dist',
    dts: true,
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'node20',
    format: ['cjs', 'esm'],
    clean: true,
    splitting: false,
    esbuildTarget: 'es2020',
    esbuildOptions: options => {
      options.packages = 'external';
    },
  },
]);
