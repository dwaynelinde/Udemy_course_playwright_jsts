const { test, expect } = require('@playwright/test'); 
const { text } = require('stream/consumers');

// Two different ways to kickstart automation in Playwright. 

test.only("Browser Context Playwright test", async ({browser})=>
{
    // Constants. 
    const context = await browser.newContext();
    const page = await context.newPage(); 

    // must initialize page first. 
    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']"); 
    const signIn = page.locator("#signInBtn"); 
    const cardTitles = page.locator(".card-body a"); 


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

    // first value
    console.log(await cardTitles.first().textContent());

    // second value
    console.log(await cardTitles.nth(1).textContent()); 

    // Grabbing all of the card values with one method. 

    const allTitles = await cardTitles.allTextContents(); 
    console.log(allTitles); 

}); 

test("Page Playwright test", async ({page})=>
{

    // Tests run by default in headless mode. Headed Mode must be summoned. 

    await page.goto("https://www.google.com"); 

    // See if the title matches: Get title, and put in assertion. 

    console.log(await page.title()); 
    await expect(page).toHaveTitle("Google"); 



}); 


test('UI controls', async({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator('#username'); 
    // const password = page.locator("[type='password']"); 
    const signIn = page.locator("#signInBtn"); 

    // The dropdown: 
    const dropdown = page.locator("select.form-control"); 

    // The document link:
    const documentLink = page.locator("[href*='documents-request']"); 

    // Select an option from the dropdown: 

    await dropdown.selectOption("consult"); 

    // pause the execution to see the result; also brings up the Inspector. 
    // await page.pause(); 


    // select radio button - selects the last one. 
    await page.locator(".radiotextsty").last().click(); 
    // click on the web-based popup modal that appears. 
    await page.locator("#okayBtn").click(); 
    // assertion to check if clicked or not. 

    await expect(page.locator(".radiotextsty").last()).toBeChecked(); 
    console.log(await page.locator(".radiotextsty").last().isChecked()); 

    // checkboxes! With an assertion. Check. 

    await page.locator("#terms").click(); 
    await expect(page.locator("#terms")).toBeChecked(); 
    
    // Unchecked. Thus, should be Falsy. 
    await page.locator("#terms").uncheck(); 
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); 

    // Check for the blinking text. 
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); 

}); 


test('Child Windows Handling', async({browser})=> 
{

    const context = await browser.newContext();
    const page = await context.newPage(); 
    const userName = page.locator('#username'); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']"); 
    
    const [newPage] = await Promise.all (
    [
    context.waitForEvent('page'),
    documentLink.click(),
    ])
     // new page is opened. 

    const text = await newPage.locator(".red").textContent(); 
    // split out the email domain from the string. 
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0] // rightside text after @
    console.log(domain); 

    // put the domain in a text field on the original page. 
    await page.locator("#username").type(domain); 
    console.log(await page.locator("#username").inputValue()); 


}); 
