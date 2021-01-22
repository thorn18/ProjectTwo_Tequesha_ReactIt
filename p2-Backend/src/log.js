"use strict";
exports.__esModule = true;
var log4js_1 = require("log4js");
log4js_1["default"].configure('logconfig.json');
var logger = log4js_1["default"].getLogger();
exports["default"] = logger;
