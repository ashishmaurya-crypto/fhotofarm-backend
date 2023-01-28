var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'ap-south.connect.psdb.cloud',
    port: 3306,
    database: 'fhotofarm',
    user: 'hl3m4f7e7gxe2y7zid4w',
    password: 'pscale_pw_aLpcbmUIkAPPRGFUEojbqZPYuOyrLAsE2iPp2CiLbzR'
});

db.connect(function(err){
    if(err) throw err;
    console.log("Database Connected.");
});

module.exports = db;