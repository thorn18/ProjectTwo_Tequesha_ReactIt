"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var email_service_1 = __importDefault(require("../dbfiles/services/email.service"));
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    email_service_1.default.getBannedEmails().then(function (emails) {
        res.send(JSON.stringify(emails));
    });
});
router.get('/:address', function (req, res, next) {
    email_service_1.default.getEmailAddress(req.params.address).then(function (email) {
        res.send(JSON.stringify(email));
    });
});
router.delete('/:address', function (req, res, next) {
    email_service_1.default.deleteEmail(req.body).then(function (data) {
        res.sendStatus(200);
    }).catch(function (err) {
        res.sendStatus(500);
    });
});
router.post('/', function (req, res, next) {
    email_service_1.default.addEmailAddress(req.body).then(function (data) {
        res.sendStatus(201);
    }).catch(function (err) {
        res.sendStatus(500);
    });
});
exports.default = router;
