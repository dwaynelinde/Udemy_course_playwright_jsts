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

    // error but REQUIRED
    const eighteenOrOlder = pageRegister.locator('#checkbox'); 
    const registerBtn = pageRegister.locator('#register'); 


    // going to website: https://rahulshettyacademy.com/client/#/auth/register
    


    await pageRegister.goto("https://rahulshettyacademy.com/client/#/auth/register");
    console.log(await pageRegister.title());

    // values for the fields

    await firstName.fill("testfirst1"); 
    await lastName.fill("testlast1"); 
    await email.fill("test@example.org");
    await phoneNumber.fill("2125551212"); 
    await password.fill("testpass1!"); 
    await confirmPassword.fill("testpass1!"); 

    // Check the 18 or older checkbox. 
    // THIS LINE DOESN'T WORK. DEBUG FROM HERE.
    await eighteenOrOlder.getByText('I am 18 year or Older').check(); 

    // click the 'register' button

    await registerBtn.click(); 

});  








// making a new account

// logging in with that new account's username and password

// list items on login page, and return results to user



