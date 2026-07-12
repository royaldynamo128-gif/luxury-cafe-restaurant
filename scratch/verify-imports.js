/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pkgPath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const deps = Object.keys(pkg.dependencies);

async function run() {
  console.log(`Starting E2E package import verification for ${deps.length} packages...`);
  console.log('--------------------------------------------------');

  const results = [];

  for (const dep of deps) {
    // 1. Special Handling: CLI tools
    if (dep === 'shadcn') {
      try {
        const version = execSync('pnpm exec shadcn -v', { encoding: 'utf8', cwd: path.join(__dirname, '..') }).trim();
        results.push({ name: dep, status: 'PASS', version, details: 'CLI verification successful' });
        console.log(`✓ [PASS] ${dep} (CLI Version: ${version})`);
      } catch (err) {
        results.push({ name: dep, status: 'FAIL', error: err.message || String(err) });
        console.log(`✗ [FAIL] ${dep}: CLI check failed`);
      }
      continue;
    }

    // 2. Special Handling: CSS / Font only packages
    if (dep === '@fontsource/inter' || dep === 'geist' || dep === 'tw-animate-css') {
      let checkPath = '';
      if (dep === 'geist') {
        checkPath = path.join(__dirname, '../node_modules/geist/package.json');
      } else if (dep === '@fontsource/inter') {
        checkPath = path.join(__dirname, '../node_modules/@fontsource/inter/package.json');
      } else {
        checkPath = path.join(__dirname, '../node_modules/tw-animate-css/dist/tw-animate.css');
      }

      if (fs.existsSync(checkPath)) {
        results.push({ name: dep, status: 'PASS', details: 'CSS/Font/Asset package verified' });
        console.log(`✓ [PASS] ${dep} (Asset verified)`);
      } else {
        results.push({ name: dep, status: 'FAIL', error: 'Asset file/package not found in node_modules' });
        console.log(`✗ [FAIL] ${dep}: Asset not found`);
      }
      continue;
    }

    // 3. Special Handling: Projects/starter packages with no root JS main
    if (dep === 'shadcn-extensions') {
      const checkPath = path.join(__dirname, '../node_modules/shadcn-extensions/package.json');
      if (fs.existsSync(checkPath)) {
        results.push({ name: dep, status: 'PASS', details: 'Sub-project directory verified' });
        console.log(`✓ [PASS] ${dep} (Project directory verified)`);
      } else {
        results.push({ name: dep, status: 'FAIL', error: 'shadcn-extensions not found' });
        console.log(`✗ [FAIL] ${dep}: Project directory not found`);
      }
      continue;
    }

    // 4. Special Handling: Packages with custom entrypoints
    let importName = dep;
    if (dep === '@conform-to/zod') {
      importName = '@conform-to/zod/v4';
    } else if (dep === 'uploadthing') {
      importName = 'uploadthing/client';
    }

    try {
      await import(importName);
      results.push({ name: dep, status: 'PASS', error: null });
      console.log(`✓ [PASS] ${dep}`);
    } catch (err) {
      const errMsg = err.message || String(err);
      if (
        errMsg.includes('window is not defined') ||
        errMsg.includes('document is not defined') ||
        errMsg.includes('navigator is not defined') ||
        errMsg.includes('HTMLElement is not defined') ||
        errMsg.includes('self is not defined') ||
        errMsg.includes('requestAnimationFrame is not defined')
      ) {
        results.push({ name: dep, status: 'PASS (Client-only)', error: errMsg });
        console.log(`✓ [PASS - Client-only] ${dep}`);
      } else {
        results.push({ name: dep, status: 'FAIL', error: errMsg });
        console.log(`✗ [FAIL] ${dep}: ${errMsg}`);
      }
    }
  }

  console.log('--------------------------------------------------');
  const passed = results.filter(r => r.status.startsWith('PASS')).length;
  console.log(`Summary: ${passed}/${deps.length} packages resolved successfully.`);

  fs.writeFileSync(
    path.join(__dirname, 'import-results.json'),
    JSON.stringify(results, null, 2)
  );
}

run();
