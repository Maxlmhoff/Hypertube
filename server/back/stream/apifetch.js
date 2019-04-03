var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const PirateBay = require('thepiratebay');

router.post('/', (req, res) => {
  if (req.body.api === 'yts') {
    if (req.body.id) {
      if (req.body.stream){
        fetch(`https://yts.am/api/v2/movie_details.json?movie_id=${req.body.id}&with_cast=true`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => response.data.movie)
        .then(response => res.json(response))
        .catch((err) => console.log('erreur yts'));
      }
      else {
        fetch(`https://yts.am/api/v2/movie_suggestions.json?movie_id=${req.body.id}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(response => res.json(response))
          .catch((err) => console.log('erreur yts'));
      } 
    }
    else if (req.body.genre) {
      fetch(`https://yts.am/api/v2/list_movies.json?genre=${req.body.genre}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(response => response.data.movies)
          .then(response => res.json(response))
          .catch((err) => console.log('erreur yts'));
      } else {
      fetch(`https://yts.am/api/v2/list_movies.json?sort_by=${req.body.sort || 'rating'}&limit=30&page=${req.body.page}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(response => res.json(response.data.movies))
    .catch((err) => console.log('erreur yts'));
    }
  }
  else if (req.body.api === 'bay') {
    if (req.body.id) {
      PirateBay
      .getTorrent(req.body.id)
      .then(results => { console.log(results); return(results) } )
      .then(results => res.json(results))
      .catch(err => console.log(err))
    } else {
        PirateBay.topTorrents(201)
        
        .then(response => res.json(response.map(elem => ({
          title: elem.name,
          id: elem.id,
        }))));
        // test.json();
      // .then(response => res.json(response))
    }
  }
  else if (req.body.api === 'search' && req.body.queryTerm) {
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
    res.json({ erreur: 'Veuillez préciser une api'})
  }
})

module.exports = router;
