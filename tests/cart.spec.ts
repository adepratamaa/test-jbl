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
  const productItem = new ProductItem(page);
  const bikeLight = products[0];

  await productItem.addToCart(bikeLight.name);
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
});

// verify user can remove product from inventory page
test('User can remove product from inventory page', async ({ page }) => {
  const productsPage = new InventoryPage(page);
  const productItem = new ProductItem(page);
  const bikeLight = products[0];
  const boltTShirt = products[1];

  await productItem.addToCart(bikeLight.name);
  await expect(productItem.removeButton(bikeLight.name)).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');

  await productItem.addToCart(boltTShirt.name);
  await expect(productItem.removeButton(boltTShirt.name)).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('2');

  await productItem.removeFromCart(boltTShirt.name);
  await expect(productItem.addButton(boltTShirt.name)).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
});

// verify user can remove product from cart page
test('User can remove product from cart page', async ({ page }) => {
  const productsPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const productItem = new ProductItem(page);
  const bikeLight = products[0];
  const boltTShirt = products[1];
  const bikeLightPrice = await productItem.getPrice(bikeLight.name);
  const boltTShirtPrice = await productItem.getPrice(boltTShirt.name);

  await productItem.addToCart(bikeLight.name);
  await expect(productItem.removeButton(bikeLight.name)).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');

  await productItem.addToCart(boltTShirt.name);
  await expect(productItem.removeButton(boltTShirt.name)).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('2');

  await productsPage.cartLink.click();
  await cartPage.expectLoaded();
  await productItem.expectQuantity(bikeLight.name, '1');
  await productItem.expectQuantity(boltTShirt.name, '1');
  await productItem.expectPrice(bikeLight.name, bikeLightPrice);
  await productItem.expectPrice(boltTShirt.name, boltTShirtPrice);

  await productItem.removeFromCart(bikeLight.name);
  await expect(productItem.removeButton(bikeLight.name)).not.toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');
  await productItem.removeFromCart(boltTShirt.name);
  await expect(productItem.removeButton(boltTShirt.name)).not.toBeVisible();
  await expect(productsPage.shoppingCartBadge).not.toBeVisible();
});
