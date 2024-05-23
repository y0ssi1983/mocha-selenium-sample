const dotenv = require("dotenv")

dotenv.config();
LT_USERNAME = process.env.LT_USERNAME || "<your username>";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

exports.capabilities = {
  'build': 'Mocha-Selenium-Testing', //Build name
  'name': 'Yossi', // Test name
  'platform':'Windows 11', // OS name
  'browserName': 'chrome', // Browser name
  'version': 'latest', // Browser version
  'visual': false,  // To take step by step screenshot
  'network':false,  // To capture network Logs
  'console':false, // To capture console logs.
  'tunnel': false // If you want to run the localhost than change it to true
  };