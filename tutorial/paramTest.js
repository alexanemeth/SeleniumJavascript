const { Builder, By, Key, until } = require("selenium-webdriver");
let should = require("chai").should();
require("chromedriver");
const ltCapabilities = require("./capabilities");

//describe
describe("add todo tests2", function () {
  let driver;
  const gridUrl =
    "https://alexanemeth90:hYspWlP3pq8bZWWDPmGaM70rXpRRORrb4dBSiOBS2U18A9LuMM@hub.lambdatest.com/wd/hub";

  it("successfully adds a todo to application2", async function () {
    ltCapabilities.capabilities.name = this.currentTest.title;
    driver = new Builder()
      .usingServer(gridUrl)
      .withCapabilities(ltCapabilities.capabilities)
      .build();
    //navigate to our application
    await driver.get("https://lambdatest.github.io/sample-todo-app/");

    //add a todo
    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Learn Selenium", Key.RETURN);

    //assert
    let todoText = await driver.findElement(By.xpath("//li[last()]")).getText();

    //assert using chai should
    todoText.should.equal("Learn Selenium");

    await driver.quit();
  });
});
