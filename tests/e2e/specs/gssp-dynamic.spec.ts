import { test, expect } from '@playwright/test';

test.describe('getServerSideProps dynamic pages', () => {
  test('blog post "some-post"', async ({ page }) => {
    await page.goto('/blog-posts/some-post');

    await expect(page.locator('h1')).toHaveText('some-post');
  });

  test('blog post "other-post"', async ({ page }) => {
    await page.goto('/blog-posts/other-post');

    await expect(page.locator('h1')).toHaveText('other-post');
  });

  test('should navigate to blog-posts', async ({ page }) => {
    await page.goto('/blog-posts/some-post');

    await page.locator('a').click();

    await expect(page.locator('h1')).toHaveText('FALLBACK BLOG POSTS');
  });

  // FIXME nested slug paths [...slug] dont work - see https://github.com/kyle-mccarthy/nest-next/issues/101
  test.skip('any about page', async ({ page }) => {
    await page.goto('/about/any-page/nested');

    await expect(page.locator('h1')).toHaveText('ALL ABOUT');
  });
});
