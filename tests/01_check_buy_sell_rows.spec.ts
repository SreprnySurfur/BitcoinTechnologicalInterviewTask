import { test as base } from "@playwright/test";
import { MyFixtures } from "../my-fixtures";
import { injectLoginPage } from "../page-objects/login/Login";
import { LOGIN_DATA } from "../constans/loginData";
import { injectDashboardPage } from "../page-objects/dashboard/Dashboard";
import { URLS } from "../constans/urls";

const test = base.extend<MyFixtures>({
  dashboardPage: injectDashboardPage,
  loginPage: injectLoginPage,
});

test.describe("01 Buy, Sell, Check expected conditions", () => {
  test("Go to URL, log in, buy BTC, buy BTC again, close Market, then Validate buy and sell amount", async ({
    dashboardPage,
    loginPage,
    page,
  }) => {
    const amount = "0.002";
    const amountSell = "0.004";

    await loginPage.visit();
    await loginPage.login(LOGIN_DATA.EMAIL, LOGIN_DATA.PASSWORD);
    //page.pause() temporary pause script execution and open Playwright Inspector when captcha is clicked manually and page is redirected simply click play
    await page.pause();
    await dashboardPage.verifyCurrentUrl("eq", URLS.DASHBOARD_URL);
    await dashboardPage.closeWelcomeModal();
    await dashboardPage.selectMarket();
    await dashboardPage.setAmount(amount);
    await dashboardPage.clickBuyLongButton();
    await dashboardPage.setAmount(amount);
    await dashboardPage.clickBuyLongButton();
    await dashboardPage.clickPositionsMenu();
    await dashboardPage.clickMarketRowButton();
    await dashboardPage.clickOrderHistoryMenu();
    await dashboardPage.getRow(amount, 0);
    await dashboardPage.getRow(amountSell, 1);
    await dashboardPage.getRow(amount, 2);
  });
});
