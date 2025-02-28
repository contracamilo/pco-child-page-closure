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
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
    }),
  ],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '10000',
      retries: 3
    }
  },
  testRunner: {
    coverage: false,
    failZero: false,
  },
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'es2020',
      tsconfig: './tsconfig.json'
    })
  ],
  middleware: [
    function rewriteBase(context, next) {
      return next();
    },
  ],
  testRunnerHtml: testFramework => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="icon" href="data:,">
      </head>
      <body>
        <script type="module">
          // Import test framework and make it available globally
          import { mocha } from '@web/test-runner-mocha';
          window.mocha = mocha;
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  coverageConfig: {
    exclude: ['**/node_modules/**/*', '**/test/**/*'],
  },
}; 