const { chromium, expect, default: test } = require ("@playwright/test")
test('basic test', async () => {
  const browser= await chromium.launch()
  const page= await browser.newPage()
  await page.goto('https://my.staging.anywhere.app/')
  await page.fill("#user-email","sai@mailinator.com")
  await page.fill("#user-password", "Test123123")
  await page.click("#sign-in")
  await expect(page.locator('#sign-in')).toHaveText('Sign in with email')
  await page.screenshot({path : `test.png`})
  await browser.close()
});
