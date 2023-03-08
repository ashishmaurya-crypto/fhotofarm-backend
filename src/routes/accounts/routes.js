const express = require("express");
const router = express.Router();

// import middleware
const {login} = require( "./../../controllers/accounts/login_controllers.js");
const {signup} = require("./../../controllers/accounts/signup_controllers.js")




router.post("/login", login);
router.post("/signup", signup);
module.exports = router;