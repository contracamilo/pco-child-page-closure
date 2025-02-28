import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

// Get output directory from environment variable or use default
const outputDir = process.env.WTR_OUTPUT_DIR || './test-results';

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' })
  ],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '30000',
    }
  },
  reporters: ['dot', 'verbose'],
  testRunner: {
    coverage: true,
    coverageConfig: {
      reportDir: `${outputDir}/coverage`,
      reporters: ['json', 'html', 'text'],
      exclude: ['**/node_modules/**/*', '**/test/**/*']
    },
    browserStartTimeout: 60000,
    testsStartTimeout: 60000,
    testsFinishTimeout: 60000,
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
        <script type="module">
          window.process = { env: { NODE_ENV: 'test' } };
          window.global = window;
        </script>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  coverageConfig: {
    exclude: ['**/node_modules/**/*', '**/test/**/*'],
  },
}; 