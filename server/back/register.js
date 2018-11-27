var express = require('express');
var eschtml = require('htmlspecialchars');
var formidable = require('formidable');
var hash = require('password-hash');

var router = express.Router();
var con = require('../config/database');

router.post('/', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) { if err throw (err);

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
                    if (email.search(regMail) !== -1) {
                        var sql = "SELECT email FROM users WHERE email = ?";
                        con.query(sql, [email], function (err, result) {
                            if (result.length > 0)
                                res.json([{ error: "Désolé, cette adresse email est déja prise par un autre utilisateur" }])
                            else {
                                var sql = "SELECT login FROM users WHERE login = ?";
                                con.query(sql, [login], function (err, result) {
                                    if (result.length > 0)
                                        res.json([{ error: "Nom d'utilisateur déja pris" }])
                                    else {
                                        con.query('INSERT INTO users SET login = ?, name = ?, firstname = ?, email = ?, password = ?', [login, name, firstname, email, hash.generate(password)]);
                                        res.json([{ success: "Merci pour votre inscription, vous pouvez désormais vous connecter sur hypertube" }])
                                    }
                                })
                            }
                        })
                    }
                    else
                        res.json([{ error: "Veuillez entrer une adresse mail valide" }])
                }
                else
                    res.json([{ error: "Votre mot de passe doit contenir au moins une minuscule, une majuscule, un nombre, et contenir minimum 5 caractères" }])
            }
            else
                res.json([{ error: "Les mots de passes ne sont pas identiques" }])
        }
        else
            res.json([{ error: "Veuillez remplir les champs manquants" }])
    });
})

module.exports = router