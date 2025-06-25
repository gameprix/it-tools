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

    await expect(page.getByText('GMT (UTC): Fri, 20 Jun 2025 20:48:00 GMT')).toBeVisible();
    await expect(page.getByText('Local Time: Fri, 20 Jun 2025, 13:48:00 GMT-7')).toBeVisible();
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

  test('Shows error if year is not 4 digits', async ({ page }) => {
    await page.getByPlaceholder('YYYY').fill('99');
    await page.getByRole('button', { name: 'Convert to Epoch (Local)' }).click();
    await expect(page.getByText('Year must be 4 digits')).toBeVisible();
  });

  test('Shows error if month is invalid', async ({ page }) => {
    await page.getByPlaceholder('MM').first().fill('00');
    await page.getByRole('button', { name: 'Convert to Epoch (Local)' }).click();
    await expect(page.getByText('Month must be between 1 and 12')).toBeVisible();
  });

  test('Shows error if day is invalid', async ({ page }) => {
    await page.getByPlaceholder('DD').fill('0');
    await page.getByRole('button', { name: 'Convert to Epoch (UTC)' }).click();
    await expect(page.getByText('Day must be between 1 and 31')).toBeVisible();
  });

  test('Shows error if hour is invalid', async ({ page }) => {
    await page.getByPlaceholder('HH').fill('24');
    await page.getByRole('button', { name: 'Convert to Epoch (Local)' }).click();
    await expect(page.getByText('Hour must be between 0 and 23')).toBeVisible();
  });

  test('Shows error if minute is invalid', async ({ page }) => {
    await page.getByPlaceholder('MM').nth(1).fill('61');
    await page.getByRole('button', { name: 'Convert to Epoch (UTC)' }).click();
    await expect(page.getByText('Minute must be between 0 and 59')).toBeVisible();
  });

  test('Shows error if second is invalid', async ({ page }) => {
    await page.getByPlaceholder('SS').fill('99');
    await page.getByRole('button', { name: 'Convert to Epoch (UTC)' }).click();
    await expect(page.getByText('Second must be between 0 and 59')).toBeVisible();
  });
});
