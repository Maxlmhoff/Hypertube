var express = require('express');
const fetch = require('node-fetch');
var fs = require('fs');
var torrentStream = require('torrent-stream');
var router = express.Router();
var con = require('../../config/database');
const PirateBay = require('thepiratebay');

function download(movie) {

}


router.post('/', (req, res) => {
    if (req.body.api === 'yts') {
        var movie = req.body.movie;
        var hash = movie.torrents[0].hash;
        var link = movie.torrents[0].url;
        var engine = torrentStream('magnet:?xt=urn:btih:' + hash + '&dn=' + link + '&tr=http://track.one:1234/announce&tr=udp://track.two:80', { path: '/tmp/movies' });
        return new Promise(function (resolve, reject) {
            engine.on('ready', function () {
                resolve({ engine, movie });
            });
        })
        .then(({ engine, movie }) => {
            let path = undefined;
            engine.files.forEach(function (file) {
                if ((file.name.indexOf('.mp4') || file.name.indexOf('.MP4')) > 0) {
                    path = file.path;
                }
                var stream = file.createReadStream();
                return path;
            })
            console.log(path);
            movie.path = path;
            console.log(movie.path);
            return movie;
    })
    .then((movie) => { res.json({ movie: movie }) });
    }
    else if (req.body.api === 'bay'){
        PirateBay
            .getTorrent(req.body.id)
            .then(results => res.json(results))
            .catch(err => console.log(err))
    }
    else {
        res.json({erreur: 'Api problem'});
    }
})

module.exports = router