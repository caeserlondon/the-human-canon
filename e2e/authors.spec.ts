import { test, expect } from "@playwright/test";

test.describe("Authors page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/authors");
  });

  test("displays authors page with header", async ({ page }) => {
    await expect(page.getByTestId("authors-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: /authors/i })).toBeVisible();
  });

  test("displays authors grid or empty state", async ({ page }) => {
    const grid = page.getByTestId("authors-grid");
    const emptyState = page.getByText(/author profiles are being added/i);
    await expect(grid.or(emptyState)).toBeVisible();
  });

  test("clicking an author navigates to author detail", async ({ page }) => {
    const grid = page.getByTestId("authors-grid");
    if (!(await grid.isVisible())) {
      test.skip(true, "No authors in database - run seed first");
    }
    const firstAuthorLink = grid.getByRole("link").first();
    const authorName = await firstAuthorLink.locator("h2").first().textContent();
    await firstAuthorLink.click();

    await expect(page).toHaveURL(/\/authors\/.+/);
    await expect(page.getByTestId("author-detail")).toBeVisible();
    if (authorName) {
      await expect(page.getByRole("heading", { name: authorName.trim() })).toBeVisible();
    }
  });

  test("author detail page has back link", async ({ page }) => {
    await page.goto("/authors/plato");
    await expect(page.getByRole("link", { name: /back to authors/i })).toBeVisible();
    await page.getByRole("link", { name: /back to authors/i }).click();
    await expect(page).toHaveURL("/authors");
  });
});
