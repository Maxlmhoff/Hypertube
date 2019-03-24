const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
var router = express.Router();
// const OS = require('opensubtitles-api');
// const OpenSubtitles = new OS({ useragent:'Hypersub' });


router.get('/:api/:id', async (req, res) => {
  if (req.params.api === 'yts') {
      const movie = await fetch(`https://yts.am/api/v2/movie_details.json?movie_id=${req.params.id}`, {
          method: 'GET',
      })
      .then(response => response.json())
      .then(movie => movie.data.movie);
    if (movie.title_long){
      var files = fs.readdirSync(`${__dirname}/../../tmp/movies/${movie.title_long}`);
      files.forEach(function (file) {
        if (file.indexOf('.srt') !== -1) {
          movie.subtitles = file;
        }
      })
      fs.createReadStream(`${__dirname}/../../tmp/movies/${movie.title_long}/${movie.subtitles}`).pipe(res);
    }
    else {

    }
  }
})

module.exports = router;
