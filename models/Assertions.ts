/***
 *  Assert that at least one element of the selection is checked or not checked, using `.is(':checked')`.
 */
export type CheckboxValues = "be.checked" | "not.be.checked";

/***
 * Assert that the selection is not empty. Note that this overrides the built-in chai assertion.
 * Checks if the element exists in the DOM, `exist` returns true if:
 *  - it is present in the document
 *  - it has its css property display set to none
 *  - it has its css property visibility set to either hidden or collapse
 */
export type ExistValues = "exist" | "not.exist";

/***
 *  This allows you to check if an element is currently visible to the user.
 *
 *  An element is visible if all the following conditions are met:
 *  - it is present in the document
 *  - it does not have its css property display set to none
 *  - it does not have its css property visibility set to either hidden or collapse
 *  - it does not have its css property opacity set to 0
 *  - its parent element is also visible (and so on up to the top of the DOM tree)
 *  - it does not have the hidden attribute
 */
export type VisibilityValues = "be.visible" | "not.be.visible";

/***
 *  Checks the visibility of an element on a page and existing in the DOM
 */
export type PresenceValues = ExistValues | VisibilityValues;

/***
 *  Assert that at least one element of the selection is enabled or disabled, using `.is(':enabled)` or `.is(':disabled')`.
 */
export type EnableValues = "be.disabled" | "be.enabled";

/***
 *  - `contain.text` - Assert that the text of the first element of the selection contain the given text, using `.text()`.
 *  - `have.text` - Assert that the text of the first element of the selection is equal to the given text, using `.text()`.
 */
export type TextValues =
  | "contain.text"
  | "have.text"
  | "not.contain.text"
  | "not.have.text";

/***
 *  This allows you to check if a URL contain expected value or is equal to expected URL.
 */
export type UrlValues = "contain" | "eq";

/***
 *  This allows you to check if value is or isn't equal to expected value. For example response status code.
 */
export type EqualityValues = "be.eq" | "not.be.eq";

/***
 *  Assert that the first element of the selection has the given value
 */
export type ElementsValues = "have.value" | "not.have.value";

export type AttributesValues = "have.attribute" | "not.have.attribute";

export type GenericAssertion =
  | CheckboxValues
  | ElementsValues
  | EnableValues
  | ExistValues
  | PresenceValues
  | TextValues
  | UrlValues;
