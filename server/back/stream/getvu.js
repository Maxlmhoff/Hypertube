var express = require('express');
var jwt = require('jsonwebtoken');
var eschtml = require('htmlspecialchars');

var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  console.log("AAAAAAAAAAAAAA")
  let token = req.headers.authorization;
  var decoded = jwt.verify(token, 'ultrasecret');
  var sql = `SELECT * FROM vues WHERE user_id = ?`;
  con.query(sql, [decoded.id], (err, result) => {
    console.log(result[0]);
    res.json({success: result[0]});
  });
});

module.exports = router;