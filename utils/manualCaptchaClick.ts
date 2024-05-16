const { chromium } = require('playwright');

export async function waitForManualAction(page) {
  console.log('Pausing execution... Waiting for manual action.');
  await page.pause();
  console.log('Continuing execution...');
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await waitForManualAction(page);
  await browser.close();
})();