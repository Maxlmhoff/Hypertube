const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const fsPromises = fs.promises;
var torrentStream = require('torrent-stream');
var router = express.Router();
var con = require('../../config/database');
const PirateBay = require('thepiratebay');

function getFile(path, timeout, callback) {
    const end = setInterval(function() {

        const file = path;
        const fileExists = fs.existsSync(file);

        if (fileExists) {
            clearInterval(end);
            callback();
        }
    }, timeout);
}

router.post('/', (req, res) => {
    if (req.body.api === 'yts') {
        var movie = req.body.movie;
        var hash = movie.torrents[0].hash;
        var link = movie.torrents[0].url;
        var engine = torrentStream('magnet:?xt=urn:btih:' + hash + '&dn=' + link + '&tr=http://track.one:1234/announce&tr=udp://track.two:80', { path: 'tmp/movies' });
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
                file.createReadStream();
                return path;
            })
            console.log(path);
            movie.path = path;
            console.log(movie.path);
            return new Promise((resolve, reject) => getFile(`tmp/movies/${path}`, 500, () => {
                resolve();
            })).then(() => movie).catch(console.log);
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