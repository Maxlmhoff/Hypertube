const express = require('express');
const con = require('./config/database');
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser')

const app = express();
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


//Midllewares
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'karlsecret',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));
// cors permet d'accepter toutes les entetes HTTP 
app.use(cors())
app.use(require('./Middlewares/user'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	console.log("celui qui est connecté est: ");
	console.log(req.session.log);
})


app.use('/register', register);
app.use('/signin', signin);
app.use('/resetPass', resetPass);
app.use('/loginFb', loginFb);
app.use('/login42', login42);
app.use('/getuser', getUser);
app.use('/getallusers', getAllUsers);
app.use('/modify', modify);
app.use('/stream', stream);
app.use('/comment', comment);
app.use('/getcomment', getComment);
app.use('/putvu', putVu);
app.use('/getvu', getVu);
app.use('/img', express.static('public/img'));



app.listen(PORT, () => {
		console.log("Server listening on port 3001");
})
