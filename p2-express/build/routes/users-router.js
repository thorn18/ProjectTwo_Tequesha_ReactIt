"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_service_1 = __importDefault(require("../dbfiles/services/user.service"));
var user = __importStar(require("../user/user"));
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
<<<<<<< HEAD
router.post("/", function (req, res, next) {
    user.login(req.body.username, req.body.password).then(function (user) {
        if (user === null) {
            res.sendStatus(401);
        }
        req.session.user = user;
        res.send(JSON.stringify(user));
    });
});
router.get('/login/:username', function (req, res, next) {
=======
router.post('/login/:username', function (req, res, next) {
    console.log("Getting user on login!");
>>>>>>> a1df0ab612043c06a2195170606b2e1c9772de33
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
exports.default = router;
