var express = require('express');
var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  let movieId = req.body.movie.id;
  var sql = 'SELECT * FROM comment WHERE movieId = ?';
  con.query(sql, [movieId], (err, result) => {
    res.json({comment: result});
  });
});

module.exports = router;