const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');



// var con = mysql.createConnection({
//     host: 'ap-south.connect.psdb.cloud',
//     port: 3306,
//     database: 'fhotofarm',
//     user: 'hl3m4f7e7gxe2y7zid4w',
//     password: 'pscale_pw_aLpcbmUIkAPPRGFUEojbqZPYuOyrLAsE2iPp2CiLbzR'
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


console.log('server start');