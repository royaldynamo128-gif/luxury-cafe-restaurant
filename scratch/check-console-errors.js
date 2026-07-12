const { chromium } = require('@playwright/test');
const { exec } = require('child_process');

async function run() {
  console.log('Starting server in background...');
  const server = exec('pnpm start', { cwd: __dirname + '/..' });

  // Wait for server to boot
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Launching browser to capture console & page errors...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[BROWSER CONSOLE ERROR] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log('[BROWSER RUNTIME CRASH]:');
    console.error(err);
  });

  try {
    await page.goto('http://localhost:3000/verification', { waitUntil: 'networkidle' });
    console.log('Page loaded, waiting for 5 seconds to capture deferred errors...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  } catch (err) {
    console.error('Failed to load page:', err);
  } finally {
    await browser.close();
    server.kill();
    console.log('Server stopped.');
  }
}

run();
