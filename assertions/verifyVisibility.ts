import { expect, Locator } from "@playwright/test";

import { VisibilityValues } from "../models/Assertions";

export async function verifyVisibility(
  element: Locator,
  assertion: VisibilityValues
) {
  switch (assertion) {
    case "be.visible":
      await expect(element).toBeVisible();
      break;
    case "not.be.visible":
      await expect(element).toBeHidden();
      break;
    default:
      throw new Error(`Invalid assertion type: ${assertion}`);
  }
}
