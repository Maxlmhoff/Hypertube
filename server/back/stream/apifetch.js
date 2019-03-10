var express = require('express');
var router = express.Router();
var con = require('../../config/database');
const fetch = require('node-fetch');

router.post('/', (req, res) => {
  if (req.body.api === 'yts') {
    console.log('1')
    if (req.body.normal) {
      console.log('A')
      fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating&limit=30', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(response => res.json(response.data.movies))
    }
    else if (req.body.id) {
      console.log('B')
      console.log(req.body.id)
      console.log('B')
      fetch(`https://yts.am/api/v2/movie_suggestions.json?movie_id=${req.body.id}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(response => res.json(response));
    }
    else if (req.body.queryTerm) {
      console.log('C')
      fetch(`https://yts.am/api/v2/list_movies.json?query_term=${req.body.queryTerm}&limit=50`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(response => res.json(response))
      .catch((err) => console.log('machin'));
    }
  }
  else if (req.body.bay) {
      console.log('2')
      res.json({ bay: 'Bay'})
  }
  else {
      console.log('3')
      res.json({ erreur: 'Veuillez préciser une api'})
  }
})

module.exports = router;
