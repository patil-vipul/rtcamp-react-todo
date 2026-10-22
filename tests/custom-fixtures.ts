import {test,expect} from '@playwright/test';

exports.customTest = test.extend({
  login: async ({ page }, use) => {
    // Set up the fixture.
  
    await page.goto('https://demo-site.local/wp-login.php');
    await page.getByLabel('Username or Email Address').fill('admin');
    await page.getByLabel('Password', { exact: true }).fill('admin');
    await page.getByRole('button', { name: 'Log In' }).click();

    // Use the fixture value in the test.
    await use(page);

  
  },
});