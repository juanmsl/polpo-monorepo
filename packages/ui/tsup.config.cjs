import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    components: './src/components/index.ts',
    hooks: './src/hooks/index.ts',
    helpers: './src/helpers/index.ts',
  },
  outDir: './dist',
  dts: true,
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'node20',
  format: ['cjs', 'esm'],
  banner: {
    js: '"use client";',
  },
  clean: true,
  splitting: false,
  esbuildTarget: 'es2020',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  esbuildOptions: options => {
    options.packages = 'external';
  },
});
