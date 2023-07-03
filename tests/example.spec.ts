import { Page, test } from "@playwright/test";
import { LoginPage } from "../pages/example.page";
import { loginData } from "../test-data/login.data";

test.describe("User login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/")
  });

  test("login success", async () => {
    //Arrange
    const userName = loginData.correctUserName;
    const pwd = loginData.correctUserPassword;

    //Act
    await loginPage.login(userName, pwd);

    //Assert
    await loginPage.verification();
    await loginPage.ppgRequestTest();
  });

  test("login by API", async () => {
    //Arrange
    const credentials = loginData

    //Act
    await loginPage.loginByApiTest(credentials.correctUserName, credentials.correctUserPassword)
    

    //Assert
    await loginPage.verification();
  })
});
