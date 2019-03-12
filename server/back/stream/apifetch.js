var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const PirateBay = require('thepiratebay');

router.post('/', (req, res) => {
  if (req.body.api === 'yts') {
    console.log('1');
    if (req.body.id) {
      console.log('B');
      fetch(`https://yts.am/api/v2/movie_suggestions.json?movie_id=${req.body.id}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(response => res.json(response))
          .catch((err) => console.log('erreur yts'));
    }
    else if (req.body.genre) {
      console.log('C');
      fetch(`https://yts.am/api/v2/list_movies.json?genre=${req.body.genre}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(response => { console.log(response.data.movies); return response})
          .then(response => response.data.movies)
          .then(response => res.json(response))
          .catch((err) => console.log('erreur yts'));
      } else {
      console.log('A')
      fetch(`https://yts.am/api/v2/list_movies.json?sort_by=${req.body.sort || 'rating'}&limit=30&page=${req.body.page}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(response => res.json(response.data.movies))
    .catch((err) => console.log('erreur yts'));
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
  else if (req.body.api === 'search' && req.body.queryTerm) {
    console.log('3')
    var list = [];
      fetch(`https://yts.am/api/v2/list_movies.json?query_term=${req.body.queryTerm}&limit=50`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(response => response.data.movies)
      // .then(response => { console.log(response); return response})
      .then(response => list = response.map(elem => ({
        api: 'yts',
        ...elem
      })
      ))
      .then(() => {
        PirateBay.search(req.body.queryTerm, {
          category: 201,
        })
        .then(response => response.map(elem => ({
          title: elem.name,
          id: elem.id,
          api: 'bay',
        })))
        .then(response => { console.log(list.length); return response})
        .then(response => list.concat(response))
        .then(response => { console.log(response.length); return response})
        .then(response => res.json(response))
        .catch((err) => console.log('machin'));
      })
  }
  else {
    console.log('4')
    res.json({ erreur: 'Veuillez préciser une api'})
  }
})

module.exports = router;
