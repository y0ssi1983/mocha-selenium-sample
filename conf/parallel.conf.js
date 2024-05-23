const dotenv = require("dotenv");
dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || "<your username>";
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

const config = {
  commonCapabilities: {
    build: "Mocha-Selenium-Sample", // Build name
    tunnel: false, // Make it true to run the localhost through tunnel
    user: LT_USERNAME,
    accessKey: LT_ACCESS_KEY
  },
  multiCapabilities: [
    {
      name: "Your Test Name - Firefox", // Test name
      platform: "Windows 10", // OS name
      browserName: "firefox",
      version: "latest",
      visual: false, // To take step by step screenshot
      network: false, // To capture network Logs
      console: false // To capture console logs.
    },
    {
      name: "Your Test Name - Chrome", // Test name
      platform: "Windows 11", // OS name
      browserName: "chrome",
      version: "75.0",
      visual: false, // To take step by step screenshot
      network: false, // To capture network Logs
      console: false // To capture console logs.
    }
  ]
};

exports.capabilities = [];

// Code to support common capabilities
config.multiCapabilities.forEach(function (caps) {
  const temp_caps = { ...config.commonCapabilities, ...caps };
  exports.capabilities.push(temp_caps);
});
