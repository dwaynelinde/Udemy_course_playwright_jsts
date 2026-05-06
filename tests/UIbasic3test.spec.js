const {test} = require('@playwright/test'); 


// Two different ways to kickstart automation in Playwright. 

test("Browser Context Playwright test", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

}); 

test.only("Page Playwright test", async ({page})=>
{

    // Tests run by default in headless mode. Headed Mode must be summoned. 

    await page.goto("https://www.google.com"); 

}); 