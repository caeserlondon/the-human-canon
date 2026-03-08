import { test, expect } from "@playwright/test";

test.describe("Books page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/books");
  });

  test("displays books page with header", async ({ page }) => {
    await expect(page.getByTestId("books-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: /the canon/i })).toBeVisible();
  });

  test("displays books grid or empty state", async ({ page }) => {
    const grid = page.getByTestId("books-grid");
    const emptyState = page.getByText(/canon is being built/i);
    await expect(grid.or(emptyState)).toBeVisible();
  });

  test("search filters books", async ({ page }) => {
    const searchInput = page.getByTestId("search-input");
    await searchInput.fill("plato");
    await searchInput.press("Enter");

    await expect(page).toHaveURL(/q=plato/);
    const grid = page.getByTestId("books-grid");
    const emptyState = page.getByText(/canon is being built/i);
    await expect(grid.or(emptyState)).toBeVisible();
  });

  test("clicking a book navigates to book detail", async ({ page }) => {
    const grid = page.getByTestId("books-grid");
    if (!(await grid.isVisible())) {
      test.skip(true, "No books in database - run seed first");
    }
    const firstBookLink = grid.getByRole("link").first();
    const bookTitle = await firstBookLink.locator("h2, h3").first().textContent();
    await firstBookLink.click();

    await expect(page).toHaveURL(/\/books\/.+/);
    await expect(page.getByTestId("book-detail")).toBeVisible();
    if (bookTitle) {
      await expect(page.getByRole("heading", { name: bookTitle.trim() })).toBeVisible();
    }
  });

  test("book detail page has back link", async ({ page }) => {
    await page.goto("/books/meditations-marcus-aurelius");
    await expect(page.getByRole("link", { name: /back to canon/i })).toBeVisible();
    await page.getByRole("link", { name: /back to canon/i }).click();
    await expect(page).toHaveURL("/books");
  });
});
