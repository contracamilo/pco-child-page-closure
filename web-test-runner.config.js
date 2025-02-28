import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        headless: 'new',
      },
    }),
  ],
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