import { test, expect } from '@playwright/test';
import { loginUsers } from '../src/data/loginUsers';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';

// run this test file without any saved login session.
test.use({ storageState: { cookies: [], origins: [] } });

test(`User login with valid credentials`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.expectLoaded();
  await loginPage.login(loginUsers[0].username, loginUsers[0].password);
  await inventoryPage.expectLoaded();
});

test(`User login with invalid credentials`, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.expectLoaded();
  await loginPage.login(loginUsers[1].username, loginUsers[1].password);
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});
