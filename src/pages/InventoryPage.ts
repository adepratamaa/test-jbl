import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly burgerButton: Locator;
  readonly logoutButton: Locator;
  readonly inventoryContainter: Locator;
  readonly shoppingCartBadge: Locator;

  // set up products page locators
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.burgerButton = page.getByTestId('open-menu');
    this.logoutButton = page.getByTestId('logout-sidebar-link');
    this.inventoryContainter = page.getByTestId('inventory-container');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  // verify the products page is displayed properly
  async expectLoaded() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryContainter).toBeVisible();
  }
}
