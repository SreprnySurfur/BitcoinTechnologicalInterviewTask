import { Locator, Page, expect } from "@playwright/test";
import { CommonPage } from "../Common";

declare module "../../my-fixtures" {
  interface MyFixtures {
    dashboardPage: DashboardPage;
  }
}

export const injectDashboardPage = async ({ page }, use) =>
  await use(new DashboardPage(page));

class DashboardPage extends CommonPage {
  private readonly selectors = {
    amount: "Size",
    modalCloseButton: ".css-4rbxuz > .css-3kwgah > path",
    buttons: {
      buyLong: "Buy/Long",
      market: "Market",
    },
    positions: {
      marketTab: "#tab-MARKET",
    },
    rows: ".css-pru252",
  };

  private readonly testIds = {
    openOrders: {
      menubar: "OpenOrder",
      row: "openOrdersTableInfo",
    },
    positions: {
      menubar: "Positions",
    },
    orderHistory: {
      menubar: "OrderHistory",
    },
  };

  public constructor(page: Page) {
    super(page);
  }

  //I decided to do this in a not so good looking way, but this was only way that I get consistent results
  public async getRow(amount: string, position: number) {
    const row = super.getLocator(this.selectors.rows).nth(position);

    expect(row).toContainText(amount + " BTC");
  }

  public async selectMarket() {
    await super
      .getLocator(this.selectors.positions.marketTab)
      .getByText("Market")
      .click();
  }

  public async setAmount(amount: string) {
    await this.checkIfClickable();
    await super.inputLabel(this.selectors.amount, amount);
  }

  public async closeWelcomeModal() {
    await super.clickLocator(this.selectors.modalCloseButton);
  }

  public async clickBuyLongButton() {
    await this.page
      .getByRole("button", { name: this.selectors.buttons.buyLong })
      .click();

    const response = await this.page.waitForResponse((response) =>
      response.url().includes("/place-order")
    );

    expect(response.status()).toBe(200);
  }

  public async checkIfClickable() {
    const locator = this.page.getByRole("button", {
      name: this.selectors.buttons.buyLong,
    });

    await expect(locator).toBeEnabled();
  }

  public async clickOpenOrdersMenu() {
    await this.getOpenOrderMenu().click();
  }

  //I tough that I will need this but want to keep it
  public async verifyOpenOrdersAmount(maxAttempts: number) {
    await this.verifyMenuItemAmount(
      this.getOpenOrderMenu(),
      "Open Orders(1)",
      maxAttempts
    );
  }

  public async verifyPositionsAmount(maxAttempts: number) {
    await this.verifyMenuItemAmount(
      this.getPositionsMenu(),
      "Positions(0)",
      maxAttempts
    );
  }

  public async clickPositionsMenu() {
    await this.getPositionsMenu().click();
  }

  public async clickMarketRowButton() {
    await this.page
      .getByRole("button", { name: this.selectors.buttons.market })
      .click();
  }

  public async clickOrderHistoryMenu() {
    await this.getOrderHistoryMenu().click();

    const response = await this.page.waitForResponse((response) =>
      response.url().includes("/order-history")
    );

    expect(response.status()).toBe(200);
  }

  private async verifyMenuItemAmount(
    locator: Locator,
    assertion: string,
    maxAttempts: number
  ) {
    let attempts = 0;
    let element = await locator.textContent();

    await this.page.reload();

    while (attempts < maxAttempts) {
      if (element === assertion) {
        return;
      } else {
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        element = await locator.textContent();
        attempts++;
      }
    }
  }

  private getPositionsMenu(): Locator {
    return super.getByTestId(this.testIds.positions.menubar);
  }

  private getOpenOrderMenu(): Locator {
    return super.getByTestId(this.testIds.openOrders.menubar);
  }

  private getOrderHistoryMenu(): Locator {
    return super.getByTestId(this.testIds.orderHistory.menubar);
  }
}
