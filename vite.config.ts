import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        main: '/index.html',
        second: '/second.html'
      },
      external: /^lit/
    }
  }
}); 