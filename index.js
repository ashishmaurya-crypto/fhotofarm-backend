const express = require('express');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
var logger = require('morgan');
const path = require('path')
require('dotenv').config();
const app = express();

// routes import 
const accountRoutes = require("./src/routes/accounts/routes.js");


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(validator());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// to parse form data
var upload = multer();
app.use(upload.any());

// urls for routes
app.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});
app.use("/", accountRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


// creating server
const port = process.env.PORT || 5000;
console.log('server start @', port)
app.listen(port);
