var express = require('express');

var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  var sql = 'SELECT login, name, firstname, img FROM users';
  con.query(sql, (err, result) => {
    console.log(result);
    res.json({user: Object.values(result)});
  });
});

module.exports = router;