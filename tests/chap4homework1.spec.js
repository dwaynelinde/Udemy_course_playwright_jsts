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

    const firstName = pageRegister.locator('#firstName'); 
    const lastName = pageRegister.locator('#lastName'); 
    const email = pageRegister.locator('#userEmail'); 
    const phoneNumber = pageRegister.locator('#userMobile'); 

    // error: 
    // const occupation = pageRegister.locator(getByRole('combobox')); 

    // error:
    // const gender = pageRegister.locator(getByText('Gender Male Female')); 

    const password = pageRegister.locator('#userPassword'); 
    const confirmPassword = pageRegister.locator('#confirmPassword')

    // error:
    // const eighteenOrOlder = pageRegister.locator(getByRole('checkbox')); 


    // going to website: https://rahulshettyacademy.com/client/#/auth/register
    // what fields are required: 


    await pageRegister.goto("https://rahulshettyacademy.com/client/#/auth/register");
    console.log(await pageRegister.title());

    // values for the fields

    await firstName.fill("testfirst1"); 
    await lastName.fill("testlast1"); 
    await email.fill("test@example.org");
    await phoneNumber.fill("1-212-555-1212"); 
    await password.fill("testpass1!"); 
    await confirmPassword.fill("testpass1!"); 


});  




// making a new account

// logging in with that new account's username and password

// list items on login page, and return results to user



