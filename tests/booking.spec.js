import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationintesting.online';

test.describe('Restful Booker UI Tests', () => {
  test('1. Homepage loads and displays hotel name "Willow Creek Lodge"', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Willow Creek Lodge').first()).toBeVisible({ timeout: 15000 });
  });

  test('2. Rooms section is visible on the homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    const roomsSection = page.locator('#rooms');
    await expect(roomsSection).toBeVisible();
    await expect(roomsSection.locator('.room-card').first()).toBeVisible();
  });

  test('3. Fill out and submit the contact form', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator('[data-testid="ContactName"]').fill('John Doe');
    await page.locator('[data-testid="ContactEmail"]').fill('john@test.com');
    await page.locator('[data-testid="ContactPhone"]').fill('07700900982');
    await page.locator('[data-testid="ContactSubject"]').fill('Test Subject');
    await page.locator('[data-testid="ContactDescription"]').fill('This is a test message for QA automation');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Thanks for getting in touch').first()).toBeVisible({ timeout: 10000 });
  });

  test('4. Booking panel is visible with Check In and Check Out fields', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // The homepage has an availability checker with Check In / Check Out fields
    await expect(page.getByText('Check In').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Check Out').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Check Availability' })).toBeVisible();
  });
});
