import { test, expect } from '@playwright/test';

test.describe('getServerSideProps pages', () => {
  test('blog posts', async ({ page }) => {
    await page.goto('/blog-posts');

    await expect(page.locator('h1')).toHaveText('BLOG POSTS');
  });

  test('should navigate to blog post "some-post"', async ({ page }) => {
    await page.goto('/blog-posts');

    await page.locator('a').click();

    await expect(page.locator('h1')).toHaveText('some-post');
  });
});
