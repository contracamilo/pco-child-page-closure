import { defineConfig } from 'vite';
import { resolve } from 'path';

// Get the repository name from package.json or environment variable
const base = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/';

export default defineConfig({
  base,
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
    }
  }
}); 