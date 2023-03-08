const Jwt = require('jsonwebtoken')
const validator = require('express-validator');
var mysql = require("mysql");
var conn = require("../../db.js");
var bcrypt = require("bcrypt");



const createPost =  async (req, res, next) => {

    var body = req.body;

    console.log('create_post', body)
    console.log('header2--', req.headers.authorization);
    console.log('auth-user', req.user.id);
    res.status(200).json({ message: 'api run' });

}


const getPost =  async (req, res, next) => {

    var body = req.body;

    console.log('get_post', body)
    res.status(200).json({ message: 'api run' });

}

module.exports = { createPost, getPost }