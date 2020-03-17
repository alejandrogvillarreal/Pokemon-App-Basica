const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

mongoose.connect("mongodb://localhost/pokemon")
.then(() => console.log('mongoDB connected to pokemon'))
.catch(err => console.log('db error: ', err));

const routes = require('./routes/index');

const app = express();

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

// middelwares que usamos
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next)=>{
  app.locals.user = req.user;
  next()
})

const server = app.listen(1337, ()=>{
  console.log('App running in port 1337')
});

// Set template engine
app.set('view engine', 'ejs');

// Set 'public' folder as public
app.use('/public/', express.static(path.join(__dirname, '/public')));

// ruta que vamos a usar
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.sendStatus(err.status || 500);
});

module.exports = app;
