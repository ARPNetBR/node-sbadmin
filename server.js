const express       = require('express');
const path          = require('path');
const hbs           = require('express-handlebars');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const Database      = require('./db/database');
const config        = require('./config.json');
const passport      = require('passport');
const expressSession= require('express-session');
const flash         = require('connect-flash');
const app           = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(expressSession({secret: 'secret_Key'}));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

process.env.NODE_ENV = config.environment;

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname + '/views/layouts'),
    partialsDir: path.join(__dirname +'/views/fragments')
}));
app.set('view engine', 'hbs');



require('./passport/pass')(passport);
require('./routes/router')(app, passport);


Database.config(
    config && config.database.mongodb && config.database.mongodb.address ? config.database.mongodb.address : '', config.database.name,    
    config.database.mongodb && config.database.mongodb.options ? config.database.mongodb.options : undefined,
    function(err, message) {
      if (!err) console.info('  - Mongodb is connected');      
    }
);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  
  module.exports = app;