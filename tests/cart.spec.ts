import { expect, test } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { LoginPage } from '../src/pages/LoginPage';
import { getEnv } from '../src/config/env';
import { InventoryPage } from '../src/pages/InventoryPage';
import { products } from '../src/data/products';
import { ProductItem } from '../src/pages/ProductItem';

// log in before each cart test
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login(
    getEnv('STANDARD_USERNAME'),
    getEnv('STANDARD_PASSWORD'),
  );
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
  await bikeLight.expectPrice(products.bikeLight.price);
  await boltTShirt.expectPrice(products.boltTShirt.price);

  await bikeLight.removeFromCart();
  await expect(bikeLight.removeButton).not.toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
  await boltTShirt.removeFromCart();
  await expect(boltTShirt.removeButton).not.toBeVisible();
  await expect(productsPage.shoppingCartBadge).not.toBeVisible();
});
