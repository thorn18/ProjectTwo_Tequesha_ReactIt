"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var constant_1 = __importDefault(require("./constant"));
var users_router_1 = __importDefault(require("./routes/users-router"));
var thread_router_1 = __importDefault(require("./routes/thread-router"));
var email_router_1 = __importDefault(require("./routes/email-router"));
var express_session_1 = __importDefault(require("express-session"));
var memorystore_1 = __importDefault(require("memorystore"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_router_1 = __importDefault(require("./routes/index-router"));
dotenv_1.default.config();
var app = express_1.default();
// view engine setup
app.use(cors_1.default({ origin: [process.env.CLIENT, process.env.MOBILE, process.env.ANDROID], credentials: true }));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(constant_1.default));
app.use(express_session_1.default({
    secret: 'whatever',
    store: new (memorystore_1.default(express_session_1.default))({ checkPeriod: 86400000 }),
    cookie: {}
}));
app.use('/', index_router_1.default);
app.use('/users', users_router_1.default);
app.use('/threads', thread_router_1.default);
app.use('/emails', email_router_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
