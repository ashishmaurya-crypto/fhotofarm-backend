const bcrypt = require('bcrypt-nodejs');
const Jwt = require('jsonwebtoken')
const validator = require('express-validator');
var mysql = require("mysql");
var conn = require("../../db.js");


const userToken = (id) => {
    var token = Jwt.sign(
        { id: id },
        'secret',
        { expiresIn: '10h' }
    );
    return token;
};

const login = async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password){
        return res.sendStatus(403);
    }

    var sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    
    console.log('begin', req.body.password);
    conn.query(sql, values, (err, result, fields) => {
        if (err){
            console.log('login error',err);
            res.status(401).json({
                error: "login failed"
            })
        }
        if(result.length === 0){
            res.status(401).json({ error: "Invalid email or password"})
        }else if (result.length && password == result[0].password) {
            var token = userToken(result[0].user_id);
            res.status(200).json({ token: token })
        } else {
            res.status(401).json({
                error: "login failed"
            })
        }
    })


    // var hashedPassword = bcrypt.compareSync(password, result[0].password)
 


}

module.exports = { login }