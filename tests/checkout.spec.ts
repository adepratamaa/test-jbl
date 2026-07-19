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
  const productItem = new ProductItem(page);
  const backpack = products[4].name;
  const bikeLight = products[0].name;

  const backpackPrice = await productItem.getPrice(backpack);
  const bikeLightPrice = await productItem.getPrice(bikeLight);
  const totalPrice = backpackPrice + bikeLightPrice;

  await productItem.addToCart(backpack);
  await productItem.addToCart(bikeLight);
  await expect(productsPage.shoppingCartBadge).toHaveText('2');
  await expect(productItem.removeButton(backpack)).toBeVisible();
  await expect(productItem.removeButton(bikeLight)).toBeVisible();

  await productsPage.cartLink.click();
  await cartPage.expectLoaded();
  await productItem.expectQuantity(backpack, '1');
  await productItem.expectQuantity(bikeLight, '1');

  await cartPage.goToCheckout();
  await checkoutPage.expectInformationLoaded();

  await checkoutPage.fillInformation(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.zipCode(),
  );

  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewLoaded();
  await productItem.expectQuantity(backpack, '1');
  await productItem.expectQuantity(bikeLight, '1');
  await productItem.expectPrice(backpack, backpackPrice);
  await productItem.expectPrice(bikeLight, bikeLightPrice);
  await expect(checkoutPage.subTotal).toHaveText(`Item total: $${totalPrice}`);

  await checkoutPage.finishCheckout();
  await checkoutPage.expectCompleteLoaded();

  await checkoutPage.backHomeButton.click();
  await productsPage.expectLoaded();
});
