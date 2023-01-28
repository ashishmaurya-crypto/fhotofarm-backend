const express = require('express');
const router = express.Router();
const passport = require('passport');

// get home page

router.get('/', (req, res, next)=> {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('index', {title : 'Express'});
})

router.get('/dashboard', autheticationMiddleware(), (req, res)=>{
    res.render('dashboard', {msg: "hello World."})
})

router.get('/logout', ()=> {
    req.logout();
    req.session.destroy();
    res.redirect('/')
})

function autheticationMiddleware(){
    return(req, res, next) => {
        console.log('req.session.passport.user:' + req.user);
        if(req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

module.exports = { router };