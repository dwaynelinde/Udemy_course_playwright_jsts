const {test} = require('@playwright/test'); 

test("Browser Context Playwright test", async ({browser})=>
{

    // chrome has plugins and cookies

    const context = await browser.newContext();
    const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

}); 

test("Page Playwright test", async ({browser, page})=>
{

    // chrome has plugins and cookies

    // const context = await browser.newContext();
    // const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

}); 