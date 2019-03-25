var express = require('express');
var eschtml = require('htmlspecialchars');
var hash = require('password-hash');
var nodemailer = require('nodemailer');
var md5 = require('md5');
var microtime = require('microtime');
var formidable = require('formidable');

var router = express.Router();
var con = require('../../config/database');

router.post("/", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        var email = eschtml(fields.email);
        var sql = "SELECT * FROM users WHERE email = ?";
        con.query(sql, [email], function (err, result) {
            if (result.length > 0) {
                var transporter = nodemailer.createTransport('smtps://matchazerty%40gmail.com:matchAZERTY@smtp.gmail.com');
                var key = md5(microtime.now());
                var mail =
                {
                    from: "matcha@gmail.com", to: email, subject: "Reinitialisation du mot de passe",
                    html: '<html><body><div align=center> \
					Voici votre nouveau mot de passe:  <BR />\
					<p>'+ key + '</p> \
					<p><a href=https://localhost:3000/signin>Hypertube</a></p> \
					</div></body></html>'
                }
                transporter.sendMail(mail, function (error) { if (error) { throw error } });

                con.query('UPDATE users SET password = ? WHERE email = ? ', [hash.generate(key), email]);
                res.json([{ success: "Consultez votre boite mail afin d'avoir votre mot de passe" }])
            }
            else {
                res.json([{ error: "Adresse mail introuvable" }])
            }
        })
    });
});


module.exports = router