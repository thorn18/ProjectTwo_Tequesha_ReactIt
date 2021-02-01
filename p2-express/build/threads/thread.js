"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
var Thread = /** @class */ (function () {
    function Thread() {
        this.created_on = '';
        this.thread_id = '';
        this.threadcategory = '';
        this.threadname = '';
        this.threaddescription = '';
        this.username = '';
        this.tags = [];
        this.admincomments = '';
        this.repliesdisabled = false;
    }
    return Thread;
}());
exports.Thread = Thread;
