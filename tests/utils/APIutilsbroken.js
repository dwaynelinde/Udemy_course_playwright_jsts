class APIUtils

// Precondition data setup. NOT the test itself. 

{

    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext; 
        this.loginPayload = loginPayload; 
    }

    async getToken() 
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayload    
        }) //200, 201
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json(); 
        token = loginResponseJson.token; 
        console.log(token); 
        return token; 
    } 

    async createOrder(orderPayload) 
    {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
            data: orderPayload,
            headers: {
                        'Authorization': this.getToken(),
                        'Content-Type':'application/json'
                    }, 
        })
        
        const orderResponseJson = await orderResponse.json();  
        console.log(orderResponseJson); 
        orderId = orderResponseJson.orders[0]; 
        return orderId; 

    }

}

// This makes
module.exports = {APIUtils}; 