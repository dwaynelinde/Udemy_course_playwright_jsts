const {test, expect, request } = require('@playwright/test'); 

const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"}; 

let token; 

test.beforeAll( async()=> 

{

   const apiContext = await request.newContext();
   
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    
    {
        data: loginPayload
    
    })

    // OK code 200, 201

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); 
    token = loginResponseJson.token; 

    // end of lesson 54. 

    console.log(token); 

}); 
 
// 7:05 out of 15:16

test.beforeEach( ()=> 

{




}); 

test("DClient API logging in", async ({ page })=>
{
    
    // Playwright can execute Javascript expressions. 
    // Javascript to insert into local storage in the browser. 
    // end of lesson 56. 

    page.addInitScript(value => {
        window.localStorage.setItem('token', value); 
    }, token ); 

    // non-API login test. 
    await page.goto("https://rahulshettyacademy.com/client"); 
    
    /* await page.locator("#userEmail").fill(email);     
    await page.locator("#userPassword").type("Iamking@000"); 
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); */ 

    const email = ""; 
    const productName = 'ZARA COAT 3'; 
    const products = page.locator(".card-body"); 

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

    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(email); 
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
