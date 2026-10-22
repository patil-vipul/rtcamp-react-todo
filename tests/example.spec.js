// @ts-check
import { test, expect } from '@playwright/test';
import {customTest} from './custom-fixtures.ts'
// test.beforeEach(async ({ page }) => {
//   // Go to the starting url before each test.
//   await page.goto('localhost:3000');
// });



async function toHaveAddTodoButton(page) {
  const selector = 'button[role="button"][name="Add Todo"]';
  try {
    await page.waitForSelector(selector, { timeout: 5000 });
    return await page.getByRole('button', { name: 'Add Todo' });
  } catch (error) {
    throw new Error(`Expected add todo button "${selector}" to exist`);
  }
}


test('has title', async ({ page }) => {
  await page.goto('localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React App/);
});

test('has todo button', async({page})=>{
  await page.goto('localhost:3000');
  expect.extend({ toHaveAddTodoButton }); // Use in your tests
  expect.toHaveAddTodoButton(page);
})

test('open todo dialog', async ({ page }) => {
  await page.goto('localhost:3000');
  let i = 0;
for(i=0;i<1000;i++){
  await page.getByRole('button', { name: 'Add Todo' }).click();
  await page.getByPlaceholder("Title").fill(i+" todo");
  await page.click('button[type="submit"]:has-text("Add")');
}
  // Click the get started link.
  // await page.getByRole('button', { name: 'Add Todo' }).click();
  // await page.getByPlaceholder("Title").fill("Complete QA Training");
  // await page.click('button[type="submit"]:has-text("Add")');
  // const firstTodoTitle = await page.$eval('.todo-item-content .todo-title', element => element.textContent);
  // await expect(firstTodoTitle).toBe("Complete QA Training");

  
  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('check image uploaded', async ({ page }) => {
    await page.goto('https://demo-site.local/wp-admin/upload.php');
    // await page.getByRole('button', { name: 'Add New Media File' }).click();

    await page.getByLabel('Username or Email Address',{ exact: true }).fill('admin');
    await page.getByLabel('Password', { exact: true }).fill('admin');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('button', { name: 'Add New Media File' }).click();
  await page.getByLabel('Select Files').click();

  await page.getByLabel('Select Files').setInputFiles('/Users/vipulpatil/Downloads/file-to-upload.png');

})

customTest('check fixture', async({login})=>{
  await expect(login).toHaveURL('https://demo-site.local/wp-admin/');
})