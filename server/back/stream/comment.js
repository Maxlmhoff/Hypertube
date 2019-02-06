var express = require('express');
var eschtml = require('htmlspecialchars');
var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
    console.log(req.headers.authorization);
    console.log("hola");
    console.log(req.body.movie.data.movie.id);
    // console.log(req.body.id);
    // console.log(req.body.movieId);
    // console.log(req.body.login);
  if (req.body.comment && req.headers.authorization){
    var userId = eschtml(req.body.user.id);
    var comment = eschtml(req.body.comment);
    var movieId = eschtml(req.body.movie.data.movie.id);
    var pseudo = eschtml(req.body.user.login);
    con.query('INSERT INTO comment SET userId = ?, login = ?, movieId = ?, comment = ?', [userId, pseudo, movieId, comment]);
    res.json({success: "Merci d'avoir laissé un commentaire"})
  }
  else
    res.json({fail: "Veuillez laisser un commentaire"})
})

module.exports = router;
