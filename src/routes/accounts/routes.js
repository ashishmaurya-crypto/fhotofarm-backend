const express = require("express");
const router = express.Router();

// import middleware
const {login} = require( "./../../controllers/accounts/login_controllers.js");




router.post("/login", login);

module.exports = router;