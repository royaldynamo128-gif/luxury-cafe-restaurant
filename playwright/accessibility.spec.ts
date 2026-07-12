import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test.describe("Axe Accessibility Audit", () => {
  test("home page should pass accessibility checks", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    
    // Scroll to bottom to trigger and complete all entry animations (like BlurFade)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)
    
    // Inject and run Axe analysis
    const results = await new AxeBuilder({ page }).analyze()
    
    // Print violations if any
    if (results.violations.length > 0) {
      console.log("Accessibility Violations (Home Page):", JSON.stringify(results.violations, null, 2))
    }
    
    expect(results.violations).toEqual([])
  })

  test("verification page should pass accessibility checks", async ({ page }) => {
    await page.goto("/verification")
    await page.waitForLoadState("domcontentloaded")
    
    // Inject and run Axe analysis
    const results = await new AxeBuilder({ page }).analyze()
    
    // Print violations if any
    if (results.violations.length > 0) {
      console.log("Accessibility Violations (Verification Page):", JSON.stringify(results.violations, null, 2))
    }
    
    expect(results.violations).toEqual([])
  })
})
