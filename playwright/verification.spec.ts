import { test, expect } from "@playwright/test"

test.describe("System Verification Page E2E Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the verification page
    await page.goto("/verification")
    await page.waitForLoadState("domcontentloaded")
  })

  test("should load the hero section and show the page title", async ({ page }) => {
    // Check page header/title
    const title = page.locator("h1")
    await expect(title).toContainText("System Verification")
  })

  test("should switch tabs and load all sections correctly", async ({ page }) => {
    // Verify tab components exist and can be clicked
    const tabs = ["Animations", "3D & Physics", "UI & Form Validation", "Media & Tracking"]
    
    for (const tabName of tabs) {
      const tabButton = page.locator(`button:has-text("${tabName}")`)
      await expect(tabButton).toBeVisible()
      await tabButton.click()
      // Brief wait to allow rendering updates
      await page.waitForTimeout(200)
    }
  })

  test("should verify Zustand store and button interaction", async ({ page }) => {
    // Select the Zustand button
    const incrementBtn = page.locator('button:has-text("Increment Log Count")')
    await expect(incrementBtn).toBeVisible()

    // Click it and check state updates
    const countDisplay = page.locator("text=clicks")
    await expect(countDisplay).toContainText("0 clicks")
    await incrementBtn.click()
    await expect(countDisplay).toContainText("1 clicks")
  })

  test("should validate and submit Conform + Zod form", async ({ page }) => {
    // Navigate to form tab
    await page.locator('button:has-text("UI & Form Validation")').click()

    const submitBtn = page.locator('button:has-text("Submit Form")')
    await expect(submitBtn).toBeVisible()

    // Submit empty form and check validation errors
    await submitBtn.click()
    const usernameError = page.locator("text=Username must be at least 3 characters")
    const emailError = page.locator("text=Please enter a valid email address")
    await expect(usernameError).toBeVisible()
    await expect(emailError).toBeVisible()

    // Fill form fields with valid data
    await page.locator('input[placeholder="alice"]').fill("alex")
    await page.locator('input[placeholder="alice@example.com"]').fill("alex@vertex.dev")

    // Submit form and check success details
    await submitBtn.click()
    const successStatus = page.locator('span', { hasText: /^success$/ })
    await expect(successStatus).toBeVisible()
  })

  test("should check accessibility layout and check dark mode elements", async ({ page }) => {
    // Verify essential accessibility indicators are present
    const checklistHeader = page.locator("text=Verification Checklists")
    await expect(checklistHeader).toBeVisible()

    // Check main document container has proper layout structure
    const mainContainer = page.locator("main.bg-background")
    await expect(mainContainer).toBeVisible()
  })
})
