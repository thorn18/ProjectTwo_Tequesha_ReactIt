"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pgConn_1 = require("../pgConn/pgConn");
<<<<<<< HEAD
function insert_thread(category, title, description, username) {
    pgConn_1.pool.connect();
    pgConn_1.pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title, description, username], function (data) {
        pgConn_1.quit();
    });
}
insert_thread('category', 'myTitle', 'myDescription', 'slaman 200');
=======
var ThreadService = /** @class */ (function () {
    function ThreadService() {
    }
    ThreadService.prototype.insert_thread = function (category, title, description, username) {
        //pool.connect();
        pgConn_1.pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title, description, username], function () {
            pgConn_1.pool.end();
        });
    };
    ThreadService.prototype.getThreads = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pgConn_1.pool.query('select * from threads').then(function (data) {
                            if (data) {
                                ret = data.rows;
                            }
                            // pool.end();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return ThreadService;
}());
exports.default = ThreadService;
>>>>>>> b1ef61084bc7f26da90ae005533335c35452f020
