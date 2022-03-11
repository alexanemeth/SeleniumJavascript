const { Builder, By, Key, until } = require("selenium-webdriver");
let should = require("chai").should();
require("chromedriver");

//describe
describe("add todo tests", function () {
  it("successfully adds a todo to application", async function () {
    //launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

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

    //close the browser
    await driver.quit();
  });
});
