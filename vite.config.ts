import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Library build configuration
  if (command === 'build') {
    return {
      plugins: [
        vue(),
        dts({
          include: ['src/**/*.ts', 'src/**/*.tsx'],
          outDir: 'dist',
          copyDtsFiles: true,
        }),
      ],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'RevoGridColumnSelect',
          formats: ['umd'],
          fileName: () => 'main.js',
        },
        rollupOptions: {
          // Externalize dependencies that shouldn't be bundled
          external: [
            '@revolist/revogrid',
            '@revolist/revogrid/loader',
            'revo-dropdown',
            'revo-dropdown/loader'
          ],
          output: {
            exports: 'named',
            globals: {
              '@revolist/revogrid': '@revolist/revogrid',
              '@revolist/revogrid/loader': '@revolist/revogrid/loader',
              'revo-dropdown': 'revo-dropdown',
              'revo-dropdown/loader': 'revo-dropdown/loader'
            },
          },
        },
        outDir: 'dist',
        emptyOutDir: true,
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    };
  }

  // Dev server configuration
  return {
    plugins: [vue()],
    root: 'public',
    server: {
      port: 3332,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: '../distServe',
      emptyOutDir: true,
    },
  };
});
