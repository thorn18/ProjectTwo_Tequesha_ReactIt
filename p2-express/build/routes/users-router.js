"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_service_1 = __importDefault(require("../dbfiles/services/user.service"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('express is working');
});
/* GET users listing. */
router.post('/register', function (req, res, next) {
    user_service_1.default.addUser(req.body).then(function (result) {
        console.log(result);
        console.log("Registered!");
    }).catch(function (err) {
        console.log(err);
        console.log("NotRegistered!");
    });
});
router.post('/login/:username', function (req, res, next) {
    console.log("Getting user on login!");
    user_service_1.default.getUserByName(req.params.username).then(function (returnedUser) {
        if (res && returnedUser) {
            res.send(JSON.stringify(returnedUser));
        }
        if (returnedUser && req.body) {
            if (returnedUser.username == req.body.username && returnedUser.password == req.body.password) {
                res.send("200");
            }
            else {
                res.send("400");
            }
        }
    }).catch(function (err) {
        console.log("404");
        res.send(err);
    });
});
router.put('/', function (req, res, next) {
    user_service_1.default.updateUser(req.body).then(function (data) {
        res.send(data);
    });
});
exports.default = router;
