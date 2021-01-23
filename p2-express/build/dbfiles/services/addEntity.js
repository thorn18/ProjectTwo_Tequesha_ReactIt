"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnEntity = void 0;
var dynamo_1 = __importDefault(require("../conn/dynamo"));
function addAnEntity(TableName, ourItem) {
    var ourItemFinal = JSON.parse(JSON.stringify(ourItem));
    var params = {
        TableName: TableName,
        Item: ourItem
    };
    dynamo_1.default.put(params, function (err, data) {
        if (err) {
            console.log(err);
            return 400;
        }
        else {
            console.log("Operation Completed");
            return 200;
        }
    });
}
exports.addAnEntity = addAnEntity;
