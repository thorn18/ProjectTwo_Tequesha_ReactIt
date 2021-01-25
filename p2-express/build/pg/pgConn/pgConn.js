"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quit = exports.client = exports.pool = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../../.env' });
var pg_1 = require("pg");
var selectFunction_1 = require("../pgFunctions/selectFunction");
var myConn = new Object({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});
exports.pool = new pg_1.Pool(myConn);
exports.client = new pg_1.Client(myConn);
function quit() {
    // The app is closing, shut down the connections.
    exports.pool.end();
    process.exit();
}
exports.quit = quit;
console.log(exports.pool);
selectFunction_1.getThreads();
