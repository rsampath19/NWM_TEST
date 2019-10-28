const { Given, When, Then } = require("cucumber");
// const except = require('chai')
// import {expect} from 'Chai';
require("chai/register-expect");
// require('whatwg-fetch');
const fetch = require("node-fetch");

Given(/^user logged and in product page$/, function() {
  browser.url("/");
  $("#user-name").setValue("standard_user");
  $("#password").setValue("secret_sauce");
  $(".btn_action").click();
  browser.pause(1000);
});

When(/^sort with "([^"]*)"$/, function(sortOrder) {
  browser.selectByVisibleText(".product_sort_container", sortOrder);
  browser.pause(1000);
});

When(/^the first item should be "([^"]*)"$/, function(product) {
  const actual = $(
    "#inventory_container > div > div:nth-child(1) > div.inventory_item_label"
  )
    .getText()
    .includes(product);
  console.log(actual);
  expect(actual).to.equal(true);
});
// ADD TO CART

When(/^select "([^"]*)" and Add to cart$/, function(product) {
  const currentItem = $("a=" + product);
  currentItem.click();
  browser.pause(1000);
  $("#inventory_item_container > div > div > div > button").click();
  $("#inventory_item_container > div > button").click();
});

When(/^go to cart$/, function() {
  browser.pause(1000);
  $("#shopping_cart_container > a").click();
});

When(/^go to home page$/, function() {
  browser.pause(1000);
  browser.url("/inventory.html");
});

When(/^go to checkout$/, function() {
  browser.pause(1000);
  browser.url("/checkout-step-one.html");
});

When(/^enter the address details$/, function() {
  $("#first-name").setValue("test");
  $("#last-name").setValue("test");
  $("#postal-code").setValue("test");
  browser.pause(1000);
  $('//input[@value="CONTINUE"]').click();
});

Then(/^that the items that you added are in the cart$/, function(items) {
  //cart_list
  console.log(items);
  const data = items.raw();
  console.log(data);
  data.forEach(function(element) {
    console.log("Element:" + element);
    $(".cart_list")
      .getText()
      .includes(element);
  });
});

When(/^the item "([^"]*)" removed from the basket$/, function(product) {
  $(
    '//div[text()="' +
      product +
      '"]//ancestor::div[@class="cart_item"]//button[text()="REMOVE"]'
  ).click();
  browser.pause(1000);
});

When(/^the item "([^"]*)" is not in the basket$/, function(product) {
  expect(
    $(
      '//div[text()="' +
        product +
        '"]//ancestor::div[@class="cart_item"]//button[text()="REMOVE"]'
    ).isExisting()
  ).to.equal(false);
});

Then(/^the total should be "([^"]*)"$/, function(total) {
  const actual = $(".summary_total_label")
    .getText()
    .includes(total);
  console.log(actual);
  expect(actual).to.equal(true);
});

When(/^go to finish order$/, function() {
  browser.url("/checkout-complete.html");
  browser.pause(1000);
});

Then(/^the confirmation should be shown$/, function() {
  const actual = $("//body")
    .getText()
    .includes("THANK YOU FOR YOUR ORDER");
  console.log(actual);
  expect(actual).to.equal(true);
});
//API
Given(/^I build the url as "([^"]*)"$/, function(url) {
  this.url = url;
});

When(/^set headers$/, function() {
  this.headers =
    "{\n" +
    '      "Content-type": "application/json; charset=UTF-8"\n' +
    "    }";
});

When(/^set the request type to "([^"]*)"$/, function(requestType) {
  this.method = requestType;
});

When(/^perform the request "([^"]*)"$/, async function(requestType) {
  const actualResult = await fetch(this.url, {
    method: requestType,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: this.body
  })
    .then(response => response.json())
    .then(json => json);
  console.log(actualResult);
});

Then(/^assert the response$/, function() {});

When(/^set the body parameter$/, function() {
  this.body =
    "{\n" +
    '\t"title": "foo",\n' +
    '      "body": "bar",\n' +
    '      "userId": 1\n' +
    "    }";
});

When(/^set the body parameter for patch$/, function() {
  this.body = "{\n" + '\t"title": "foo"\n' + "    }";
});
