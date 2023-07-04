import { test } from "../playwright/fixtures";
import { LoginPage } from "../pages/example.page";

// Copy&Paste from example.spec.ts. Only for testing parallel run
test.describe("User login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("login success 2", async () => {
    //Arrange

    //Act

    //Assert
    await loginPage.loginVerification();
    await loginPage.ppgRequestTest();
  });

  test("navigate to projects view", async () => {
    //Arrange

    //Act
    await loginPage.navToProjects();

    //Assert
    await loginPage.projectsViewVerification();
    await loginPage.ppgRequestTest();
  });
});

test.describe("User in app 2", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("login success", async () => {
    //Arrange

    //Act

    //Assert
    await loginPage.loginVerification();
    await loginPage.ppgRequestTest();
  });

  test("navigate to projects view", async () => {
    //Arrange

    //Act
    await loginPage.navToProjects();

    //Assert
    await loginPage.projectsViewVerification();
    await loginPage.ppgRequestTest();
  });
});
