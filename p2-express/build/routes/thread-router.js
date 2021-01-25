"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var selectFunction_1 = __importDefault(require("../pg/pgFunctions/selectFunction"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log("Inside get Thread");
    return selectFunction_1.default.getThreads();
});
exports.default = router;
