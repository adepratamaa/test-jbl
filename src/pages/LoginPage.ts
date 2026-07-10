import { expect, type Locator, type Page } from '@playwright/test';
import { getEnv } from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // set up login page locators
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  // open the login page
  async open() {
    await this.page.goto('/');
  }

  // fill login credentials and submit the form
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // verify the login page is displayed properly
  async expectLoaded() {
    await expect(this.page).toHaveURL(getEnv('BASE_URL'));
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
