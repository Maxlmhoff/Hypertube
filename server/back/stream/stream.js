var express = require('express');
const fetch = require('node-fetch');

var fs = require('fs');
var torrentStream = require('torrent-stream');


var router = express.Router();
var con = require('../../config/database');



function download(movie) {

}


router.post('/', (req, res) => {
    console.log("server server")
    console.log(req.body.id)
    fetch('https://yts.am/api/v2/movie_details.json?movie_id=' + req.body.id, {
        method: 'GET',
    })
        .then(response => response.json())
        // .then(movie => { console.log(movie.data) })
        .then((movie) => {
            //console.log(movie.data.movie)
            var hash = movie.data.movie.torrents[0].hash;
            var link = movie.data.movie.torrents[0].url;
            var path = 'salut max';
            // console.log(req.body.movie_infos.movie.torrents[0]);
            var engine = torrentStream('magnet:?xt=urn:btih:' + hash + '&dn=' + link + '&tr=http://track.one:1234/announce&tr=udp://track.two:80', { path: '/tmp/movies' });
            return new Promise(function (resolve, reject) {
                engine.on('ready', function () {
                    resolve({ engine, movie });
                });
            });
        })
        .then(({ engine, movie }) => {




            engine.files.forEach(function (file, movie) {
                // console.log('filename:', file.name);
                if (file.name.indexOf('.mp4') > 0) {
                    var filePath = file.name;
                    console.log('FILEPATH  ***  ' + filePath);
                    var stream = file.createReadStream();
                    // stream is readable stream to containing the file content
                    movie.path = filePath;
                    return movie;
                }
            })
            // console.log(test)











            const file = engine.files[0];
            var fileName = file.name;
            var filePath = file.path;
            var path = filePath;
            var stream = file.createReadStream();
            // stream is readable stream to containing the file content
            movie.path = filePath;
            return movie;
        })
        .then((movie) => { res.json({ movie: movie }) });
})

module.exports = router