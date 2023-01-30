const mysql = require('mysql')
require('dotenv').config();

var conn = mysql.createConnection({
    host: 'ap-south.connect.psdb.cloud',
    port: 3306,
    database: 'fhotofarm',
    user: 'hl3m4f7e7gxe2y7zid4w',
    password: 'pscale_pw_aLpcbmUIkAPPRGFUEojbqZPYuOyrLAsE2iPp2CiLbzR',
    ssl: {"rejectUnauthorized":true}
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected...")
})



module.exports = conn;