const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
var srt2vtt = require('srt-to-vtt');
var router = express.Router();
// const OS = require('opensubtitles-api');
// const OpenSubtitles = new OS({ useragent:'Hypersub' });


router.get('/:api/:id', async (req, res) => {
  res.header({
    'Content-type': 'text/vtt',
  });
  if (req.params.api === 'yts') {
      const movie = await fetch(`https://yts.am/api/v2/movie_details.json?movie_id=${req.params.id}`, {
          method: 'GET',
      })
      .then(response => response.json())
      .then(movie => movie.data.movie);
    if (movie.title_long){
    console.log(movie.path)

    console.log("2")
    console.log(movie.title_long)
    try {
      var files = fs.readdirSync(`${__dirname}/../../tmp/movies/${movie.title_long}`);
    } catch(e) {
      res.end();
      return;
    }
      files.forEach(function (file) {
    console.log("3")
    if (file.indexOf('.srt') !== -1) {
    console.log("4")
    movie.subtitles = file;
        }
      })
      if (movie.subtitles) {
        fs.createReadStream(`${__dirname}/../../tmp/movies/${movie.title_long}/${movie.subtitles}`).pipe(srt2vtt()).pipe(res);
        return;
      }
    }
  }
  res.end();
})

module.exports = router;
