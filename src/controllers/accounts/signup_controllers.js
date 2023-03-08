const Jwt = require('jsonwebtoken')
const validator = require('express-validator');
var mysql = require("mysql");
var conn = require("../../db.js");
var bcrypt = require("bcrypt");




const signup = async (req, res, next) => {

    var email = req.body.email;
    var phone_number = Number(req.body.phone_number);
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var birth_date = req.body.birth_date;
    var gender = req.body.gender;


    if(req.body.gender == 'male' || 'M'){
        gender = 'M'
    }else if (req.body.gender == 'female' || 'F'){
        gender = 'F'
    }else if (req.body.gender == 'other'){
        gender = 'other'
    }else{
        return res.status(401).json({ error: 'gender should be M and F and other' });
    }

    if(!email || !phone_number || !password || !confirm_password || !first_name || !last_name || !birth_date || !gender){
        return res.sendStatus(403);
    }

    if(password != confirm_password){
        return res.status(401).json({ error: 'password and confirm password not same' });
    }
    

    console.log('begin', req.body);
    console.log('header', req.headers);

    const salt = bcrypt.genSaltSync();
    const hashUserID = bcrypt.hashSync(email, salt);


    const sql = "INSERT INTO users (user_id, email, phone_number, password, confirm_password, first_name, last_name, birth_date, gender) VALUES (?,?,?,?,?,?,?,?,?)";
    const values = [hashUserID, email, phone_number, password, confirm_password, first_name, last_name, birth_date, gender];

    conn.query(sql, values, function (error, results, fields) {
        if (error){
            console.error(`MySQL error: ${error.sqlMessage}`);
            if(error.sqlMessage.includes('users.phone_number')){
                return res.status(401).json({ error: 'number already existed' });
            }else{
                return res.status(401).json({ error: 'user already existed' });
            }
        }else{
            res.status(200).json({ message: 'User created successfully' })
        }
    });


}

module.exports = { signup }