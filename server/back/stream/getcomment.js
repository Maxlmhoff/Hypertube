var express = require('express');
var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  if (req.body.movie) {
    let movieId;
    if (req.body.api === 'yts') {
       movieId = req.body.movie.id;
    }
    else {
       movieId = req.body.movie.id;
    }
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