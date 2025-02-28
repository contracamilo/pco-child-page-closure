import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  use: {
    headless: true,
    launchOptions: {
      headless: 'new',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
}); 