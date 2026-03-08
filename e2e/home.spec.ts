import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays hero section with headline and CTA", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /greatest books ever written/i })).toBeVisible();
    await expect(page.getByTestId("hero-cta")).toBeVisible();
    await expect(page.getByTestId("hero-cta")).toHaveText("Explore the Canon");
  });

  test("hero CTA navigates to books page", async ({ page }) => {
    await page.getByTestId("hero-cta").click();
    await expect(page).toHaveURL(/\/books/);
    await expect(page.getByTestId("books-page")).toBeVisible();
  });

  test("displays popular books section", async ({ page }) => {
    await expect(page.getByTestId("popular-books")).toBeVisible();
    await expect(page.getByRole("heading", { name: /popular in the canon/i })).toBeVisible();
  });

  test("popular books section displays content", async ({ page }) => {
    const popularSection = page.getByTestId("popular-books");
    await expect(popularSection).toBeVisible();
    const hasBooks = (await popularSection.getByRole("link").count()) > 0;
    const hasEmptyState = (await popularSection.getByText(/canon is being built/i).count()) > 0;
    expect(hasBooks || hasEmptyState).toBeTruthy();
  });

  test("displays FAQ section", async ({ page }) => {
    await expect(page.getByTestId("faq-section")).toBeVisible();
    await expect(page.getByRole("heading", { name: "FAQ" })).toBeVisible();
  });

  test("displays header and footer", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
  });
});
