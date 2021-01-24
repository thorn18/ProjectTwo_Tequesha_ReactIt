"use strict";
exports.__esModule = true;
var pgConn_1 = require("../pgConn/pgConn");
pgConn_1.client.connect();
pgConn_1.client.query('SELECT * from threads', function (err, res) {
    console.log(res.rows[0]);
    pgConn_1.client.end();
});
pgConn_1.pool.connect();
pgConn_1.pool.query('call insert_thread($1::text,$2::text,$3::integer)', ['reactit group', 'node js in the meeting', 5555], function (data) {
    console.log(data);
    pgConn_1.quit();
});
