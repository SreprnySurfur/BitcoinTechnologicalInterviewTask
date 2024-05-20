import { expect, Locator } from "@playwright/test";

import { TextValues } from "../models/Assertions";

export async function verifyTextContent(
  element: Locator,
  assertion: TextValues,
  value: string | string[]
) {
  switch (assertion) {
    case "have.text":
      return expect(element).toHaveText(value);
    case "contain.text":
      return expect(element).toContainText(value);
    case "not.have.text":
      return expect(element).not.toHaveText(value);
    case "not.contain.text":
      return expect(element).not.toContainText(value);
    default:
      throw new Error(`Invalid assertion type: ${assertion}`);
  }
}
