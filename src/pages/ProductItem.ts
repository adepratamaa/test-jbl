import { expect, type Page, Locator } from '@playwright/test';

export class ProductItem {
  readonly page: Page;
  readonly inventoryItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.getByTestId('inventory-item');
  }

  // locate a product by its displayed name
  productByName(productName: string) {
    return this.inventoryItem.filter({
      hasText: productName,
    });
  }

  addButton(productName: string) {
    return this.productByName(productName).getByRole('button', {
      name: 'Add to cart',
    });
  }

  removeButton(productName: string) {
    return this.productByName(productName).getByRole('button', {
      name: 'Remove',
    });
  }

  quantity(productName: string) {
    return this.productByName(productName).getByTestId('item-quantity');
  }

  price(productName: string) {
    return this.productByName(productName).getByTestId('inventory-item-price');
  }

  async addToCart(productName: string) {
    await expect(this.productByName(productName)).toBeVisible();
    await this.addButton(productName).click();
  }

  async removeFromCart(productName: string) {
    await expect(this.productByName(productName)).toBeVisible();
    await this.removeButton(productName).click();
  }

  async expectQuantity(productName: string, quantity: string) {
    await expect(this.quantity(productName)).toHaveText(quantity);
  }

  // read the displayed currency value and return it as a number
  async getPrice(productName: string) {
    await expect(this.price(productName)).toBeVisible();
    const priceText = await this.price(productName).innerText();
    return Number(priceText.replace('$', ''));
  }

  async expectPrice(productName: string, productPrice: number) {
    await expect(this.price(productName)).toHaveText(`$${productPrice}`);
  }
}
