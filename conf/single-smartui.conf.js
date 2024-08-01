// single-smartui.conf.js
const dotenv = require("dotenv");
dotenv.config();

const USERNAME = process.env.LT_USERNAME || "username";
const KEY = process.env.LT_ACCESS_KEY || "accessKey";
const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub"; // connect to LambdaTest hub

let capabilities = {
    "browserName": "Chrome",
    "browserVersion": "126",
    "name": "test session",
    "LT:Options": {
        "username": USERNAME,
        "accessKey": KEY,
        "platformName": "Windows 10",
        "project": "Untitled",
        "smartUI.project": "Mobileye testing QA",
        "smartUI.baseline": true,
        "w3c": true,
        "plugin": "node_js-node_js",
        "tunnel": true,
        "tunnelName": "lambdatest-tunnel"
    }
};

// Export capabilities
exports.capabilities = capabilities;

// Export grid URL function
exports.getGridUrl = () => {
    return "https://" + USERNAME + ":" + KEY + GRID_HOST;
};
