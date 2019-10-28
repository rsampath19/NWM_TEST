Feature: Ecom tests

  Scenario: User can add multiple items to basket

    Given user logged and in product page
    When sort with "Price (low to high)"
    And the first item should be "Sauce Labs Onesie"
    When sort with "Price (high to low)"
    And the first item should be "Sauce Labs Fleece Jacket"
    And select "Sauce Labs Backpack" and Add to cart
    And select "Sauce Labs Bike Light" and Add to cart
    And go to cart
    Then that the items that you added are in the cart
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    When the item "Sauce Labs Backpack" removed from the basket
    And the item "Sauce Labs Backpack" is not in the basket
    And go to home page
    And select "Sauce Labs Bolt T-Shirt" and Add to cart
    And go to cart
    Then that the items that you added are in the cart
      | Sauce Labs Bike Light |
    And go to checkout
    And enter the address details
    Then that the items that you added are in the cart
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    And the total should be "$28.06"
    When go to finish order
    Then the confirmation should be shown







