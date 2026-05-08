const { test, expect } = require('@playwright/test'); 

// Two different ways to kickstart automation in Playwright. 

test("Browser Context Playwright test", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    console.log(await page.title()); 

    // CSS selector - can write tests for these, to find an edit box.
    // fill - new method to enter text into a textbox.
    await page.locator('#username').fill("rahulshetty"); 
    await page.locator("[type='password']").fill("learning"); 
    
    // Press the button. 
    await page.locator("#signInBtn").click(); 

    // wait for the error message. webdriverwait.
    console.log (await page.locator("[style*='block']").textContent());



}); 

test("Page Playwright test", async ({page})=>
{

    // Tests run by default in headless mode. Headed Mode must be summoned. 

    await page.goto("https://www.google.com"); 

    // See if the title matches: Get title, and put in assertion. 

    console.log(await page.title()); 
    await expect(page).toHaveTitle("Google"); 



}); 