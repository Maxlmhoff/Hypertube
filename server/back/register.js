var express = require('express');
var eschtml = require('htmlspecialchars');
var formidable = require('formidable');
var hash = require('password-hash');
var file = require('file-system');
var fs = require('fs');
var jwt = require('jsonwebtoken');

var router = express.Router();
var con = require('../config/database');

router.post('/', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (fields.prenom && fields.nom && fields.email && fields.login && fields.password && fields.passwordConfirm) {
            var login = eschtml(fields.login);
            var name = eschtml(fields.nom);
            var firstname = eschtml(fields.prenom);
            var email = eschtml(fields.email);
            var password = eschtml(fields.password);
            var regUp = /[A-Z]+/;
            var regLow = /[a-z]+/;
            var regNumber = /[0-9]+/;
            var regMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
            if (fields.password == fields.passwordConfirm) {
                if (password.search(regUp) !== -1 && password.search(regLow) !== -1 && password.search(regNumber) !== -1 && password.length > 5) {
                  if (files.photo && (files.photo.type === 'image/png' || files.photo.type === 'image/jpg' || files.photo.type === 'image/jpeg')) {
                     if (files.photo.size < (50 * 1024 * 1024)) {
                       if (email.search(regMail) !== -1) {
                                var sql = "SELECT email FROM users WHERE email = ?";
                                con.query(sql, [email], (err, result) => {
                                    if (result.length > 0)
                                        res.json({ error: "Désolé, cette adresse email est déja prise par un autre utilisateur" })
                                    else {
                                        var sql = "SELECT login FROM users WHERE login = ?";
                                        con.query(sql, [login], (err, result) => {
                                            if (result.length > 0)
                                                res.json({ error: "Nom d'utilisateur déja pris" })
                                            else {
                                                if (files.photo.type === 'image/png') {
                                                    var png = ".png";
                                                    var result = login + png;
                                                    var oldpath = files.photo.path;
                                                    var newpath = __dirname + '/../public/img/' + result;
                                                    fs.copyFile(oldpath, newpath, function (err) {
                                                        console.log("file moved");
                                                    });
                                                }
                                                else if (files.photo.type === 'image/jpg') {
                                                    var jpg = ".jpg";
                                                    var result = login + jpg;
                                                    var oldpath = files.photo.path;
                                                    var newpath = __dirname + '/../public/img/' + result;
                                                    fs.copyFile(oldpath, newpath, function (err) {
                                                        console.log("file moved");
                                                    });
                                                }
                                                else if (files.photo.type === 'image/jpeg') {
                                                    var jpg = ".jpeg";
                                                    var result = login + jpg;
                                                    var oldpath = files.photo.path;
                                                    var newpath = __dirname + '/../public/img/' + result;
                                                    fs.copyFile(oldpath, newpath, function (err) {
                                                        console.log("file moved");
                                                    });
                                                }
                                                con.query('INSERT INTO users SET login = ?, name = ?, firstname = ?, email = ?, password = ?, img = ?', [login, name, firstname, email, hash.generate(password), result]);
                                                var ID = con.query("SELECT LAST_INSERT_ID() FROM users");
                                                const token = jwt.sign({ id: ID }, 'ultrasecret');
                                                res.json({ success: "Merci pour votre inscription, vous pouvez désormais vous connecter sur hypertube" ,
                                                           token})
                                            }
                                        })
                                    }
                                })
                            }
                            else
                                res.json({ error: "Veuillez entrer une adresse mail valide" })
                        }
                        else
                            res.json({ error: "Le fichier uploader est trop gros, la taille maximale du fichier est de 5MB" })
                    }
                    else
                        res.json({ error: "Veuillez choisir un fichier jpg, jpeg ou png" })
                }
                else
                    res.json({ error: "Votre mot de passe doit contenir au moins une minuscule, une majuscule, un nombre, et contenir minimum 5 caractères" })
            }
            else
                res.json({ error: "Les mots de passes ne sont pas identiques" })
        }
        else
            res.json({ error: "Veuillez remplir les champs manquants" });
    });
})

module.exports = router