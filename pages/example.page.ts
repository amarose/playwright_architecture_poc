import { Locator, Page, expect } from "@playwright/test";
import { PpgApi } from "../utils/ppgApi.utils";

export class LoginPage extends PpgApi {
  // private _userId: string;

  constructor(page: Page) {
    super(page);
    // this.initialize();
  }

  // async initialize() {
  //   this._userId = await this.ppgApi.customPpgRequest('GET', '/aai/user/ID')
  // }

  ppgApi = new PpgApi(this.page);

  loginInput: Locator = this.page.locator("input[type='email']");
  passwordInput: Locator = this.page.locator("input[type='password']");
  loginButton: Locator = this.page.locator("button[type='submit']");

  projectsButton: Locator = this.page.locator("a[href='/projects']");
  favouriteProjectsStar: Locator = this.page.locator(
    "button[aria-label='Add project to favourites']:first-child",
  );

  verificationLogo: Locator = this.page.locator("img[alt='PPG Logo']");

  async login(userName: string, password: string): Promise<void> {
    await this.loginInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navToProjects(): Promise<void> {
    await this.projectsButton.click();
  }

  async projectsViewVerification(): Promise<void> {
    await expect(this.favouriteProjectsStar).toBeVisible();
  }

  async loginVerification(): Promise<void> {
    await expect(this.verificationLogo).toBeVisible();
  }

  async ppgRequestTest(): Promise<void> {
    const response = await this.ppgApi.customPpgRequest("GET", `/aai/user`);
    console.log("PPG response: ", response);
  }
}
