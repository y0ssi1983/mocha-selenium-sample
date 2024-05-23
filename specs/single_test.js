const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome'); // Ensure chrome is imported
const conf_file = process.argv[3] || "conf/single.cond.js";
const { capabilities } = require("../" + conf_file);

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

describe("Mocha Todo Test " + capabilities.browserName, function () {
  let driver;
  this.timeout(0);

  beforeEach(async function () {
    capabilities.name = this.currentTest.title;
    driver = buildDriver();
  });

  it("can find search results " + capabilities.browserName, async function () {
    await driver.get("https://lambdatest.github.io/sample-todo-app/");
    await driver.findElement(By.name('li1')).click();
    console.log("Successfully clicked first list item.");

    await driver.findElement(By.name('li2')).click();
    console.log("Successfully clicked second list item.");

    await driver.findElement(By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial\n');
    await driver.findElement(By.id('addbutton')).click();
    console.log("Successfully added a new task.");
  });

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
