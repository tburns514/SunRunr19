let express = require('express');
let router = express.Router();
let User = require("../models/users");
let Device = require("../models/device");
let fs = require('fs');
let bcrypt = require("bcryptjs");
let jwt = require("jwt-simple");

/* Authenticate user */
var secret = fs.readFileSync(__dirname + '/../../jwtkey').toString();

router.post('/signin', function(req, res, next) {
   res.status(401).json({success : false, error : "Not implemented yet."});         
});

/* Register a new user */
router.post('/register', function(req, res, next) {
   res.status(401).json({success : false, error : "Not implemented yet."});         
});

router.get("/account" , function(req, res) {
   res.status(401).json({success : false, error : "Not implemented yet."});         
});

module.exports = router;
