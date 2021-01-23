"use strict";
exports.__esModule = true;
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    endpoint: 'http://dynamodb.us-east-2.amazonaws.com'
});
exports["default"] = docClient;
