const { Builder, By, Key, until } = require("selenium-webdriver");
const { elementLocated } = require("selenium-webdriver/lib/until");
require("chromedriver");
const should = require("chai").should();
const helpers = require("./helpers");
const fs = require("fs");

describe("Login Tests", function () {
  let driver;
  var testConfig = JSON.parse(fs.readFileSync("config.json"));

  afterEach(async function () {
    await driver.sleep(5000);
    await driver.quit();
  });
  
  testConfig.forEach((testData) => {
    it(testData.description, async function () {
      //open URL
      driver = await new Builder().forBrowser("chrome").build();
      await helpers.openUrl(driver, "http://automationpractice.com/");

      //click to sign in title and attempt to sign in
      let signInButton = await driver.findElement(
        By.className("header_user_info")
      );
      await signInButton.click();
      let text1 = await driver.wait(until.elementLocated(By.id("email")), 5000);
      text1.sendKeys(testData.email);
      let text2 = await driver.findElement(By.id("passwd"));
      text2.sendKeys(testData.password);
      let submitButton = await driver.findElement(By.id("SubmitLogin"));
      submitButton.click();

      //assert
      if (testData.shouldLogin) {
        await driver.wait(until.elementLocated(By.id("center_column")));
        let pageTitle = await driver.getTitle();
        pageTitle.should.equal("My account - My Store");
      } else {
        let errorSign = await driver.wait(
          until.elementLocated(By.xpath('//*[@id="center_column"]/div[1]/p')),
          5000
        );
        let errorMessage = await errorSign.getText();
        errorMessage.should.equal("There is 1 error");
      }
    });
  });
});
