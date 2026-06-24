import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo E2E Tests', () => {
  test('1. Successful login with valid credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('2. Failed login with wrong password shows error message', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Username and password do not match');
  });

  test('3. Add Sauce Labs Backpack to cart and verify badge shows 1', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('4. Remove item from cart and verify cart is empty', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('5. Complete full checkout flow and verify order confirmation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await expect(page).toHaveURL(`${BASE_URL}/cart.html`);
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await expect(page).toHaveURL(`${BASE_URL}/checkout-step-two.html`);
    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(`${BASE_URL}/checkout-complete.html`);
  });
});
