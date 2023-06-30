import { Page } from "@playwright/test";

type Token = {
  token: string;
};

interface UserInfoLS {
  id: string;
  organization: string;
}

export class PpgApi {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //project ID

  //website integration ID

  //organization ID
  async getOrganizationId(): Promise<string> {
    const ppgLocalStorageUserInfo: UserInfoLS = await this.page.evaluate(() => {
      const localStorageJson = localStorage.getItem("queen_auth_user_id");
      return localStorageJson ? JSON.parse(localStorageJson) : null;
    });
    return ppgLocalStorageUserInfo.organization;
  }

  //user ID
  async getUserId(): Promise<string> {
    const ppgLocalStorageUserInfo: UserInfoLS = await this.page.evaluate(() => {
      const localStorageJson = localStorage.getItem("queen_auth_user_id");
      return localStorageJson ? JSON.parse(localStorageJson) : null;
    });
    return ppgLocalStorageUserInfo.id;
  }

  //token
  async getToken(): Promise<string> {
    const ppgLocalStorageToken: string = await this.page.evaluate(() => {
      const localStorageToken = localStorage.getItem("queen_token");
      return localStorageToken ? JSON.parse(localStorageToken) : null;
    });
    return ppgLocalStorageToken;
  }

  //custom request method
}
