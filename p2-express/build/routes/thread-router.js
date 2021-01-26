"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var selectFunction_1 = __importDefault(require("../pg/pgFunctions/selectFunction"));
var router = express_1.default.Router();
/* GET threads listing. */
router.get('/', function (req, res, next) {
    console.log("Inside get Thread");
    console.log(req.query);
    //console.log(res);
    selectFunction_1.default.getThreads().then(function (data) {
        console.log(data);
    });
});
exports.default = router;
