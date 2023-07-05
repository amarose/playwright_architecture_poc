import { Page, chromium } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const apiHost =
  process.env.ENV === "prod"
    ? "https://api.pushpushgo.com"
    : "https://api.master1.qappg.co";

interface IUserInfoLS {
  id: string;
  organization: string;
}

interface IApiMethods {
  methods: "POST" | "PUT" | "DELETE" | "GET";
}

export class PpgApi {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Get localStorage item
  async getValueFromLocalStorage(item: string): Promise<any> {
    const ppgLocalStorageUserInfo = await this.page.evaluate((item) => {
      const localStorageJson = localStorage.getItem(item);
      return localStorageJson ? JSON.parse(localStorageJson) : null;
    }, item);
    return ppgLocalStorageUserInfo;
  }
  //project ID

  //website integration ID

  //organization ID
  async getOrganizationId(): Promise<string> {
    const ppgLocalStorage: IUserInfoLS = await this.getValueFromLocalStorage(
      "queen_auth_user_id",
    );
    return ppgLocalStorage.organization;
  }

  //user ID
  async getUserId(): Promise<string> {
    const ppgLocalStorage: IUserInfoLS = await this.getValueFromLocalStorage(
      "queen_auth_user_id",
    );
    return ppgLocalStorage.id;
  }

  //token
  private async getToken(): Promise<string> {
    const ppgLocalStorage = await this.getValueFromLocalStorage("queen_token");
    return ppgLocalStorage;
  }

  //custom request method
  async customPpgRequest(
    method: IApiMethods["methods"],
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
