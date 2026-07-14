import { expect, test } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { products } from '../src/data/products';
import { ProductItem } from '../src/pages/ProductItem';

// open inventory page using auth session
test.beforeEach(async ({ page }) => {
  const productsPage = new InventoryPage(page);

  await page.goto('/inventory.html');
  await productsPage.expectLoaded();
});

// verify a product can be added to the cart
test('User can add product to cart and verify the badge', async ({ page }) => {
  const productsPage = new InventoryPage(page);
  const bikeLight = new ProductItem(page, products.bikeLight.name);

  await bikeLight.addToCart();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
});

// verify user can remove product from inventory page
test('User can remove product from inventory page', async ({ page }) => {
  const productsPage = new InventoryPage(page);
  const bikeLight = new ProductItem(page, products.bikeLight.name);
  const boltTShirt = new ProductItem(page, products.boltTShirt.name);

  await bikeLight.addToCart();
  await expect(bikeLight.removeButton).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');

  await boltTShirt.addToCart();
  await expect(boltTShirt.removeButton).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('2');

  await boltTShirt.removeFromCart();
  await expect(boltTShirt.addButton).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
});

// verify user can remove product from cart page
test('User can remove product from cart page', async ({ page }) => {
  const productsPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const bikeLight = new ProductItem(page, products.bikeLight.name);
  const boltTShirt = new ProductItem(page, products.boltTShirt.name);
  const bikeLightPrice = await bikeLight.getPrice();
  const boltTShirtPrice = await boltTShirt.getPrice();

  await bikeLight.addToCart();
  await expect(bikeLight.removeButton).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');

  await boltTShirt.addToCart();
  await expect(boltTShirt.removeButton).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('2');

  await productsPage.cartLink.click();
  await cartPage.expectLoaded();
  await bikeLight.expectQuantity('1');
  await boltTShirt.expectQuantity('1');
  await bikeLight.expectPrice(bikeLightPrice);
  await boltTShirt.expectPrice(boltTShirtPrice);

  await bikeLight.removeFromCart();
  await expect(bikeLight.removeButton).not.toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
  await boltTShirt.removeFromCart();
  await expect(boltTShirt.removeButton).not.toBeVisible();
  await expect(productsPage.shoppingCartBadge).not.toBeVisible();
});
