const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");
const conf_file = process.argv[3] || "conf/parallel.conf.js";
const { capabilities } = require("../" + conf_file);

const buildDriver = (caps) => {
  return new Builder()
    .usingServer(`https://${caps.user}:${caps.accessKey}@hub.lambdatest.com/wd/hub`)
    .withCapabilities({
      browserName: caps.browserName,
      platformName: caps.platform,
      browserVersion: caps.version,
      'LT:Options': {
        build: caps.build,
        name: caps.name,
        user: caps.user,
        accessKey: caps.accessKey,
        visual: caps.visual,
        network: caps.network,
        console: caps.console,
        tunnel: caps.tunnel
      }
    })
    .build();
};

capabilities.forEach((caps) => {
  describe("Mocha Todo Test " + caps.browserName, function () {
    let driver;
    this.timeout(0);

    beforeEach(async function () {
      caps.name = this.currentTest.title;
      driver = buildDriver(caps);
    });

    it("check for mobileye title" + capabilities.browserName, async function () {
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
});
