const { test, expect } = require('@playwright/test'); 
const { text } = require('stream/consumers');

// Avoiding CSS Selectors. 

test("Webst Client App Login From Lesson 43 On", async ({ page })=>
{
    // Avoiding CSS Selectors
    // type in code from lesson 43, after art walk. 
    // Art Walk ruled. Now, on to coding. 

    const email = "anshika@gmail.com"; 
    const productName = 'ZARA COAT 3'; 
    const products = page.locator(".card-body");     





}); 

