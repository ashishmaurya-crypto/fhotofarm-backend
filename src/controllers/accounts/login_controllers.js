const bcrypt = require('bcrypt-nodejs');
const Jwt = require('jsonwebtoken')
const validator = require('express-validator');
var mysql = require("mysql");
var conn = require("../../db.js");


const userToken = (id) => {
    var token = Jwt.sign(
        { id: id },
        'gfg_jwt_secret_key',
        { expiresIn: "10h" }
    );
    return token;
};

const login = async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    var sql = `SELECT * FROM user WHERE email = "${email}"`;
    console.log('begin', req.body.password);
     conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log('start', result);
        if (result.length && password == result[0].password) {
            var token = userToken(result[0].id);
            res.json({
                data: token,
            });
        } else {
            res.json({
                message: "api failed"
            })
        }
    })


    // var hashedPassword = bcrypt.compareSync(password, result[0].password)
 


}

module.exports = { login }