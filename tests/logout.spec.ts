import { test, expect } from '@playwright/test';
import { loginUsers } from '../src/data/loginUsers';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';

test.use({ storageState: { cookies: [], origins: [] } });

test(`User can logout`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.expectLoaded();
  await loginPage.login(loginUsers[0].username, loginUsers[0].password);
  await inventoryPage.expectLoaded();

  await inventoryPage.burgerButton.click({ force: true });
  await expect(inventoryPage.logoutButton).toBeVisible();
  await inventoryPage.logoutButton.click();
  await loginPage.expectLoaded();
});
