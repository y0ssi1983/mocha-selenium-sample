const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const conf_file = process.argv[3] || "conf/single.conf.js";
const { capabilities } = require("../" + conf_file);
const {Select} = require('selenium-webdriver')


const LT_USERNAME = capabilities.user;
const LT_ACCESS_KEY = capabilities.accessKey;
const gridUrl = `https://${LT_USERNAME}:${LT_ACCESS_KEY}@hub.lambdatest.com/wd/hub`;


const buildDriver = () => {
  return new Builder()
    .usingServer(gridUrl)
    .withCapabilities({
      'LT:Options': capabilities,
      'browserName': capabilities.browserName
    })
    .build();
};

describe("Test with Mocha in " + capabilities.browserName, function () {
  let driver;
  this.timeout(0);

  beforeEach(async function () {
    capabilities.name = this.currentTest.title;
    driver = buildDriver();
  });

  it("check for mobileye title in " + capabilities.browserName + "browser", async function () {
    await testTitle(driver);
  });

  it("testing contact page in " + capabilities.browserName + "browser", async function () {
    const firstname = "test";
    const lastname = "testing";
    const email = "david2@mymail.com";
    const country = "Zambia";
    const what_best = "Other";
    await testContactPage(driver, firstname, lastname, email, country, what_best);
  });

  // it("teting new contactUs page in " + capabilities.browserName + "browser", async function() {
  //   const firstname = "test";
  //   const lastname = "testing";
  //   const email = "david2@mymail.com";
  //   const country = "Israel";
  //   await testNewContactUs(driver, firstname, lastname, email, country);
  // })

  afterEach(async function () {
    if (driver) {
      try {
        await driver.executeScript("lambda-status=" + (this.currentTest.state === 'passed' ? "passed" : "failed"));
      } finally {
        await driver.quit();
      }
    }
  });
});

async function testTitle(driver) {
  await driver.get("https://backoffice-stage.mbly.co/");
  mobileye_title = await driver.getTitle();
  assert.strictEqual(mobileye_title, "Mobileye | Driver Assist and Autonomous Driving Technologies", "wrong title");
}

async function testContactPage(driver, firstname, lastname, email, country, what_best) {
  await driver.get("https://backoffice-stage.mbly.co/contact/");
  await driver.findElement(By.id("firstname")).sendKeys(firstname);
  await driver.findElement(By.id("lastname")).sendKeys(lastname);
  await driver.findElement(By.id("email")).sendKeys(email);
  country_dropdown = await driver.findElement(By.id("country"));
  const select = new Select(country_dropdown);
  await select.selectByValue(country);
  what_best_describes_you = await driver.findElement(By.id("what_best_describes_you"));
  const select_what = new Select(what_best_describes_you);
  await select_what.selectByValue(what_best)
  await driver.findElement(By.css(".submitBtn")).click();
  await driver.sleep(2000);
  thank_you_title = await driver.getTitle();
  assert.strictEqual(thank_you_title, "Thank You", "wrong title");
}

// async function testNewContactUs(driver, firstname, lastname, email, country) {
//   await driver.get("https://stage1.mbly.co/contact/");
//   await driver.findElement(By.css(".topicSelect")).click();
//   await driver.findElement(By.xpath('//*[@id="__layout"]/div/div/div[2]/div/div/div[2]/div/div/button[6]/p')).click();
//   await driver.findElement(By.id("firstname")).sendKeys(firstname);
//   await driver.findElement(By.id("lastname")).sendKeys(lastname);
//   await driver.findElement(By.id("email")).sendKeys(email);
//   country_dropdown = await driver.findElement(By.id("country"));
//   const select = new Select(country_dropdown);
//   await select.selectByValue(country);
//   await driver.findElement(By.xpath('//*[@id="__layout"]/div/div/div[2]/div/div/form/div[7]/button')).click();
//   await driver.sleep(2000);
//   thank_you_title = await driver.getTitle();
//   assert.strictEqual(thank_you_title, "Thank You", "wrong title");
// }