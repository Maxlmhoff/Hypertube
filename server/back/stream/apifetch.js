var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const PirateBay = require('thepiratebay');

router.post('/', (req, res) => {
  if (req.body.api === 'yts') {
    console.log('1')
    if (req.body.normal) {
      console.log('A')
      fetch(`https://yts.am/api/v2/list_movies.json?sort_by=rating&limit=30&page=${req.body.page}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(response => res.json(response.data.movies))
    .catch((err) => console.log('erreur yts'));
  }
    else if (req.body.id) {
      console.log('B')
      console.log(req.body.id)
      console.log('B')
      fetch(`https://yts.am/api/v2/movie_suggestions.json?movie_id=${req.body.id}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(response => res.json(response))
          .catch((err) => console.log('erreur yts'));
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
  else if (req.body.api === 'bay') {
      console.log('2')
      PirateBay.topTorrents(201)
      
      .then(response => res.json(response.map(elem => ({
        title: elem.name,
        id: elem.id,
      }))))
      // test.json();
    // .then(response => res.json(response))
  }
  else {
      console.log('3')
      res.json({ erreur: 'Veuillez préciser une api'})
  }
})

module.exports = router;
