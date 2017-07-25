var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var firebase = require('firebase');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);




//////// ERROR HANDLING ///////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var config = {
    apiKey: "AIzaSyBzeP4SnDLXLHgHRX5_VlpC5SJgxPYJN8c",
    authDomain: "beerblog-f3ab0.firebaseapp.com",
    databaseURL: "https://beerblog-f3ab0.firebaseio.com",
    projectId: "beerblog-f3ab0",
    storageBucket: "beerblog-f3ab0.appspot.com"
  };
firebase.initializeApp(config);


var database = firebase.database();


// var admin = require('firebase-admin');

// // var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://beerblog-f3ab0.firebaseio.com"
// });



module.exports = app, firebase;


