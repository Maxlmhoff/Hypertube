var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
var con = require('../config/database');

router.post('/', (req, res) => {
  let token = req.body.token;
  var decoded = jwt.verify(token, 'ultrasecret');
  console.log(decoded);
  var sql = 'SELECT * FROM users WHERE id = ?';
  con.query(sql, [decoded.id], (err, result) => {
    console.log(result);
    res.json({user: result[0]});
  });

  res.end();
});

module.exports = router;