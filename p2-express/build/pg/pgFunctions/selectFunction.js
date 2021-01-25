"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreads = exports.insert_thread = void 0;
var pgConn_1 = require("../pgConn/pgConn");
function insert_thread(category, title, description, username) {
    pgConn_1.pool.connect();
    pgConn_1.pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title, description, username], function (data) {
        pgConn_1.quit();
    });
}
exports.insert_thread = insert_thread;
function getThreads() {
    pgConn_1.pool.connect();
    pgConn_1.pool.query('select * from threads)', function (data) {
        console.log(data);
        pgConn_1.quit();
    });
}
exports.getThreads = getThreads;
