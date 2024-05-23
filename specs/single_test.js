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

  it("check for mobileye title " + capabilities.browserName, async function () {
    await driver.get("https://www.mobileye.com");
    mobileye_title = await driver.getTitle();
    assert.strictEqual(mobileye_title, "Mobileye | Driver Assist and Autonomous Driving Technologies", "wrong title");
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
