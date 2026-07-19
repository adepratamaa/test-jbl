import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;

  // set up cart and checkout page locators
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartList = page.getByTestId('cart-list');
    this.checkoutButton = page.getByTestId('checkout');
  }

  // verify the cart page is displayed properly
  async expectLoaded() {
    await expect(this.page).toHaveURL('/cart.html');
    await expect(this.title).toHaveText('Your Cart');
    await expect(this.cartList).toBeVisible();
  }

  // open the checkout information page
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
