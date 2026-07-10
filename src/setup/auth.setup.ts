import { mkdirSync } from 'fs';
import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { getEnv } from '../config/env';

const authFile = 'playwright/.auth/user.json';

setup('authenticate standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login(
    getEnv('STANDARD_USERNAME'),
    getEnv('STANDARD_PASSWORD'),
  );
  await inventoryPage.expectLoaded();

  mkdirSync('playwright/.auth', { recursive: true });
  await page.context().storageState({ path: authFile });
});
