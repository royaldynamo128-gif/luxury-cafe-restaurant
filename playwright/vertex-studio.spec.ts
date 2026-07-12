import { test, expect } from "@playwright/test"

test.describe("VERTEX STUDIO — Production Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
    // Wait for React hydration and dynamic components to mount
    await page.waitForLoadState("domcontentloaded")
    // Give dynamic components time to hydrate
    await page.waitForTimeout(2000)
  })

  test("Page loads with correct title and meta", async ({ page }) => {
    await expect(page).toHaveTitle(/VERTEX STUDIO/)
    const description = await page.locator('meta[name="description"]').getAttribute("content")
    expect(description).toBeTruthy()
  })

  test("Skip-to-content link is present for accessibility", async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeAttached()
  })

  test("Header renders with navigation links", async ({ page }) => {
    // Wait for header to be attached to the DOM (dynamically loaded client-side)
    const header = page.locator("header")
    await expect(header).toBeAttached({ timeout: 25000 })
    const nav = page.locator("nav").first()
    await expect(nav).toBeAttached({ timeout: 20000 })
  })

  test("Hero section renders with content", async ({ page }) => {
    // Look for the first section which is the hero
    const hero = page.locator("section").first()
    await expect(hero).toBeVisible({ timeout: 15000 })
    // Check there's a headline visible
    const h1 = page.locator("h1")
    await expect(h1).toBeVisible({ timeout: 10000 })
  })

  test("Capabilities section is present", async ({ page }) => {
    // Sections are dynamically rendered — wait for them
    const section = page.locator("#capabilities")
    await expect(section).toBeAttached({ timeout: 15000 })
  })

  test("Works section is present", async ({ page }) => {
    const section = page.locator("#works")
    await expect(section).toBeAttached({ timeout: 15000 })
  })

  test("Services section is present", async ({ page }) => {
    const section = page.locator("#services")
    await expect(section).toBeAttached({ timeout: 15000 })
  })

  test("FAQ section is present", async ({ page }) => {
    const section = page.locator("#faq")
    await expect(section).toBeAttached({ timeout: 15000 })
  })

  test("Footer is present with copyright", async ({ page }) => {
    const footer = page.locator("footer")
    await expect(footer).toBeAttached({ timeout: 10000 })
    await expect(footer).toContainText("VERTEX STUDIO")
  })

  test("Interactive elements exist on page", async ({ page }) => {
    // After hydration, there should be interactive elements
    const buttons = page.locator("button")
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
  })

  test("Page renders correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.waitForTimeout(500)
    const body = page.locator("body")
    await expect(body).toBeVisible()
    // No horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5) // 5px tolerance
  })

  test("Page renders correctly on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.waitForTimeout(500)
    const body = page.locator("body")
    await expect(body).toBeVisible()
  })

  test("Page renders correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.waitForTimeout(500)
    const body = page.locator("body")
    await expect(body).toBeVisible()
  })
})
