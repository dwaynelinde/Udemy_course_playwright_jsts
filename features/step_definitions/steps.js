// const assert = require('assert')
const { When, Then, Given } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')
const {POManager} = require('../../pageobjects/POManager'); 
const {test, expect, playwright} = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', async function (string, string2) 
{
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    this.poManager = new POmanager(page); 
    const products = page.locator(".card-body"); 
    const loginPage = this.poManager.getLoginPage(); 
    await loginPage.goto(); 
    await loginPage.validLogin(data.username, data.password); 
  
});


When('I add {string} to Cart', async function (string) 
{
    this.dashboardPage = this.poManager.getDashboardPage(); 
    await this.dashboardPage.searchProductAddCart(data.productName); 
    await this.dashboardPage.navigateToCart();  
});

Then('Verify {string} is displayed in the Cart', async function (string) 
{
    const cartPage = this.poManager.getCartPage(); 
    await cartPage.VerifyProductDisplayed(data.productName); 
    await cartPage.Checkout(); 
});

When('Enter valid details and place the order', async function () 
{
    const ordersReviewPage = this.poManager.getOrdersReviewPage(); 
    await ordersReviewPage.searchCountryAndSelect("ind","India"); 
    const orderId = await ordersReviewPage.SubmitAndGetOrderId(); 
    console.log(orderId); 

});

Then('Verify order is present in the Order History', async function () 
{
    await this.dashboardPage.navigateToOrders(); 
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage(); 
    await ordersHistoryPage.searchOrderAndSelect(orderId); 
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy(); 


});