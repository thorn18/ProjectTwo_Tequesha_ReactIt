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
exports.__esModule = true;
var express_1 = require("express");
var user = require("./user");
var log_1 = require("../log");
var router = express_1["default"].Router();
router.get('/', function (req, res, next) {
    var u = __assign({}, req.session.user);
    log_1["default"].debug(u);
    //delete u.password;
    if (u.name) {
        res.send(JSON.stringify(u));
    }
    else {
        res.sendStatus(401); // unauthorized
    }
});
// Legacy route, do not use.
router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) { return log_1["default"].error(err); });
    res.redirect('/');
});
// Much more restful
router["delete"]('/', function (req, res, next) {
    req.session.destroy(function (err) { return log_1["default"].error(err); });
    res.sendStatus(204);
});
router.post('/', function (req, res, next) {
    log_1["default"].debug(req.body);
    user.login(req.body.name, req.body.password).then(function (user) {
        if (user === null) {
            res.sendStatus(401);
        }
        req.session.user = user;
        res.send(JSON.stringify(user));
    });
});
exports["default"] = router;
