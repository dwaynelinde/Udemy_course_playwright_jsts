const { test, expect } = require('@playwright/test'); 

// Two different ways to kickstart automation in Playwright. 

test("Browser Context Playwright test", async ({browser})=>
{
    // Constants. 
    const context = await browser.newContext();
    const page = await context.newPage(); 

    // must initialize page first. 
    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']"); 
    const signIn = page.locator("#signInBtn"); 


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    console.log(await page.title()); 

    // CSS selector - can write tests for these, to find an edit box.
    // fill - new method to enter text into a textbox.
    await userName.fill("rahulshetty"); 
    await password.fill("Learning@830$3mK2"); 
    
    // Press the button. 
    await signIn.click(); 

    // wait for the error message. webdriverwait.
    console.log (await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill(""); 
    await userName.fill("rahulshettyacademy"); 
    await signIn.click(); 

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent()); 

}); 

test("Page Playwright test", async ({page})=>
{

    // Tests run by default in headless mode. Headed Mode must be summoned. 

    await page.goto("https://www.google.com"); 

    // See if the title matches: Get title, and put in assertion. 

    console.log(await page.title()); 
    await expect(page).toHaveTitle("Google"); 



}); 