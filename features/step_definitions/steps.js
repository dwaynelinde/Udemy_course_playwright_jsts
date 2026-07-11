// const assert = require('assert')
const { When, Then, Given } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')
const {POManager} = require('../pageobjects/POManager'); 
const {test,expect, playwright} = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', async function (string, string2) 
{
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POmanager(page); 
    const products = page.locator(".card-body"); 
    const loginPage = poManager.getLoginPage(); 
    await loginPage.goto(); 
    await loginPage.validLogin(data.username, data.password); 
  
});


When('I add {string} to Cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify {string} is displayed in the Cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('Enter valid details and place the order', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify order is present in the Order History', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});