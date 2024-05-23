const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");
const conf_file = process.argv[3] || "conf/parallel.conf.js";
const { capabilities } = require("../" + conf_file);
const {Select} = require('selenium-webdriver')

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

    it("check for contact page in " + caps.browserName, async function () {
      await testContactPage(driver);
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

async function testContactPage(driver) {
  await driver.get("https://www.mobileye.com/contact/");
  await driver.findElement(By.id("firstname")).sendKeys("test");
  await driver.findElement(By.id("lastname")).sendKeys("testing");
  await driver.findElement(By.id("email")).sendKeys("david2@mymail.com");
  country_dropdown = await driver.findElement(By.id("country"));
  const select = new Select(country_dropdown);
  await select.selectByValue("Zambia");
  what_best_describes_you = await driver.findElement(By.id("what_best_describes_you"));
  const select_what = new Select(what_best_describes_you);
  await select_what.selectByValue("Other")
  await driver.findElement(By.css(".submitBtn")).click();
  await driver.sleep(2000);
  thank_you_title = await driver.getTitle();
  assert.strictEqual(thank_you_title, "Thank You", "wrong title");
}