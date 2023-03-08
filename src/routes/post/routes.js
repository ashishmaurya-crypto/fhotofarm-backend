const express = require("express");
const router = express.Router();


// import middleware
const {authenticateToken} = require('./../../controllers/auth.js')
const {createPost} = require('./../../controllers/post/post.js')
const {getPost} = require('./../../controllers/post/post.js')


router.post("/get", getPost);
router.post("/create", authenticateToken, createPost);

module.exports = router;