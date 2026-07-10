import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-test',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: authFile,
      },
    },
    // {
    //   name: 'firefox',
    //   dependencies: ['setup'],
    //   use: {
    //     browserName: 'firefox',
    //     storageState: authFile,
    //   },
    // },
    // {
    //   name: 'webkit',
    //   dependencies: ['setup'],
    //   use: {
    //     browserName: 'webkit',
    //     storageState: authFile,
    //   },
    // },
  ],
});
