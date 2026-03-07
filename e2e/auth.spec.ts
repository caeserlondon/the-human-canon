import { test, expect } from "@playwright/test";

test.describe("Sign in page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("displays sign in form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
    await expect(page.getByTestId("sign-in-form")).toBeVisible();
    await expect(page.getByTestId("sign-in-email")).toBeVisible();
    await expect(page.getByTestId("sign-in-password")).toBeVisible();
  });

  test("displays Google sign in button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
  });

  test("displays link to sign up", async ({ page }) => {
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();
    await page.getByRole("link", { name: /sign up/i }).click();
    await expect(page).toHaveURL("/sign-up");
  });

  test("email and password fields are required", async ({ page }) => {
    const form = page.getByTestId("sign-in-form");
    await form.getByRole("button", { name: /sign in/i }).click();
    // Form should not navigate (validation prevents submit)
    await expect(page).toHaveURL("/sign-in");
  });
});

test.describe("Sign up page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-up");
  });

  test("displays sign up form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /create an account/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
    await expect(page.getByTestId("sign-up-sign-in-link")).toBeVisible();
  });
});
