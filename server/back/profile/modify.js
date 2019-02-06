var express = require('express');
var eschtml = require('htmlspecialchars');
var formidable = require('formidable');
var hash = require('password-hash');
var file = require('file-system');
var fs = require('fs');
var jwt = require('jsonwebtoken');

var router = express.Router();
var con = require('../../config/database');

router.post('/', async (req, res) => {
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
    let token = req.headers.authorization;
    var decoded = jwt.verify(token, 'ultrasecret');
    var sql = 'SELECT * FROM users WHERE id = ?';
    con.query(sql, [decoded.id], async (err, result) => {
  // login

  if (login.length === 0 &&
    name.length === 0 &&
    firstname.length === 0 &&
    email.length === 0 &&
    password.length === 0 &&
    !files.photo)
    res.json({error : 'Please enter something !'});

  else if (login.length > 30){
  res.json({error : 'Invalid login'});
  }
      if (login.length > 0 ){
        var sqlogin = "SELECT login FROM users WHERE login = ?";
        var resultLogin = await new Promise(function(resolve, reject) {
          con.query(sqlogin, [login], (err, resultLogin) => {
            resolve(resultLogin)
          });
        });
        if (resultLogin.length !== 0) {
          res.json({error : 'Login is already taken'});
          return ;
        }
      }
        // mail
      if (email.length > 0){
        var sqlmail = "SELECT email FROM users WHERE email = ?";
        var resultEmail = await new Promise(function(resolve, reject) {
          con.query(sqlmail, [email], (err, resultEmail) => {
            resolve(resultEmail)
        });
      });
        if (resultEmail.length > 0){
          res.json({error : 'Mail is already taken'});
          return ;
        }
        if (email.length > 50 || email.search(regMail) === -1){
          res.json({error : 'Invalid mail'});
          return ;
        }
      }
      
      // name
      else if (name.length > 30){
        res.json({error : 'Invalid name'});
      }
      else if (name === result[0].name) {
        res.json({error : 'Name is already taken'});
      }

      // firstname
      else if (firstname.length > 30){
        res.json({error : 'Invalid firstname'});
      }
      else if (firstname === result[0].firstname) {
        res.json({error : 'Firstname is already taken'});
      }

      // password
      else if (password.search(regUp) !== -1 &&
          password.search(regLow) !== -1 &&
          password.search(regNumber) !== -1 &&
          password.length > 5) {
        res.json({error : 'Password not good enough'});
      }
      else if (password !== passwordConfirm) {
        res.json({error : 'Password do not match'});
      } else if (files.photo && !(files.photo.type === 'image/png' || files.photo.type === 'image/jpg' || files.photo.type === 'image/jpeg')) {
        res.json({error : 'Invalid file'});
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
        var result1 = result[0].img;
      if (password.length === 0 || !password)
        password = result[0].password;
      else
        password = hash.generate(password);
      if (files.photo && files.photo.type === 'image/png') {
          let png = ".png";
          let result1 = login + png;
          let oldpath = files.photo.path;
          var newpath = __dirname + '/../../public/img/' + result1;
          fs.copyFile(oldpath, newpath, function (err) {
              console.log("file moved (/server/register)");
          });
      var path =  'http://localhost:3001/img/' + result1;
    }
      else if (files.photo && files.photo.type === 'image/jpg') {
          let jpg = ".jpg";
          let result1 = login + jpg;
          let oldpath = files.photo.path;
          var newpath = __dirname + '/../../public/img/' + result1;
          fs.copyFile(oldpath, newpath, function (err) {
              console.log("file moved (/server/register)");
          });
      var path =  'http://localhost:3001/img/' + result1;
    }
      else if (files.photo && files.photo.type === 'image/jpeg') {
          let jpg = ".jpeg";
          let result1 = login + jpg;
          let oldpath = files.photo.path;
          var newpath = __dirname + '/../../public/img/' + result1;
          fs.copyFile(oldpath, newpath, function (err) {
              console.log("file moved (/server/register)");
          });
      var path =  'http://localhost:3001/img/' + result1;
    }
      con.query('UPDATE users SET login = ?, name = ?, firstname = ?, password = ?, email = ?, img = ? WHERE id = ? ', [login, name, firstname, password, email, path, decoded.id]);
      res.json({success: "Vos modifications on bien été prises en compte"});
      }
    });
    // console.log(login);
    //res.send("fields");
  });
});



module.exports = router;
