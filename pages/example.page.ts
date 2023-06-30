import { Locator, Page, expect } from "@playwright/test";
import { PpgApi } from "../utils/ppgApi.utils";

export class LoginPage extends PpgApi {
  constructor(page: Page) {
    super(page);
  }

  ppgApi = new PpgApi(this.page);

  loginInput: Locator = this.page.locator("input[type='email']");
  passwordInput: Locator = this.page.locator("input[type='password']");
  loginButton: Locator = this.page.locator("button[type='submit']");

  verificationLogo: Locator = this.page.locator("img[alt='PPG Logo']");

  async login(userName: string, password: string): Promise<void> {
    await this.loginInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verification(): Promise<void> {
    await expect(this.verificationLogo).toBeVisible();
  }
}
