const express = require('express');
const con = require('./config/database');
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
const app = express();
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);


const PORT = 3001


//Routes var 

var register = require('./back/connection/register');
var signin = require('./back/connection/signin');
var resetPass = require('./back/connection/resetPass');
var loginFb = require('./back/connection/loginFb');
var login42 = require('./back/connection/login42');
var getUser = require('./back/profile/getuser');
var getAllUsers = require('./back/profile/getallusers');
var modify = require('./back/profile/modify');
var stream = require('./back/stream/stream');
var comment = require('./back/stream/comment');
var getComment = require('./back/stream/getcomment');
var putVu = require('./back/stream/putvu');
var getVu = require('./back/stream/getvu');
var apiFetch = require('./back/stream/apifetch');
var subtitles = require('./back/stream/subtitles');
var deleteOldMovies = require('./back/stream/deleteOldMovies');


//Midllewares
app.use('/public', express.static(__dirname + '/public'));
app.use(session({
	secret: 'karlsecret',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));
// cors permet d'accepter toutes les entetes HTTP 
app.use(cors())
// app.use(require('./Middlewares/user'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('build/index.html'));
app.use('/', express.static('build'));

app.use('/register', register);
app.use('/signin', signin);
app.use('/resetPass', resetPass);
app.use('/loginFb', loginFb);
app.use('/login42', login42);
app.use('/getuser', getUser);
app.use('/getallusers', getAllUsers);
app.use('/modify', modify);
app.use('/getstream', stream);
app.use('/comment', comment);
app.use('/getcomment', getComment);
app.use('/putvu', putVu);
app.use('/getvu', getVu);
app.use('/apifetch', apiFetch);
app.use('/subtitles', subtitles);
app.use('/img', express.static('public/img'));

app.use('*', express.static('build/index.html'));

httpsServer.listen(PORT);
// app.listen(PORT, () => {
// 		console.log("Server listening on port 3001");
// })
