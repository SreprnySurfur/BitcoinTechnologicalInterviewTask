import { Page, expect } from "@playwright/test";
import { UrlValues } from "../models/Assertions";

export abstract class CommonPage {
  public constructor(private page: Page) {}

  protected async visitUrl(url: string) {
    await this.page.goto(url);
  }

  protected getByText(text: RegExp | string) {
    return this.page.getByText(text);
  }

  protected getByTestId(id: RegExp | string) {
    return this.page.getByTestId(id);
  }

  protected async clickButton(id: string) {
    const button = this.getButton(id);

    await button.click();
  }

  protected getButton(id: string) {
    return this.getByTestId(`${id}-button`);
  }

  protected async getAttribute(id: string, name: string) {
    return this.getByTestId(id).getAttribute(name);
  }

  protected async clickElement(id: string) {
    const element = this.getByTestId(id);

    await element.click();
  }

  protected getInput(id: string) {
    return this.getByTestId(`${id}-input`);
  }

  protected async clearInput(id: string) {
    await this.getInput(id).clear();
  }

  protected async setInputValue(id: string, value: string) {
    const input = this.getInput(id);

    await input.fill(value);
  }

  protected async setInputLocatorValue(id: string, value: string) {
    const input = this.getLocator(id);

    await input.click();
    await input.fill(value);
  }

  protected getErrorMessage(id: string) {
    return this.getByTestId(`${id}-error`);
  }

  protected getLocator(id: string) {
    return this.page.locator(id);
  }

  protected clickLocator(id: string) {
    return this.page.locator(id).click();
  }

  public async verifyCurrentUrl(assertion: UrlValues, value: RegExp | string) {
    switch (assertion) {
      case "contain":
        return expect(this.page).toHaveURL(new RegExp(value));
      case "eq":
        return expect(this.page).toHaveURL(value);
      default:
        throw new Error(`Invalid assertion type: ${assertion}`);
    }
  }

  public async waitForSelector(id: string){
    return this.page.waitForSelector(id);
  }
}
