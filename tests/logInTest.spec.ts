import { test as base, chromium } from "@playwright/test";
import { MyFixtures } from "../my-fixtures";
import { injectLoginPage } from "../page-objects/login/Login";
import { LOGIN_DATA } from "../constans/loginData";
import { injectDashboardPage } from "../page-objects/dashboard/Dashboard";

const test = base.extend<MyFixtures>({
  dashboardPage: injectDashboardPage,
  loginPage: injectLoginPage,
});

test.describe("01 Login test", () => {
  test("Go to URL, click Log In wait for active LogIn button, set email and password values, then verify redirect URL and LogIn button is disabled", async ({
    dashboardPage,
    loginPage,
    page,
  }) => {

    await loginPage.visit();
    await loginPage.login(LOGIN_DATA.EMAIL,LOGIN_DATA.PASSWORD);
    await page.waitForTimeout(1000000);
    await page.pause();
    await page.waitForTimeout(1000000);
    dashboardPage.
  });
});
