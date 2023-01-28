const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

router.get('/', (req, res, next) => {
    res.render('register', {});
});

router.get('/createdbtable', (req, res) => {
    let sql = 'create table user(id int primary key auto_increment,name varchar(20), email varchar(100), password varchar(60))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("table Created...")
    })
});

router.post('/create', (req, res, next) => {
    req.checkBody('usn', 'Enter Valid USN').len(10);
    req.checkBody('usn');
    req.checkBody('re-password', 'Password Do not match.').equals(req.body.password);

    var error = req.validationErrors();

    if (error) {
        console.log(JSON.stringify(error));
        res.render('register', { 'msg': "ERROR ! please fixed it" })
    } else {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const usn = req.body.usn;
        const email = req.body.email;
        const pass = req.body.password;

        var db = require('../db.js'); // open db conection

        bcrypt.hash(pass, null, null, (err, hash) => {
            db.query('insert into user(fname,lname,usn,email,password) values(?,?,?,?,?)', [fname, lname, usn, email, hash], (err, results)=> {
                if (err) throw err;
                db.query('select last_insert_id() as user_id', function (err, results) {
                    if (err) throw err;
                    console.log(results[0]);

                    //login the user 
                    const user_id = results[0];
                    req.login(user_id, function (err) {
                        res.redirect('/');
                    });

                    res.render('register', { 'msg': "New Account Created.", 'success': 1 });
                });
            })
        })


    }

});

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

module.exports = { router };