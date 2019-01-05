var express = require('express');
var eschtml = require('htmlspecialchars');
var formidable = require('formidable');
var hash = require('password-hash');
var file = require('file-system');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const request = require('request');

const fetch = require('node-fetch');

var router = express.Router();
var con = require('../../config/database');

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
    var sql = "SELECT * FROM users WHERE email = ?";
    con.query(sql, [email], (err, result) => {
    if (result.length > 0){
      const token = jwt.sign({ id: result[0].id }, 'ultrasecret');
      res.json({Success: "Vous vennez de vous inscrire avec facebook !",
      token});
    } else {
    var sql = "SELECT login FROM users WHERE login = ?";
        con.query(sql, [pseudo], (err, result) => {
          if (result.length > 0) {
            res.json([{ error: "Nom d'utilisateur déja pris, veuillez vous inscrire d'une autre facon" }])
          } else {
            var jpg = ".jpg";
            var photo = pseudo + jpg;
            // var file = fs.createWriteStream(`../public/img/${photo}`);
            const download = (url, dest, cb = () => {}) => {
              const file = fs.createWriteStream(dest);
              const sendReq = request.get(url);
          
              // verify response code
              sendReq.on('response', (response) => {
                  if (response.statusCode !== 200) {
                      return cb('Response status was ' + response.statusCode);
                  }
          
                  sendReq.pipe(file);
              });
          
              // close() is async, call cb after close completes
              file.on('finish', () => file.close(cb));
          
              // check for request errors
              sendReq.on('error', (err) => {
                  fs.unlink(dest);
                  return cb(err.message);
              });
          
              file.on('error', (err) => { // Handle errors
                  fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
                  return cb(err.message);
              });
          };
            var url = `https://graph.facebook.com/${user.id}/picture?height=200&width=200`;
            var dest = `/Users/maxime/Programmation/42/hypertube/server/public/img/${photo}`;
            download(url, dest);
            // http.get(`https://graph.facebook.com/${user.id}/picture?height=200&width=200`, function(response) {response.pipe(file);});
            con.query('INSERT INTO users SET login = ?, name = ?, firstname = ?, email = ?, img = ?', [pseudo, name, firstname, email, photo]);
            con.query('SELECT ID FROM users WHERE email = ?', [email], (err, result) => {
              var ID = result[0].ID;
              const token = jwt.sign({ id: ID }, 'ultrasecret');
              res.json({Success: "Vous vennez de vous inscrire avec facebook !",
                      token});
            });
            
          }
        });
      }
    })
  })
  .catch(() => res.json({error: "Veuillez envoyer un token valide"}));
});

module.exports = router;
