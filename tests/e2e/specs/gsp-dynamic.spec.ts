import { test, expect } from '@playwright/test';

test.describe('getStaticProps dynamic pages', () => {
  test('page 1', async ({ page }) => {
    await page.goto('/1');

    await expect(page.locator('h1')).toHaveText('1');
  });

  test('page 2', async ({ page }) => {
    await page.goto('/2');

    await expect(page.locator('h1')).toHaveText('2');
  });

  test('fallback page 3', async ({ page }) => {
    await page.goto('/3');

    await expect(page.locator('h1')).toHaveText('3');
  });

  test('should navigate to home', async ({ page }) => {
    await page.goto('/1');

    await page.locator('a').click();

    await expect(page.locator('h1')).toHaveText('HOME');
  });
});
