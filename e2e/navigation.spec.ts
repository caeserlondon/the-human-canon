import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
	test('header nav links work', async ({ page }) => {
		await page.goto('/')

		await page.getByTestId('nav').getByRole('link', { name: 'Books' }).click()
		await expect(page).toHaveURL('/books')

		await page.getByTestId('nav').getByRole('link', { name: 'Authors' }).click()
		await expect(page).toHaveURL('/authors')

		await page.getByTestId('nav').getByRole('link', { name: 'Home' }).click()
		await expect(page).toHaveURL('/')

		await page.getByTestId('nav').getByRole('link', { name: 'About' }).click()
		await expect(page).toHaveURL('/about')

		await page.getByTestId('nav').getByRole('link', { name: 'Contact' }).click()
		await expect(page).toHaveURL('/contact')
	})

	test('logo links to home', async ({ page }) => {
		await page.goto('/books')
		await page.getByRole('link', { name: 'The Human Canon' }).first().click()
		await expect(page).toHaveURL('/')
	})

	test('footer links work', async ({ page }) => {
		await page.goto('/')

		await page
			.getByTestId('footer')
			.getByRole('link', { name: 'About' })
			.click()
		await expect(page).toHaveURL('/about')

		await page
			.getByTestId('footer')
			.getByRole('link', { name: 'Privacy Policy' })
			.click()
		await expect(page).toHaveURL('/privacy')

		await page
			.getByTestId('footer')
			.getByRole('link', { name: 'Terms' })
			.click()
		await expect(page).toHaveURL('/terms')

		await page
			.getByTestId('footer')
			.getByRole('link', { name: 'Contact' })
			.click()
		await expect(page).toHaveURL('/contact')

		await page
			.getByTestId('footer')
			.getByRole('link', { name: 'Public Domain' })
			.click()
		await expect(page).toHaveURL('/public-domain')
	})

	test('search submits and navigates to books with query', async ({ page }) => {
		await page.goto('/')
		await page.getByTestId('search-input').fill('aristotle')
		await page.getByTestId('search-input').press('Enter')
		await expect(page).toHaveURL(/\/books\?q=aristotle/)
	})
})
