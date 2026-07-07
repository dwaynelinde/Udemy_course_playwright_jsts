const { test, expect } = require('@playwright/test'); 

test("Popup validations", async({page}) => 
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 

    // Going back and forth between different websites. 

    // await page.goto("https://www.google.com")
    // await page.goBack(); 
    // await page.goForward(); 

    await expect(page.locator('#displayed-text')).toBeVisible(); 
    await page.locator('#hide-textbox').click(); 
    await expect(page.locator("#displayed-text")).toBeHidden(); 
    // await page.pause(); 

    // Handling a Java popup dialog box. 
    page.on('dialog', dialog => dialog.accept()); 
    // page.on('dialog', dialog => dialog.dismiss()); 

    await page.locator("#confirmbtn").click();      
    
    // Hovers in Playwright. 

    await page.locator("#mousehover").hover(); 

    // end of lesson 51
    // start of lesson 52

    // website in iFrame 

    const framesPage = page.frameLocator("#courses-iframe"); 
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); 
    const textCheck = await framesPage.locator(".text h2").textContent(); 
    console.log(textCheck.split(" ")[1]); 

    // end of lesson 52

})


test("Screenshot and visual comparison", async({page}) => 
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
    await expect(page.locator('#displayed-text')).toBeVisible(); 
    
    // partial screenshot
    await page.locator('#displayed-text').screenshot({path: 'partialscreen.png'}); 
    await page.locator('#hide-textbox').click(); 

    // full page screenshot

    await page.screenshot({path: 'screenshottest1.png'});  
    await expect(page.locator("#displayed-text")).toBeHidden(); 
})

    // visual testing and comparison of screenshots. 
    // First run will fail, because no set screenshot. Test will create one. 

test.only('visual comparison', async({page}) => 
{

    await page.goto('https://www.google.com/'); 
    expect(await page.screenshot()).toMatchSnapshot('landinggoogle.png'); 
    // end lesson 73
})    


