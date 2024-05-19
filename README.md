# BitcoinTechnologicalInterviewTask

This is repository which contains End-To-End tests written using [Playwright](https://playwright.dev/docs/intro) and TypeScript.

## How to run

### 1. Prepare your machine to run tests

### Installation

If you do not have node/yarn installed, the best is to install both using `brew`:

```bash
brew install node@18
```

```bash
brew install yarn
```

Use the package manager [yarn](https://yarnpkg.com/) and run the following command:

### Install yarn packages

```bash
yarn install
```

### Install playwright browsers

```bash
npx playwright install
```

### 2. Run tests

Open Playwright console an run

- To run all test at once using Webkit, Firefox, Chromium

  ```bash
  npx playwright test
  ```

- To open UI tool that will open Chromium

  ```bash
  npx playwright test --ui
  ```

  In this mode you can select which tests you want to run

  To open playwright HTML report from last tests run

  ```bash
  npx playwright show-report
  ```
