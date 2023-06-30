import { test } from "@playwright/test";
import { LoginPage } from "../pages/example.page";
import { loginData } from "../test-data/login.data";

test.describe("User login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test("login success", async () => {
    //Arrange
    const userName = loginData.correctUserName;
    const pwd = loginData.correctUserPassword;

    //Act
    await loginPage.login(userName, pwd);

    //Assert
    await loginPage.verification();
  });
});
