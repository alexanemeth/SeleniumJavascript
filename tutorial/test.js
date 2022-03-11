const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
async function example() {
  let searchString = "Automation testing with Selenium";

  let builder = new Builder();
  builder.forBrowser("chrome");
  let driver = builder.build();
  //let driver = new Builder().forBrowser("chrome").build();

  await driver.get("http://google.com");
  let button = await driver.findElement(By.id("L2AGLb"));
  await button.click();
  await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);

  let title = await driver.getTitle();
  console.log("Title is: ", title);

  await driver.quit();
}
example();
