import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.getByLabel('Username or Email Address').fill('admin');
  await page.getByLabel('Password', { exact: true }).fill('admin');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Add New Media File' }).click();
  await page.getByLabel('Select Files').click();
  await page.getByLabel('Select Files').setInputFiles('65d4fb35-189e-4d9e-8be8-ada725cdf315.png');
  await page.getByLabel('65d4fb35-189e-4d9e-8be8-').first().click();
});