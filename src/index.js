const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const mysql = require('mysql');
const createError = require('http-error');
// auth packages
const expressValidator = require('express-validator');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');


// router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');



dotenv.config();
// middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// to parse json data
app.use(express.json());
// for parsing Cookies
app.use(cookieParser());

//express validators 
// app.use(expressValidator());

// setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// PORT
app.set("port", process.env.PORT || 5000);


var options = {

    host: 'ap-south.connect.psdb.cloud',
    port: 3306,
    database: 'fhotofarm',
    user: 'hl3m4f7e7gxe2y7zid4w',
    password: 'pscale_pw_aLpcbmUIkAPPRGFUEojbqZPYuOyrLAsE2iPp2CiLbzR'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'jhjjdddjjdhbeubvbrufbvjfjswirfiuh',
    resave: false,
    saveUninitialized: true,
    store:sessionStore
    //cookie: { secure: true }
  }));


app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.isAuthenticated  = req.isAuthenticated();
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);

passport.use(new LocalStrategy(
    function(username, password, done) {
  
        const db = require('./db');
  
        db.query('SELECT id,password FROM user WHERE usn=?',[username],
          function(err,results,fields){
            if(err){
              done(err);
            };
  
            if(results.length === 0){
  
              done(null,false);
  
            }else {
              const hash = results[0].password.toString();
  
               bcrypt.compare(password,hash,(err,res)=>{
  
                  if(res == true){
                      return done(null,{user_id:results[0].id});
                  }else {
                    return done(null,false);
                  }
  
              });
            }
            
        });   
    }));

    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });

// app.get('/home', (req, res)=> {
//     res.render('error', {
//         title: 'Error page',
//         page: true
//     })
//     console.log('home page')

// })

// app.get('/', function (req, res){
//     console.log(req.session)
//     if(req.session.page_view){
//         req.session.page_view++;
//         res.send("You visited this page" + req.session.page_views + "times");
//         console.log(req.session)
//     }else{
//         req.session.page_views = 1;
//         res.send("welcome to this page")
//     }
// })

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


console.log('server start');


app.listen(5000);


// module.exports = app;

