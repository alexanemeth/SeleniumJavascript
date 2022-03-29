const { assert } = require("chai");
const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const should = require("chai").should();
const helpers = require("./helpers");

describe("Registration Tests", function () {
  let driver;

  afterEach(async function () {
    await driver.sleep(5000);
    await driver.quit();
  });

  it("should be able to register with valid data", async function () {
    //open URL
    driver = await new Builder().forBrowser("chrome").build();
    await helpers.openUrl(driver, "http://automationpractice.com/");

    //click to login on homepage
    let loginButton = await driver.findElement(By.className("login"));
    await loginButton.click();
    let emailCreateButton = await driver.wait(
      until.elementLocated(By.id("email_create")),
      10000
    );

    //generating random e-mail address
    const randomStringGenerator = helpers.generateString(10);
    await emailCreateButton.sendKeys(`${randomStringGenerator}@gmail.com`);
    let submitCreateButton = await driver.findElement(By.id("SubmitCreate"));
    submitCreateButton.click();
    await driver.wait(
      until.urlIs(
        "http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation"
      ),
      10000
    );

    //filling ot registration form
    let gender = await driver.findElement(By.id("uniform-id_gender1"));
    gender.click();
    assert(gender.isSelected());
    let firstname = await driver.findElement(By.id("customer_firstname"));
    await firstname.sendKeys("Bence");
    let lastname = await driver.findElement(By.id("customer_lastname"));
    await lastname.sendKeys("Kocsis");
    let password = await driver.findElement(By.id("passwd"));
    await password.sendKeys("GYy35!WsyijTsHq");
    let days = await driver.findElement(By.id("days"));
    await days.sendKeys("20");
    let months = await driver.findElement(By.id("months"));
    await months.sendKeys("October");
    let years = await driver.findElement(By.id("years"));
    await years.sendKeys("1990");
    let newsLetter = await driver.findElement(By.id("uniform-newsletter"));
    await newsLetter.click();
    let address = await driver.findElement(By.id("address1"));
    await address.sendKeys("Los Angeles St.");
    let city = await driver.findElement(By.id("city"));
    await city.sendKeys("Los Angeles");
    let state = await driver.findElement(By.id("id_state"));
    await state.sendKeys("California");
    let postcode = await driver.findElement(By.id("postcode"));
    await postcode.sendKeys("90012");
    let country = await driver.findElement(By.id("id_country"));
    await country.sendKeys("21");
    let mobilePhone = await driver.findElement(By.id("phone_mobile"));
    await mobilePhone.sendKeys("+36305556666");
    let submitAccountButton = await driver.findElement(By.id("submitAccount"));
    await submitAccountButton.click();

    //asserting the success of registration
    let pageTitle = await driver.getTitle();
    pageTitle.should.equal("My account - My Store");
  });
});
