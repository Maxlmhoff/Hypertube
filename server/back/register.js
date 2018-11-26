var express = require('express');
// var eschtml = require('htmlspecialchars');

var router = express.Router();
var con = require('../config/database');

router.post('/', (req, res) => {
    console.log("les informations ont été envoyées");
    console.log("super");
    res.send("informations envoyees");
})

module.exports = router