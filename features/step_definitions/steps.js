// const assert = require('assert')
const { When, Then, Given } = require('@cucumber/cucumber'); 
// const { Greeter } = require('../../src')
const {POmanager} = require('../../pageobjects/POmanager'); 
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) 
{
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    this.poManager = new POmanager(page); 
    const products = page.locator(".card-body"); 
    const loginPage = this.poManager.getLoginPage(); 
    await loginPage.goTo(); 
    await loginPage.validLogin(username, password); 
  
});


When('I add {string} to Cart', async function (productName) 
{
    this.dashboardPage = this.poManager.getDashboardPage(); 
    await this.dashboardPage.searchProductAddCart(productName); 
    await this.dashboardPage.navigateToCart();  
});

Then('Verify {string} is displayed in the Cart', async function (productName) 
{
    const cartPage = this.poManager.getCartPage(); 
    await cartPage.VerifyProductDisplayed(productName); 
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