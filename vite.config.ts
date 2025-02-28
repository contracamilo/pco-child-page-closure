import { defineConfig } from 'vite';
import { resolve } from 'path';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// Get the repository name from package.json or environment variable
const base = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/';

export default defineConfig({
  base,
  plugins: [
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
    }),
    NodeModulesPolyfillPlugin(),
    {
      name: 'crypto-polyfill',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'crypto-polyfill.js',
          source: `window.crypto = window.crypto || { getRandomValues: function(arr) { for (let i = 0; i < arr.length; i++) { arr[i] = Math.floor(Math.random() * 256); } return arr; } };`,
        });
      },
    }
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        second: resolve(__dirname, 'second.html')
      }
    },
    polyfillModulePreload: true
  },
  define: {
    global: {}
  }
}); 