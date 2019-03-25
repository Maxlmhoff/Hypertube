var express = require('express');
var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  if (req.body.movie) {
    const movieId = req.body.movie.id;
    var sql = 'SELECT * FROM comment WHERE movieId = ?';
    con.query(sql, [movieId], (err, result) => {
      res.json({comment: result});
    });
  }
  else {
    res.json({error: 'movie not defined'});    
  }
});

module.exports = router;