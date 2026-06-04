import { test, expect } from '@playwright/test'; 


// Start of Section 7! 

// test website: https://rahulshettyacademy.com/angularpractice/

test('Playwright Special Locators', async ({ page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/"); 
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check(); 
    await page.getByLabel("Gender").selectOption("Female"); 

    
}); 


