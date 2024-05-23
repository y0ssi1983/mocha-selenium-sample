const dotenv = require("dotenv");
dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || "<your username>";
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

const config = {
  commonCapabilities: {
    build: "Mocha-Selenium-Parallel-Tesing",
    tunnel: false,
    user: LT_USERNAME,
    accessKey: LT_ACCESS_KEY
  },
  multiCapabilities: [
    {
      name: "Your Test Name - Firefox",
      platform: "Windows 10",
      browserName: "firefox",
      version: "latest",
      visual: false,
      network: false,
      console: false
    },
    {
      name: "Your Test Name - Chrome",
      platform: "Windows 11",
      browserName: "chrome",
      version: "75.0",
      visual: false,
      network: false,
      console: false
    }
  ]
};

exports.capabilities = [];

// Code to support common capabilities
config.multiCapabilities.forEach(function (caps) {
  const temp_caps = { ...config.commonCapabilities, ...caps };
  exports.capabilities.push(temp_caps);
});
