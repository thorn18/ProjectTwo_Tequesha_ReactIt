"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_service_1 = __importDefault(require("../dbfiles/services/user.service"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    var u = __assign({}, req.session.user);
    res.send(JSON.stringify(u));
});
router.get('/:username', function (req, res, next) {
    console.log('Back-end for Get User');
    user_service_1.default.getUserByName(req.params.username).then(function (returnedUser) {
        res.send(JSON.stringify(returnedUser));
    }).catch(function (err) {
        res.sendStatus(404);
    });
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
router.post('/', function (req, res, next) {
    console.log("Getting user on login!");
    user_service_1.default.getUserByName(req.body.username).then(function (returnedUser) {
        console.log(returnedUser === null || returnedUser === void 0 ? void 0 : returnedUser.password);
        console.log(req.body.password);
        if (returnedUser && returnedUser.password === req.body.password) {
            res.send(JSON.stringify(returnedUser));
        }
        else {
            res.send("404");
        }
    });
});
router.put('/', function (req, res, next) {
    user_service_1.default.updateUser(req.body).then(function (data) {
        res.send(data);
    });
});
router.delete('/:username', function (req, res, next) {
    user_service_1.default.deleteUser(req.params.username).then(function (data) {
        res.sendStatus(200);
    }).catch(function (err) {
        res.sendStatus(500);
    });
});
exports.default = router;
