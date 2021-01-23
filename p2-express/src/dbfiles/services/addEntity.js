"use strict";
exports.__esModule = true;
exports.addAnEntity = void 0;
var dynamo_1 = require("../conn/dynamo");
function addAnEntity(TableName, ourItem) {
    var ourItemFinal = JSON.parse(JSON.stringify(ourItem));
    var params = {
        TableName: TableName,
        Item: ourItem
    };
    dynamo_1["default"].put(params, function (err, data) {
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
