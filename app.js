var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

//var routes = require('./routes/index');
var mongoose = require('mongoose');

//'mongodb://<dbuser>:<dbpassword>@ds053305.mlab.com:53305/novusbet'
//'mongodb://localhost/novusbet'
mongoose.connect('mongodb://novusbet:novusbet16@ds053305.mlab.com:53305/novusbet', function(err){
    if(err){
        console.log('connection error', err);
    }else{
        console.log('connection successful');
    }
});

require('./config/passport')(passport); // pass passport for configuration

//routes
var apostadores = require('./routes/apostadores');
var times = require('./routes/times');
var campeonatos = require('./routes/campeonatos');
var rodadas = require('./routes/rodadas');
var jogos = require('./routes/jogos');
var auth = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'novusbetsessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//app.use(function (req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
//  next();      
//});  

app.use('/apostadores', apostadores);
app.use('/campeonatos', campeonatos);
app.use('/times', times);
app.use('/rodadas', rodadas);
app.use('/jogos', jogos);

// routes ======================================================================
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});

module.exports = app;
