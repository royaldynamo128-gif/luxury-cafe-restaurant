const { exec, execSync } = require('child_process');
const fs = require('fs');

async function run() {
  console.log('Starting production server for performance audit...');
  const server = exec('pnpm start', { cwd: __dirname + '/..' });

  // Wait for server to boot
  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    console.log('Resolving Playwright chromium executable path...');
    const chromiumPath = execSync('pnpm exec node -e "console.log(require(\'@playwright/test\').chromium.executablePath())"', { encoding: 'utf8' }).trim();
    console.log('Using Chromium path:', chromiumPath);

    console.log('Running Lighthouse audit on Home Page...');
    execSync(`CHROME_PATH="${chromiumPath}" npx -y lighthouse http://localhost:3000/ --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=${__dirname}/lighthouse-home-report.json`, { stdio: 'inherit' });

    console.log('Running Lighthouse audit on Verification Page...');
    execSync(`CHROME_PATH="${chromiumPath}" npx -y lighthouse http://localhost:3000/verification --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=${__dirname}/lighthouse-report.json`, { stdio: 'inherit' });

    console.log('Lighthouse completed. Reading results...');
    const reportHome = JSON.parse(fs.readFileSync(`${__dirname}/lighthouse-home-report.json`, 'utf8'));
    const reportVerify = JSON.parse(fs.readFileSync(`${__dirname}/lighthouse-report.json`, 'utf8'));

    const scoresHome = {
      performance: reportHome.categories.performance.score * 100,
      accessibility: reportHome.categories.accessibility.score * 100,
      'best-practices': reportHome.categories['best-practices'].score * 100,
      seo: reportHome.categories.seo.score * 100,
    };

    const scoresVerify = {
      performance: reportVerify.categories.performance.score * 100,
      accessibility: reportVerify.categories.accessibility.score * 100,
      'best-practices': reportVerify.categories['best-practices'].score * 100,
      seo: reportVerify.categories.seo.score * 100,
    };

    console.log('====================================');
    console.log('HOME PAGE SCORES:');
    console.log('Performance:    ', scoresHome.performance);
    console.log('Accessibility:  ', scoresHome.accessibility);
    console.log('Best Practices: ', scoresHome['best-practices']);
    console.log('SEO:            ', scoresHome.seo);
    console.log('====================================');
    console.log('VERIFICATION PAGE SCORES (STRESS TEST):');
    console.log('Performance:    ', scoresVerify.performance);
    console.log('Accessibility:  ', scoresVerify.accessibility);
    console.log('Best Practices: ', scoresVerify['best-practices']);
    console.log('SEO:            ', scoresVerify.seo);
    console.log('====================================');
  } catch (err) {
    console.error('Lighthouse audit failed:', err);
  } finally {
    server.kill();
    console.log('Server stopped.');
  }
}

run();
