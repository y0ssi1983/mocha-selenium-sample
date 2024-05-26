const dotenv = require("dotenv");
dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME || "<your username>";
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

exports.capabilities = {
  'build': 'Mobileye-Single-Testing',
  'name': 'Yossi',
  'platform': 'Windows 11',
  'browserName': 'chrome',
  'version': 'latest',
  'visual': true,
  'network': true,
  'console': true,
  'tunnel': false,
  'user': LT_USERNAME,
  'accessKey': LT_ACCESS_KEY
};