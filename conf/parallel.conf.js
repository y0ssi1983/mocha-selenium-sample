const dotenv = require("dotenv");
dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || "<your username>";
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

const config = {
  commonCapabilities: {
    build: "Mobileye-Parallel-Tesing",
    tunnel: true,
    tunnelName: 'lambdatest-tunnel',
    user: LT_USERNAME,
    accessKey: LT_ACCESS_KEY
  },
  multiCapabilities: [
    {
      name: "Your Test Name - Firefox",
      platform: "Windows 10",
      browserName: "firefox",
      version: "latest",
      visual: true,
      network: true,
      console: true
    },
    {
      name: "Your Test Name - Chrome",
      platform: "Windows 11",
      browserName: "chrome",
      version: "latest",
      visual: true,
      network: true,
      console: true
    },
    {
      name: "Your Test Name - Edge",
      platform: "Windows 11",
      browserName: "edge",
      version: "latest",
      visual: true,
      network: true,
      console: true
    }
  ]
};

exports.capabilities = [];

// Code to support common capabilities
config.multiCapabilities.forEach(function (caps) {
  const temp_caps = { ...config.commonCapabilities, ...caps };
  exports.capabilities.push(temp_caps);
});
