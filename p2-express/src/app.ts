import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import publicDir from './constant';
import usersRouter from "./routes/users-router"
import threadRouter from './routes/thread-router';
var app = express();
import dotenv from 'dotenv';

dotenv.config();

// view engine setup
app.use(cors({origin:process.env.CLIENT, credentials: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
// app.use(session({
//   secret: 'whatever',
//   store: new (MemoryStore(session))({checkPeriod: 86400000}),
//   cookie: {}}));

app.use('/users', usersRouter);
app.use('/threads', threadRouter)

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:Function) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
