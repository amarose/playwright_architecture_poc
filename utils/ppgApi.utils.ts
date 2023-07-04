import { Page, chromium } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const apiHost =
  process.env.ENV === "prod"
    ? "https://api.pushpushgo.com"
    : "https://api.master1.qappg.co";

type Token = {
  token: string;
};

interface UserInfoLS {
  id: string;
  organization: string;
}

interface ApiMethods {
  methods: "POST" | "PUT" | "DELETE" | "GET";
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
  private async getToken(): Promise<string> {
    const ppgLocalStorageToken: string = await this.page.evaluate(() => {
      const localStorageToken = localStorage.getItem("queen_token");
      return localStorageToken ? JSON.parse(localStorageToken) : null;
    });
    return ppgLocalStorageToken;
  }

  //custom request method
  async customPpgRequest(
    method: ApiMethods["methods"],
    endpoint: string,
    optionalData?: any,
  ): Promise<any> {
    try {
      const finalEndpoint = apiHost + endpoint;
      const token = await this.getToken();
      const response = await fetch(finalEndpoint, {
        method: method,
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(optionalData),
      });

      if (!response.ok) {
        throw new Error(
          "PPG request failed with status code: " +
            response.status +
            "\n" +
            response.statusText,
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}
