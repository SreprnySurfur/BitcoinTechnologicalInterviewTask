import { Page } from "@playwright/test";
import { CommonPage } from "../Common";

declare module "../../my-fixtures" {
  interface MyFixtures {
    dashboardPage: DashboardPage;
  }
}

export const injectDashboardPage = async ({ page }, use) =>
  await use(new DashboardPage(page));

class DashboardPage extends CommonPage {
  private readonly testId = {
    amount: '[id="unitAmount-156"]',
    modalCloseButton: '[xmlns="http://www.w3.org/2000/svg"]',
  };

  public constructor(page: Page) {
    super(page);
  }

  public async setAmount(amount: string) {
    await super.setInputLocatorValue(this.testId.amount, amount);
  }
}
