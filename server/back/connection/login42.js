var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query.code);
  fetch('https://api.intra.42.fr/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: '95ef3ef0c29389c329128b8eb8213b07d2ec51fa0a39ebf2ef364d0a04e71438',
        client_secret: '24a313d1bcd60f68c035e1ff986aa4b32ab6e4f61a0e68ed85a27b32af75179d',
        code: req.query.code, 
        redirect_uri: 'http://localhost:3001/login42',
    })
  })
  .then(response => response.json())
  .then(response => {
    var token = response.access_token;
      //console.log('coucou');
      console.log(token);
      return fetch(`https://api.intra.42.fr/v2/me?access_token=${token}`)
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(response => res.json(response))
    });
  });

module.exports = router;