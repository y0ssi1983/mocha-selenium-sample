// single-ui-test.js

const webdriver = require("selenium-webdriver");
const moment = require("moment");
const assert = require("assert");
const { capabilities, getGridUrl } = require("../conf/single-smartui.conf.js");
const waitTime = 2; // 2 seconds
const lambdaTunnel = require('@lambdatest/node-tunnel');
const { error } = require("console");

const tunnelInstance = new lambdaTunnel();

const tunnelArguments = {
  user: capabilities["LT:Options"].username,
  key: capabilities["LT:Options"].accessKey,
  tunnelName: capabilities["LT:Options"].tunnelName
}

describe("LambdaTest SmartUI Tests", function () {
  this.timeout(30000); // Set a timeout for asynchronous operations

  let driver;

  before(async function () {
    try {
      const isTunnelStarted = await tunnelInstance.start(tunnelArguments);
      if (!isTunnelStarted) {
        throw new Error('Tunnel not starting');
      }
      console.log("tunnel created");
    } catch (error) {
      console.error("Error starting tunnel:", error);
      throw error;
    }
  });

  after(async function () {
    try {
      await tunnelInstance.stop();
      console.log("tunnel stopped");
    } catch (error) {
      console.error("Error stopping:", error);
      throw error
    }
  })
  beforeEach(async function () {
      const gridUrl = getGridUrl();
      driver = await new webdriver.Builder()
          .usingServer(gridUrl)
          .withCapabilities(capabilities)
          .build();
  });

  afterEach(async function () {
      await driver.quit();
  });

  it("should load LambdaTest homepage and take a screenshot", async function () {
      const start_date = moment();
      const url = "https://corporate-stage.mbly.co/about/";
      await driver.get(url);
      await driver.sleep(2000);

      const end_date = moment();
      const duration = moment.duration(end_date.diff(start_date));
      console.log("Setup Time:", duration.asSeconds());

      // Take a screenshot for SmartUI
      await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
      const screenshotResponse = await driver.executeScript(`smartui.takeScreenshot,{"screenshotName":"about-page"}`);
      console.log("Screenshot Response:", screenshotResponse);

      // Verify page title
      const title = await driver.getTitle();
      assert.strictEqual(title.includes("About Mobileye | Our Vision, History, and Milestones"), true, "Page title does not match");

      // Set LambdaTest status
      await driver.executeScript("lambda-status=passed");
  });
});

{/* <title>About Mobileye | Our Vision, History, and Milestones </title> */}