const { test, expect } = require('@playwright/test'); 
const { text } = require('stream/consumers');

// Two different ways to kickstart automation in Playwright. 

test("Browser Context Playwright test", async ({browser})=>
{
    // Constants. 
    const context = await browser.newContext();
    const page = await context.newPage(); 

    // CSS blocking. Image blocking. Can speed up tests. 
    // page.route("**/*.css.{jpg, png, gif, jpeg}", route => route.abort());     
    page.route("**/*.{jpg, png, gif, jpeg}", route => route.abort());     

    // must initialize page first. 
    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']"); 
    const signIn = page.locator("#signInBtn"); 
    const cardTitles = page.locator(".card-body a"); 

    // network event listener. Listen for request calls. 
    page.on("request", request => console.log(request.url())); 

    // end of lesson 71!

    // get response status code: 
    page.on('response', response => console.log(response.status(), response.url()));



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

test.only("Dynamically finding product", async ({ page })=>
{
    
    // Start of Lesson 30.
    // Constants. 
    const email = "anshika@gmail.com"; 
    const productName = 'ZARA COAT 3'; 

    // const context = await browser.newContext();
    // const page = await context.newPage(); 
    const products = page.locator(".card-body"); 
    
    await page.goto("https://rahulshettyacademy.com/client"); 
    await page.locator("#userEmail").fill(email);     
    await page.locator("#userPassword").type("Iamking@000"); 
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); 
    await page.locator(".card-body b").first().waitFor(); 
    const titles = await page.locator(".card-body b").allTextContents(); 
    console.log(titles); 

    // Iterate through all of the items. 
    const count = await products.count(); 

    // for loop!
    for(let i = 0; i < count; ++i)
    {
         if (await products.nth(i).locator("b").textContent() === productName)
        {
            // Add product to cart. 
            await products.nth(i).locator("text= Add To Cart").click(); 
            break;     

        }
    }

    await page.locator("[routerlink*='cart']").click(); 


    await page.locator("div li").first().waitFor(); 
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); 
    expect(bool).toBeTruthy(); 
    await page.locator("text=Checkout").click(); 
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150}); 
    const dropdown = page.locator(".ta-results"); 
    await dropdown.waitFor(); 
    const dropdownCount = await dropdown.locator("button").count(); 

    // now, iterate through dropdownCount: 

    for (let i = 0; i < dropdownCount; ++i) 
    {
        const text = await dropdown.locator("button").nth(i).textContent(); 

        // Text must be exact; it has a space before the 'I'.     
        if (text === " India") 
        {
            await dropdown.locator("button").nth(i).click(); 
            break; 
        }
    }

    // await page.pause(); 

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email); 
    await page.locator(".action__submit").click(); 
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); 
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); 
    console.log(orderId); 


    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

   // End of Section 6! 

}); 

