const express = require('express');

const app = express();
const PORT = 3001


app.get('/', (req, res) => {
    res.send("This is the index page");
})
app.get('/users', (req, res) => {
    res.json([
        {id: 1, username: 'karl'},
        {id: 2, username: 'gunth'}
    ])
})

app.listen(PORT, () => {
    console.log("Server listening on port 3001");
})
