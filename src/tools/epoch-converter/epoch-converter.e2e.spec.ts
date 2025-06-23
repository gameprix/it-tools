import { expect, test } from '@playwright/test';

test.describe('Tool - Epoch converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/epoch-converter');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Epoch converter - IT Tools');
  });

  test('Converts epoch to human-readable date', async ({ page }) => {
    await page.getByPlaceholder('Enter epoch timestamp').fill('1750452480');
    await page.getByRole('button', { name: 'Convert to Date' }).click();

    await expect(page.getByText('6/23/2025, 12:31:00 PM')).toBeVisible();
  });

  test('Converts known date to epoch timestamp', async ({ page }) => {
    await page.getByPlaceholder('YYYY').fill('2025');
    await page.getByPlaceholder('MM').first().fill('06');
    await page.getByPlaceholder('DD').fill('20');
    await page.getByPlaceholder('HH').fill('13');
    await page.getByPlaceholder('MM').nth(1).fill('48');
    await page.getByPlaceholder('SS').fill('00');

    await page.getByRole('button', { name: 'Convert to Epoch' }).click();

    await expect(page.getByText('1750452480')).toBeVisible();
  });
});
