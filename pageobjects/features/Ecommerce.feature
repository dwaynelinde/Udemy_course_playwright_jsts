Feature: Ecommerce validations

    Scenario: Placing the Order
        Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When I add "Zara coat 3" to Cart
        Then Verify "Zara coat 3" is displayed in the Cart
        When Enter valid details and place the order
        Then Verify order is present in the Order History


