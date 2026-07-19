import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;
  readonly subTotal: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  // set up checkout page locators
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.completeHeader = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
    this.subTotal = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
  }

  // verify the checkout information page is displayed properly
  async expectInformationLoaded() {
    await expect(this.page).toHaveURL('/checkout-step-one.html');
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  // fill customer checkout information
  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  // continue to the checkout overview page
  async continueToOverview() {
    await this.continueButton.click();
  }

  // verify the checkout overview page is displayed properly
  async expectOverviewLoaded() {
    await expect(this.page).toHaveURL('/checkout-step-two.html');
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  // finish checkout
  async finishCheckout() {
    await this.finishButton.click();
  }

  // verify checkout is complete
  async expectCompleteLoaded() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
