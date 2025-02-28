import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  testFramework: {
    config: {
      ui: 'tdd',
      timeout: '2000'
    }
  },
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'es2020',
      tsconfig: './tsconfig.json'
    })
  ],
  testRunnerHtml: testFramework => `
    <html>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
}; 