import { test, expect } from '@playwright/test';

test.describe('getStaticProps pages', () => {
  test('homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('HOME');
  });

  test('should navigate to 1', async ({ page }) => {
    await page.goto('/');

    await page.locator('a').click();

    await expect(page.locator('h1')).toHaveText('1');
  });
});
