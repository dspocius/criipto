var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ------ Criipto routes and libs required for openID connection
var criiptoConfig = require('./config/config');
var criiptoLogin = require('./routes/CriiptoLogin');
var criiptoConnected = require('./routes/CriiptoConnected');
var session = require('express-session');
const { auth, requiresAuth, requiresCheckAuth } = require('express-openid-connect');
// -------------------------------------------------------------

var app = express();
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*  ---------------------------------------------------  */
var sessionData = {
	resave: true,
	saveUninitialized: true,
	secret: criiptoConfig.ClientSecret, 
	cookie: { maxAge: 90*24*60*60*1000 } //90 days
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionData.cookie.secure = true // serve secure cookies
}

app.use(session(sessionData));

//Every route after the auth() middleware gets authentication info or requires authentication if required is set to true
app.use(auth({
  authorizationParams: {
  	response_type: "code"
  },
  // The next to settings must match the Callback URLs in Criipto Verify - by default libraries path is "callback"
  redirectUriPath: "/callback",
  logoutPath: "/signout",
  routes: false,
  required: false,
  issuerBaseURL: criiptoConfig.Domain,
  baseURL: criiptoConfig.BaseUrl,
  clientID: criiptoConfig.clientID,
  clientSecret: criiptoConfig.ClientSecret // need for response_type: "code"
}));

app.use('/', indexRouter);
app.use('/criipto', criiptoLogin);
app.use('/connected', requiresAuth(), criiptoConnected); // requiresAuth() protects this view from unauthorized access

/*  ---------------------------------------------------  */

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
});


module.exports = app;
