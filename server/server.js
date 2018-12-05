const express = require('express');
const con = require('./config/database');
var cors = require('cors');
var session = require('express-session');

const app = express();
const PORT = 3001


//Routes var 

var register = require('./back/register');
var signin = require('./back/signin');
var resetPass = require('./back/resetPass');




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


app.get('/', (req, res) => {
	console.log("celui qui est connecté est: ");
	console.log(req.session.log);
})


app.use('/register', register);
app.use('/signin', signin);
app.use('/resetPass', resetPass);




app.listen(PORT, () => {
    console.log("Server listening on port 3001");
})
