var express = require('express');
var jwt = require('jsonwebtoken');
var eschtml = require('htmlspecialchars');

var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  let token = req.headers.authorization;
  var movieId = eschtml(req.body.movie);
  var decoded = jwt.verify(token, 'ultrasecret');
  var sql = `INSERT INTO vues (user_id, movie_id) VALUES (?, ?)`;
  con.query(sql,[decoded.id, movieId], (err, result) => { if (err) throw(err);
    res.json({success: "Film vu"});
  });
});

module.exports = router;