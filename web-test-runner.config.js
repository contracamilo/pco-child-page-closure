import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

// Get output directory from environment variable or use default
const outputDir = process.env.WTR_OUTPUT_DIR || './test-results';

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        args: ['--no-sandbox']
      },
    }),
  ],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '30000',
      retries: 3,
      allowUncaught: true,
      forbidOnly: true
    }
  },
  reporters: [
    'dot',
    {
      name: 'json',
      options: {
        outputFile: `${outputDir}/results.json`
      }
    },
    {
      name: 'html',
      options: {
        outputDir: './test-report'
      }
    }
  ],
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
        <base href="/test/">
        <script>
          // Prevent navigation
          const _history = window.history;
          window.history = {
            ...window.history,
            pushState: () => {},
            replaceState: () => {}
          };

          // Mock window.location
          const _location = {
            origin: 'http://localhost:8000',
            href: 'http://localhost:8000/test',
            pathname: '/test',
            search: '',
            hash: '',
            reload: () => {},
            replace: () => {},
            assign: () => {}
          };

          Object.defineProperty(window, 'location', {
            get: () => _location,
            set: () => true,
            configurable: true,
            enumerable: true
          });

          // Mock window.opener
          Object.defineProperty(window, 'opener', {
            value: {
              postMessage: () => {}
            },
            writable: true,
            configurable: true,
            enumerable: true
          });

          // Mock window.open
          window.open = () => ({
            focus: () => {},
            postMessage: () => {}
          });

          // Mock crypto
          if (!window.crypto) {
            window.crypto = {
              randomUUID: () => 'test-id'
            };
          }

          // Prevent unload
          window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            event.returnValue = '';
          });
        </script>
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