const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");
const conf_file = process.argv[3] || "conf/single.conf.js";

const { capabilities } = require("../" + conf_file);

const buildDriver = (caps) => {
  return new Builder()
    .usingServer(
      "http://" +
      process.env.LT_USERNAME +
      ":" +
      process.env.LT_ACCESS_KEY +
      "@hub.lambdatest.com/wd/hub"
    )
    .withCapabilities(caps)
    .build();
};

describe("Mocha Todo Test " + capabilities.browserName, function () {
  let driver;
  this.timeout(0);

  beforeEach(async function () {
    capabilities.name = this.currentTest.title;
    driver = buildDriver(capabilities);
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
    try {
      await driver.executeScript("lambda-status=" + (this.currentTest.state === 'passed' ? "passed" : "failed"));
    } finally {
      await driver.quit();
    }
  });
});
