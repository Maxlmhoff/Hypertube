var express = require('express');
var eschtml = require('htmlspecialchars');
var formidable = require('formidable');
var hash = require('password-hash');
var file = require('file-system');
var fs = require('fs');
var jwt = require('jsonwebtoken');

const fetch = require('node-fetch');

var router = express.Router();
var con = require('../config/database');

router.post('/', (req, res) => {
  fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${req.body.token}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(user => user.json())
  .then(user => {
    var bigName = user.name.split(" ");
    var firstname = bigName[0];
    var name = bigName[1];
    var pseudo = firstname+name;
    var email = user.email;

    var ID = con.query("SELECT LAST_INSERT_ID() FROM users") + 1;

    const token = jwt.sign({ id: ID }, 'ultrasecret');
    
    var sql = "SELECT email FROM users WHERE email = ?";
    con.query(sql, [email], (err, result) => {
    if (result.length > 0){
      res.json([{ error: "Vous avez déjà un compte avec cette adresse mail !" }])
    } else {
    var sql = "SELECT login FROM users WHERE login = ?";
        con.query(sql, [pseudo], (err, result) => {
          if (result.length > 0)
            res.json([{ error: "Nom d'utilisateur déja pris, veuillez vous inscrire d'une autre facon" }])
          else {
            var jpg = ".jpg";
            var photo = pseudo + jpg;
            var oldpath = `https://graph.facebook.com/${user.id}/picture?height=200&width=200`
            var newpath = __dirname + '/../public/img/' + photo;
            fs.copyFile(oldpath, newpath, function (err) {
                console.log("file moved");
            });
            con.query('INSERT INTO users SET login = ?, name = ?, firstname = ?, email = ?, password = ?, img = ?', [pseudo, name, firstname, email, token, photo]);
            res.json(token);
          }
        });
      }
    })
  })
  .catch(() => res.json({error: "Veuillez envoyer un token valide"}));
});

module.exports = router;
