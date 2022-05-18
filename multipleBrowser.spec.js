const { chromium, expect, default: test } = require('@playwright/test');
const { timeout } = require('../playwright.config');

test('multiple browser context - Browser A',async () => {
  const browser= await chromium.launch()
  const page= await browser.newPage();
  await page.goto("https://my.staging.anywhere.app/")
  await page.locator("#user-email").click();
  await page.keyboard.type("sai@mailinator.com", { delay: 1 });
  await page.locator("#user-password").click();
  await page.keyboard.type("Test123123", { delay: 1 });
  await page.locator("#sign-in").click()
  await page.waitForSelector("//h1[contains(text(),'Inbox')]");
  await expect(page.locator("//h1[contains(text(),'Inbox')]")).toHaveText("Inbox")
  await page.waitForSelector("//a[@id='sidebar-app-connect']//i");
  await page.click("//a[@id='sidebar-app-connect']//i")
  await page.click('//h4[contains(text(),"Martin")]');
  await expect(page.locator('//h4//span[contains(text(),"Martin")]')).toHaveText('Martin')
  await page.locator("#chat-input").click()
  await page.mouse.wheel(0,0)
  await page.keyboard.type("Hi! This message is from Playwright 1")
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);
  // await browser.close();
});

test('multiple browser context - Browser B', async () => {
  const browser= await chromium.launch()
  const page= await browser.newPage();
  await page.goto("https://my.staging.anywhere.app/")
  await page.locator("#user-email").click();
  await page.keyboard.type("martin@mailinator.com", { delay: 1 });
  await page.locator("#user-password").click();
  await page.keyboard.type("Test123123", { delay: 1 });
  await page.locator("#sign-in").click()
  await page.waitForSelector("//h1[contains(text(),'Inbox')]");
  await expect(page.locator("//h1[contains(text(),'Inbox')]")).toHaveText("Inbox")
  await page.waitForSelector("//a[@id='sidebar-app-connect']//i");
  await page.click("//a[@id='sidebar-app-connect']//i")
  await page.click('//h4[contains(text(),"Sai")]');
  await expect(page.locator('//h4//span[contains(text(),"Sai")]')).toHaveText('Sai')
  await page.locator("#chat-input").click()
  await page.mouse.wheel(0,0)
  await page.keyboard.type("Hi reply message!from Playwright 1")
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);
  // await browser.close();
});