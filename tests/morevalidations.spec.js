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
    await page.pause(); 

    // Handling a Java popup dialog box. 
    page.on('dialog', dialog => dialog.accept()); 
    // page.on('dialog', dialog => dialog.dismiss()); 

    await page.locator("#confirmbtn").click();      
    
    // Hovers in Playwright. 

    await page.locator("#mousehover").hover(); 

    // end of 51

})