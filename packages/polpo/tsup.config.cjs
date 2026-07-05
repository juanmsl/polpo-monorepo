import postcss from 'esbuild-postcss';
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      components: './src/components/index.ts',
      hooks: './src/hooks/index.ts',
      layouts: './src/layouts/index.ts',
      types: './src/types/index.ts',
      helpers: './src/helpers/index.ts',
    },
    outDir: './dist',
    dts: true,
    bundle: true,
    minify: true,
    sourcemap: false,
    target: 'node24',
    format: ['cjs', 'esm'],
    banner: {
      js: '"use client";',
    },
    clean: true,
    splitting: false,
    esbuildTarget: 'esnext',
    external: ['react', 'react-dom'],
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    esbuildPlugins: [postcss()],
    esbuildOptions: options => {
      options.packages = 'external';
    },
  },
]);
