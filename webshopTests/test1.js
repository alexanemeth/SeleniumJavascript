const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const should = require("chai").should();
const helpers = require("./helpers");

describe("Webshop Tests", function () {
  it("should add items to cart", async function () {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await helpers.openUrl(
        driver,
        "http://automationpractice.com/",
        "My Store"
      );

      await helpers.mouseOver(
        driver,
        By.css("#block_top_menu > ul > li:nth-child(1) > a")
      );

      //click on tShirts
      let tShirtLink = await driver.findElement(
        By.css(
          "#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(1) > a"
        )
      );
      let tShirtText = await tShirtLink.getText();
      tShirtText.should.equal("T-shirts");
      await tShirtLink.click();
      await driver.sleep(2000);
      let currentUrl = await driver.getCurrentUrl();
      currentUrl.should.equal(
        "http://automationpractice.com/index.php?id_category=5&controller=category"
      );
      await driver.sleep(3000);
      await helpers.mouseOver(
        driver,
        By.css("#center_column > ul > li:nth-child(1)")
      );
      let cartButton = await driver.findElement(
        By.css('#center_column > ul > li:nth-child(1) a[title="Add to cart"]')
      );
      await cartButton.click();
      await driver.sleep(3000);
      let button = await driver.findElement(
        By.css('#layer_cart a[title="Proceed to checkout"]')
      );
      await button.click();
      await driver.sleep(3000);
      let Title = await driver.findElement(
        By.css("#product_1_1_0_0 > td.cart_description > p > a")
      );
      let cim = await Title.getText();
      cim.should.equal("Faded Short Sleeve T-shirts");
      await driver.sleep(3000);
    } finally {
      await driver.quit();
    }
  });
});
