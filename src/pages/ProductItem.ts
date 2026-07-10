import { expect, type Locator, type Page } from '@playwright/test';

export class ProductItem {
  readonly page: Page;
  readonly productName: string;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.productName = productName;
  }

  get root() {
    return this.page.getByTestId('inventory-item').filter({
      hasText: this.productName,
    });
  }

  get addButton() {
    return this.root.getByRole('button', { name: 'Add to cart' });
  }

  get removeButton() {
    return this.root.getByRole('button', { name: 'Remove' });
  }

  get quantity() {
    return this.root.getByTestId('item-quantity');
  }

  get price() {
    return this.root.getByTestId('inventory-item-price');
  }

  async addToCart() {
    await expect(this.root).toBeVisible();
    await this.addButton.click();
  }

  async removeFromCart() {
    await expect(this.root).toBeVisible();
    await this.removeButton.click();
  }

  async expectQuantity(quantity: string) {
    await expect(this.quantity).toHaveText(quantity);
  }

  async expectPrice(price: string) {
    await expect(this.price).toHaveText(price);
  }
}
