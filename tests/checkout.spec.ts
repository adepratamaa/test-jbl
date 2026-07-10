import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CartPage } from '../src/pages/CartPage';
import { LoginPage } from '../src/pages/LoginPage';
import { getEnv } from '../src/config/env';
import { InventoryPage } from '../src/pages/InventoryPage';
import { products } from '../src/data/products';
import { ProductItem } from '../src/pages/ProductItem';
import { CheckoutPage } from '../src/pages/CheckoutPage';

// verify checkout can be completed
test('User can checkout the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();
  await loginPage.login(
    getEnv('STANDARD_USERNAME'),
    getEnv('STANDARD_PASSWORD'),
  );
  await productsPage.expectLoaded();

  const cartPage = new CartPage(page);
  const backpack = new ProductItem(page, products.backpack.name);

  await backpack.addToCart();
  await expect(backpack.removeButton).toBeVisible();
  await expect(productsPage.shoppingCartBadge).toHaveText('1');

  await productsPage.cartLink.click();
  await cartPage.expectLoaded();
  await backpack.expectQuantity('1');

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
  await backpack.expectPrice(products.backpack.price);

  await checkoutPage.finishCheckout();
  await checkoutPage.expectCompleteLoaded();

  await checkoutPage.backHomeButton.click();
  await productsPage.expectLoaded();
});
