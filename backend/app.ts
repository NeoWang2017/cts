import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import ResponseMiddleWare from "./middleware/ResponseMiddleWare";
import indexRouter  from "./routes/index"
import usersRouter  from "./routes/users"
import authRouter  from "./routes/auth"

const app = express();

const corsOptions = {
  origin: '*', // 只允许来自 http://example.com 的请求
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的 HTTP 头
  credentials: true // 允许携带凭证（如 cookies）
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用统一响应中间件
app.use(ResponseMiddleWare);
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
} as express.ErrorRequestHandler);

export default app;
