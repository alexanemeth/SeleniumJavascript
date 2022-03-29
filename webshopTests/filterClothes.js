const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const should = require("chai").should();
const helpers = require("./helpers");

describe("filterClothes", function () {
  let driver;

  afterEach(async function () {
    await driver.sleep(5000);
    await driver.quit();
  });

  it("should be able to filter clothes", async function () {
    //open URL
    driver = await new Builder().forBrowser("chrome").build();
    await helpers.openUrl(driver, "http://automationpractice.com/");

    //filter to women clothes
    let womenButton = await driver.findElement(
      By.xpath('//*[@id="block_top_menu"]/ul/li[1]/a')
    );
    await womenButton.click();
    await driver.wait(until.titleIs("Women - My Store"), 5000);

    //filter by categories
    let categoriesCheckbox = await driver.findElement(
      By.xpath('//*[@id="ul_layered_category_0"]/li[2]')
    );
    await categoriesCheckbox.click();
    let categoriesCheckbox2 = await driver.findElement(
      By.id("uniform-layered_id_feature_21")
    );
    await categoriesCheckbox2.click();
    let compareButton = await driver.findElement(
      By.css("#center_column > div:nth-child(6) > div > form")
    );
    await compareButton.click();
    await driver.wait(
      until.titleIs(
        "Women > Categories Dresses > Properties Maxi Dress - My Store"
      ),
      5000
    );

    //assert
    let summerDress = await driver
      .findElement(By.xpath('//*[@id="center_column"]/ul/li/div/div[2]/h5/a'))
      .getText();
    summerDress.should.equal("Printed Summer Dress");
  });
});
