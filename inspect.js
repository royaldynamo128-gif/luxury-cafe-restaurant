const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
    console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
    console.error(`[PAGE ERROR]`, err);
  });

  try {
    console.log('Navigating to https://test.jgcjgjg.shop...');
    await page.goto('https://test.jgcjgjg.shop', { waitUntil: 'load', timeout: 15000 });
    console.log('Page loaded. Waiting 5s...');
    await page.waitForTimeout(5000);
    
    const screenshotPath = '/home/rai/.gemini/antigravity/brain/2cd52c59-a64e-47e1-bf11-6c17708cf0a8/scratch/screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);
    
    fs.writeFileSync('/home/rai/.gemini/antigravity/brain/2cd52c59-a64e-47e1-bf11-6c17708cf0a8/scratch/errors.json', JSON.stringify({
      errors: consoleErrors,
      url: page.url()
    }, null, 2));
    console.log('Errors written to errors.json');
  } catch (err) {
    console.error('Error during run:', err);
  } finally {
    await browser.close();
  }
})();
