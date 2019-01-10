var express = require('express');
var eschtml = require('htmlspecialchars');
var formidable = require('formidable');
var hash = require('password-hash');
var file = require('file-system');
var fs = require('fs');
var jwt = require('jsonwebtoken');

var router = express.Router();
var con = require('../../config/database');

router.post('/', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      var login = eschtml(fields.login);
      var name = eschtml(fields.name);
      var firstname = eschtml(fields.firstname);
      var email = eschtml(fields.email).toLowerCase();
      var password = eschtml(fields.password);
      var passwordConfirm = eschtml(fields.passwordConfirm);
      var regUp = /[A-Z]+/;
      var regLow = /[a-z]+/;
      var regNumber = /[0-9]+/;
      var regMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
      // console.log(fields.pseudo);
      console.log(login);

      let token = req.headers.authorization;
      var decoded = jwt.verify(token, 'ultrasecret');
      var sql = 'SELECT * FROM users WHERE id = ?';
      con.query(sql, [decoded.id], (err, result) => {        
    // login
        if (login.length > 30){
    res.send('Invalid login', 403);
  }
    else if (login === result[0].login) {
    res.send('Login is already taken', 403);
  }
    // mail
        else if (email.length > 50){
          res.send('Invalid mail', 403);
        }
        else if (email === result[0].email) {
          res.send('Mail is already taken', 403);
        }
        // name
        else if (name.length > 30){
          res.send('Invalid name', 403);
        }
        else if (name === result[0].name) {
          res.send('Name is already taken', 403);
        }

        // firstname
        else if (firstname.length > 30){
          res.send('Invalid firstname', 403);
        }
        else if (firstname === result[0].firstname) {
          res.send('Firstname is already taken', 403);
        }

        // password
        else if (password.search(regUp) !== -1 &&
            password.search(regLow) !== -1 &&
            password.search(regNumber) !== -1 &&
            password.length > 5) {
          res.send('Password not good enough', 403);
        }
        else if (password !== passwordConfirm) {
          res.send('Password do not match', 403);
        } else if (files.photo && !(files.photo.type === 'image/png' || files.photo.type === 'image/jpg' || files.photo.type === 'image/jpeg')) {
          res.send('Invalid file', 403);
        } else {
        if (login.length === 0 || !login)
          login = result[0].login;
        if (name.length === 0 ||  !name)
          name = result[0].name;
        if (firstname.length === 0 || !firstname)
          firstname = result[0].firstname;
        if (email.length === 0 || !email)
          email = result[0].email;
        if (!files.photo)
          result1 = result[0].img;
        if (password.length === 0 || !password)
          password = result[0].password;
        else
          password = hash.generate(password);
        if (files.photo && files.photo.type === 'image/png') {
            var png = ".png";
            var result1 = login + png;
            var oldpath = files.photo.path;
            var newpath = __dirname + '/../../public/img/' + result1;
            fs.copyFile(oldpath, newpath, function (err) {
                console.log("file moved (/server/register)");
            });
        }
        else if (files.photo && files.photo.type === 'image/jpg') {
            var jpg = ".jpg";
            var result1 = login + jpg;
            var oldpath = files.photo.path;
            var newpath = __dirname + '/../../public/img/' + result1;
            fs.copyFile(oldpath, newpath, function (err) {
                console.log("file moved (/server/register)");
            });
        }
        else if (files.photo && files.photo.type === 'image/jpeg') {
            var jpg = ".jpeg";
            var result1 = login + jpg;
            var oldpath = files.photo.path;
            var newpath = __dirname + '/../../public/img/' + result1;
            fs.copyFile(oldpath, newpath, function (err) {
                console.log("file moved (/server/register)");
            });
        }
        con.query('UPDATE users SET login = ?, name = ?, firstname = ?, password = ?, email = ?, img = ? WHERE id = ? ', [login, name, firstname, password, email, result1, decoded.id]);
        res.send("lol");
        }
      });
      console.log(login);
      //res.send("fields");
    });
  });



module.exports = router;
