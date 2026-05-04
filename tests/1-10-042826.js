const { test } = require(`@playwright/test`);

test('Browser Context Declaration Playwright Test of 2026!', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshetty.com/loginpagePractise/");

});

test('Page context Playwright Test of 2026!', async ({ page }) => {

    await page.goto("https://rahulshetty.com/loginpagePractise/");

}); 
