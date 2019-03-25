var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  let token = req.body.token;
  if (token){
    try {
      var decoded = jwt.verify(token, 'ultrasecret');
    } catch (e) {
      res.end();
      return;
    }
    var sql = 'SELECT * FROM users WHERE id = ?';
    con.query(sql, [decoded.id], (err, result) => {
      res.json({user: result[0]});
  });
  } else {
    res.json({ erreur: "Fais pas précédent stp" });
  }
});

module.exports = router;