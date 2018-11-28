const express = require('express');
const con = require('./config/database');
var cors = require('cors');
var session = require('express-session');

const app = express();
const PORT = 3001


//Routes var 

var register = require('./back/register');
var signin = require('./back/signin');




//Midllewares

app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'karlsecret',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(cors())
app.use(require('./Middlewares/user'))


app.get('/', (req, res) => {
    res.send("This is the index page");
})


app.use('/register', register);
app.use('/signin', signin);




app.listen(PORT, () => {
    console.log("Server listening on port 3001");
})
