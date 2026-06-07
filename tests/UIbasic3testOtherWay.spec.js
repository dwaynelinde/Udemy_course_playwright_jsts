const { test, expect } = require('@playwright/test'); 
const { text } = require('stream/consumers');

// Avoiding CSS Selectors. 

test("Webst Client App Login From Lesson 43 On", async ({ page })=>
{
    // Avoiding CSS Selectors
    // type in code from lesson 43, after art walk. 
    // Art Walk ruled. Now, on to coding. 

    const email = "anshika@gmail.com"; 
    const password = "Iamking@000"; 
    const productName = 'ZARA COAT 3'; 
    const products = page.locator(".card-body");     
    await page.goto("https://rahulshettyacademy.com/client"); 
    await page.getByPlaceholder("email@example.com").fill(email); 
    await page.getByPlaceholder("enter your password").fill(password); 
    await page.getByRole('button', {name: "Login"}).click(); 
    await page.waitForLoadState('networkidle'); 
    await page.locator(".card-body b").first().waitFor(); 
    
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3"}).getByRole("button", {name: "Add to Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click(); 

    // await page.pause(); 
    await page.locator("div li").first().waitFor(); 
    await expect(page.getByText("ZARA COAT 3")).toBeVisible(); 

    await page.getByRole("button", {name: "Checkout"}).click(); 
    await page.getByPlaceholder("Select Country").pressSequentially("ind"); 
    
    await page.getByRole('button', {name: "India"}).nth(1).click(); 
    await page.getByText("PLACE ORDER").click(); 

    await expect(page.getByText("Thankyou for the order.")).toBeVisible(); 


}); 

