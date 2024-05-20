import { Page } from "@playwright/test";
import { CommonPage } from "../Common";
import { VisibilityValues } from "../../models/Assertions";
import { verifyVisibility } from "../../assertions/verifyVisibility";

declare module "../../my-fixtures" {
  interface MyFixtures {
    loginPage: LoginPage;
  }
}

export const injectLoginPage = async ({ page }, use) =>
  await use(new LoginPage(page));

class LoginPage extends CommonPage {
  private readonly selectors = {
    emailId: '[id="login_input_email"]',
    passwordId: '[id="login_input_password"]',
    loginButton: '[id="login_input_login"]',
  };

  public constructor(page: Page) {
    super(page);
  }
  private readonly url = () => "https://testnet.binancefuture.com/en/login";

  public async visit() {
    await super.visitUrl(this.url());
  }

  public async setEmail(email: string) {
    await super.setInputLocatorValue(this.selectors.emailId, email);
  }

  public async setPassword(password: string) {
    await super.setInputLocatorValue(this.selectors.passwordId, password);
  }

  public async clickLogInButton() {
    await super.clickLocator(this.selectors.loginButton);
  }

  public async verifyLoginButtonVisibility(assertion: VisibilityValues) {
    await verifyVisibility(
      super.getLocator(this.selectors.loginButton),
      assertion
    );
  }

  public async login(email: string, password: string) {
    await this.verifyLoginButtonVisibility("be.visible");
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogInButton();
  }
}
