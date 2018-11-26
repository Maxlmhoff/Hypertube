const express = require('express');
const con = require('./config/database');
var cors = require('cors')

const app = express();
const PORT = 3001


//Routes var 

var register = require('./back/register');









app.use(cors())



app.get('/', (req, res) => {
    res.send("This is the index page");
})
app.get('/users', (req, res) => {
    res.json([
        {id: 1, username: 'karl'},
        {id: 2, username: 'gunth'}
    ])
})







app.use('/register', register);




app.listen(PORT, () => {
    console.log("Server listening on port 3001");
})
