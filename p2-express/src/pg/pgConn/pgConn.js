"use strict";
exports.__esModule = true;
exports.quit = exports.client = exports.pool = void 0;
require('dotenv').config({ path: './.env' });
var pg_1 = require("pg");
var myConn = new Object({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
});
exports.pool = new pg_1.Pool(myConn);
exports.client = new pg_1.Client(myConn);
function quit() {
    // The app is closing, shut down the connections.
    exports.pool.end();
    process.exit();
}
exports.quit = quit;
