var path = require('path');
var express = require('express');
var logger = require('morgan');
var slashes = require('connect-slashes');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var session = require('express-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var multer = require('multer');
var flash = require('connect-flash');
var csrf = require('csurf');
var passport = require('passport');
var mongoStore = require('connect-mongo')(session);

require('node-jsx').install({extension: '.jsx'});

var stylusMiddleware = require('../config/middleware/stylus.js');
var render = require('./helpers/render.js');


module.exports = function() {

  require('../config/passport.js')(passport);

  var app = express();

  // Middleware
  app.use(stylusMiddleware());
  app.use(slashes(false));
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, '../public')));

  app.engine('jsx', render);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jsx');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer());

  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'bodhi',
    store: new mongoStore({
      url: 'mongodb://localhost/timezone',
      collection : 'sessions'
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Always after sessions
  app.use(flash());

  app.use(csrf());
  app.use(function(req, res, next) {
    res.locals.csrf_token = req.csrfToken();
    next();
  });

  require('../config/routes.js')(app, passport);  

  app.listen(8080);

};

