var express = require('express');
var eschtml = require('htmlspecialchars');
var hash = require('password-hash');
var formidable = require('formidable');

var router = express.Router();
var con = require('../../config/database');

router.post("/", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        var login = eschtml(fields.login);
        var password = eschtml(fields.password);
        var sql = "SELECT * FROM users WHERE login = ?";
        con.query(sql, [login], function (err, result) {
            if (result.length > 0) {
                if (hash.verify(password, result[0].password) == true) {
                    //initialiser variable de session pour le login
                    req.log(login);
                    console.log("icicici");
                    console.log(req.session.log);
                    res.json([{ connected: req.session.log }])
                }
                else
                    res.json([{ error: "Mot de passe incorrect" }])
            }
            else
                res.json([{ error: "Cet utilisateur n'existe pas" }])
        })
    });
})


module.exports = router
