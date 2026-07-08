const { test, expect } = require('@playwright/test');

const {POmanager} = require('../pageobjects/POmanager'); 


// Use THIS file to build out objects, constructors, etc. 


test('Client App login', async ({ page }) => {

    const poManager = new POmanager(page); 

   //js file- Login js Page, Dashboard Page
   const username = "anshika@gmail.com";
   const password = "Iamking@000";
   const productName = 'ZARA COAT 4';
   const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage(); 
    await loginPage.goTo(); 
    await loginPage.validLogin(username, password); 

    // dashboardpage

    const dashboardPage = poManager.getDashboardPage(); 
    await dashboardPage.searchProductAddCart(productName);
    dashboardPage.navigateToCart(); 



   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
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

});



