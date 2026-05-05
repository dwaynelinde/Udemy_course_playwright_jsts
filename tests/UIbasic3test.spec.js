const {test} = require('@playwright/test'); 


// Two different ways to kickstart automation in Playwright. 

test("Browser Context Playwright test", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

}); 

test("Page Playwright test", async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

}); 