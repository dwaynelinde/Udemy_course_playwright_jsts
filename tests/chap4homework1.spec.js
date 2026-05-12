const { test, expect } = require('@playwright/test'); 



// tests 

// test1 

test("Browser Chapter 4 Homework", async ({browser})=>{


// const variables to use in tests

// Initialize the browser and page first. 
// Login Page: website: https://rahulshettyacademy.com/client/#/auth/login
// Register Page: website: https://rahulshettyacademy.com/client/#/auth/register
// page: https://rahulshettyacademy.com/client/#/auth/

const context = await browser.newContext(); 
const pageRegister = await browser.newPage(); 
const pageLogin = await browser.newPage(); 

// Now, consts for form variables. 

const firstName = pageRegister.locator(); 
const lastName = pageRegister.locator(); 
const email = pageRegister.locator(); 
const phoneNumber = pageRegister.locator(); 
const occupation = pageRegister.locator(); 
const gender = pageRegister.locator(); 
const password = pageRegister.locator(); 
const eighteenOrOlder = pageRegister.locator(); 


// going to website: https://rahulshettyacademy.com/client/#/auth/register

await pageRegister.goto("https://rahulshettyacademy.com/client/#/auth/register");
console.log(await pageRegister.title());


});  




// making a new account

// logging in with that new account's username and password

// list items on login page, and return results to user



