import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
  retries: 1,
  reporter: [['html', { open: process.env.CI ? 'never' : 'on-failure' }]],
  quiet: true,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
};

export default config;
