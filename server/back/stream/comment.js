var express = require('express');
var eschtml = require('htmlspecialchars');
var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
  console.log("hola");
    console.log(req.body);
    console.log(req.body.comment);
    console.log(req.body.movieId);
    console.log(req.body.token);
    console.log("hola");
  if (req.body.comment && req.body.token){
    var userId = eschtml(req.body.userId);
    var comment = eschtml(req.body.comment);
    var movieId = eschtml(req.body.movieId);
    con.query('INSERT INTO comment SET userId = ?, movieId = ?, comment = ?', [userId, movieId, comment]);
    res.json({success: "Merci d'avoir laissé un commentaire"})
  }
  else
    res.json({fail: "Veuillez laisser un commentaire"})
})

module.exports = router;
