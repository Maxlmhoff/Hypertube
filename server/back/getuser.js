var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
var con = require('../config/database');

router.post('/', (req, res) => {
  let token = req.body.token;
  console.log(token);
  var decoded = jwt.verify(token, 'ultrasecret');
  console.log(decoded);
  console.log("hello");
  console.log(decoded.id);

  res.end();
});

module.exports = router;