import { test, expect } from "@playwright/test";

test.describe("FAQ accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("faq-section").scrollIntoViewIfNeeded();
  });

  test("displays FAQ accordion items", async ({ page }) => {
    const accordionItems = page.getByTestId("accordion-item");
    await expect(accordionItems).toHaveCount(5);
  });

  test("expands accordion on click", async ({ page }) => {
    const firstButton = page.getByRole("button", { name: "Are these full book summaries?" });
    await firstButton.click();

    await expect(firstButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Yes. Each book page includes the full summary")).toBeVisible();
  });

  test("collapses accordion on second click", async ({ page }) => {
    const firstButton = page.getByRole("button", { name: "Are these full book summaries?" });
    await firstButton.click();
    await expect(firstButton).toHaveAttribute("aria-expanded", "true");

    await firstButton.click();
    await expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  test("multiple accordions can be open", async ({ page }) => {
    await page.getByRole("button", { name: "Are these full book summaries?" }).click();
    await page.getByRole("button", { name: "Do you include modern books?" }).click();

    await expect(page.getByText("Yes. Each book page includes the full summary")).toBeVisible();
    await expect(page.getByText("Only works that meet Canon standards")).toBeVisible();
  });
});
