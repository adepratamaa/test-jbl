import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CartPage } from '../src/pages/CartPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { products } from '../src/data/products';
import { ProductItem } from '../src/pages/ProductItem';
import { CheckoutPage } from '../src/pages/CheckoutPage';

// verify checkout can be completed
test('User can checkout the cart', async ({ page }) => {
  const productsPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('/inventory.html');
  await productsPage.expectLoaded();

  const cartPage = new CartPage(page);
  const backpack = new ProductItem(page, products.backpack.name);
  const bikeLight = new ProductItem(page, products.bikeLight.name);
  const backpackPrice = await backpack.getPrice();
  const bikeLightPrice = await bikeLight.getPrice();

  await backpack.addToCart();
  await bikeLight.addToCart();
  await expect(productsPage.shoppingCartBadge).toHaveText('2');
  await expect(backpack.removeButton).toBeVisible();
  await expect(bikeLight.removeButton).toBeVisible();

  await productsPage.cartLink.click();
  await cartPage.expectLoaded();
  await backpack.expectQuantity('1');
  await bikeLight.expectQuantity('1');

  await cartPage.goToCheckout();
  await checkoutPage.expectInformationLoaded();

  await checkoutPage.fillInformation(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.zipCode(),
  );

  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewLoaded();
  await backpack.expectQuantity('1');
  await bikeLight.expectQuantity('1');
  await backpack.expectPrice(backpackPrice);
  await bikeLight.expectPrice(bikeLightPrice);
  await expect(backpack.subtotal).toHaveText(
    `Item total: $${backpackPrice + bikeLightPrice}`,
  );

  await checkoutPage.finishCheckout();
  await checkoutPage.expectCompleteLoaded();

  await checkoutPage.backHomeButton.click();
  await productsPage.expectLoaded();
});
