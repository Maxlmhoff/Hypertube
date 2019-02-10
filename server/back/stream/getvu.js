var express = require('express');
var jwt = require('jsonwebtoken');
var eschtml = require('htmlspecialchars');

var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  let token = req.body.token;
  var movieId = eschtml(req.body.movie.data.movie.id);
  var decoded = jwt.verify(token, 'ultrasecret');
  var sql = `SELECT * FROM vues WHERE user_id = ?`;
  con.query(sql, [decoded], (err, result) => {
    res.json({success: result});
  });
});

module.exports = router;