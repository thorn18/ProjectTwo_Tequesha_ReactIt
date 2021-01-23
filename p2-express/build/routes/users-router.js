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
    user_service_1.default.getUserByName(req.body).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
    res.send('User Registration');
});
router.get('/login/:username', function (req, res, next) {
    user_service_1.default.getUserByName(req.params.username).then(function (returnedUser) {
        if (res && returnedUser) {
            res.send("this is our record" + returnedUser.email);
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
/* GET users listing. */
router.get('/login', function (req, res, next) {
    user_service_1.default.getUserByName("salman").then(function (returnedUser) {
        if (res && returnedUser) {
            res.send("this is our record" + returnedUser.email);
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
exports.default = router;
