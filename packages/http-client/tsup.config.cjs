import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    outDir: './dist',
    dts: true,
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'node24',
    format: ['cjs', 'esm'],
    clean: true,
    splitting: false,
    esbuildTarget: 'esnext',
    esbuildOptions: options => {
      options.packages = 'external';
    },
  },
]);
