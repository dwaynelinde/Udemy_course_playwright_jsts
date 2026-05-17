const { test, expect } = require('@playwright/test'); 


test("Practice General Elements on a Website", async ({browser})=>
{

    // Constants to initialize first: 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 


    // Get the page!
    await page.goto("https://commitquality.com/practice-general-components"); 
    
    // Get the title, to make sure it matches the correct page.
    console.log(await page.title()); 

    // Now, try to click the form. 
    
    // await page.getByLabel('Checkbox 1').check();

    expect(page.getByLabel('Checkbox 1')).toBeChecked;
    







}); 



