var { describe, it, after, before } = require("selenium-webdriver/testing"),
  assert = require("assert");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var Home = require("../pages/home_page");
chai.use(chaiAsPromised); // uses 'chai-as-promised' plugin
var home_page;

/**
 * Chai-as-promised allows you to extract the value from
 * a Promised value and Assert it.
 */
describe("Library App Test Suite", function() {
  this.timeout(10000);

  beforeEach(function() {
    home_page = new Home();
    home_page.goToUrl("https://library-app.firebaseapp.com/");
  });

  it("Given the Admin dropdown, when clicked, then it SHOULD display three items.", function() {
    home_page.adminDropdown().click();
    home_page.adminDropdownItems().then(function(items) {
      assert.equal(
        items.length,
        3,
        "The Admin dropdown has " + items.length + " items."
      );
    });
  });

  it("Given no text in Email input, when you click 'Request Invitation' button, then the button's opacity should be 0.65.", function() {
    home_page.getOpacityForRequestBtn().then(function(opacity) {
      assert.equal(opacity, "0.65", "The button opacity is : " + opacity);
    });
  });

  it("Given text in Email input, when you click 'Request Invitation' button, then there SHOULD be a confirmation message.", function() {
    home_page.typeEmailInput("practice@stuff.com");
    home_page.waitOpacityForRequestBtn("1");
    home_page.requestBtn().click();
    home_page
      .alertSuccess()
      .getText()
      .then(function(txt) {
        assert(
          txt.includes("Thank you! We saved your email address"),
          "The Alert Text displayed : " + txt
        );
      });
  });

  afterEach(function() {
    home_page.endSession();
  });
});
