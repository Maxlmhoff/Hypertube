const express = require('express');
const con = require('./config/database');
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser')

const app = express();
const PORT = 3001


//Routes var 

var register = require('./back/register');
var signin = require('./back/signin');
var resetPass = require('./back/resetPass');
var loginFb = require('./back/loginFb');
var getUser = require('./back/getuser');


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
app.use('/getuser', getUser);
app.use('/img', express.static('public/img'));






app.listen(PORT, () => {
		console.log("Server listening on port 3001");
})
