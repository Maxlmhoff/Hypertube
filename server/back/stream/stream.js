const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const fsPromises = fs.promises;
var torrentStream = require('torrent-stream');
var router = express.Router();
var con = require('../../config/database');
const PirateBay = require('thepiratebay');
var ffmpeg = require('fluent-ffmpeg');
var pump = require('pump')

function isVideo(file){
    var tab = ['.avi', '.mp4', '.mkv'];
    var ret = false;
    tab.forEach(function (elem){
        if (file.indexOf(elem) !== -1 || file.indexOf(elem.toUpperCase()) !== -1){
            ret = true;
            console.log("TATATATA");
            console.log(file);
            console.log(`${file.indexOf(elem)} ${file.indexOf(elem.toUpperCase())}`);
            console.log("TUTUTUTU");
        }
    })
    return ret;
}

router.get('/:api/:id', async (req, res) => {
    if (req.params.api === 'yts') {
        const movie = await fetch(`https://yts.am/api/v2/movie_details.json?movie_id=${req.params.id}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => response.data.movie)
        .catch((err) => console.log(err));
        var hash = movie.torrents[0].hash;
        var link = movie.torrents[0].url;
        var engine = torrentStream('magnet:?xt=urn:btih:' + hash + '&dn=' + link, { path: 'tmp/movies' });
        return new Promise(function (resolve, reject) {
            engine.on('ready', function () {
                resolve({ engine, movie });
            });
        })
        .then(({ engine, movie }) => {
            let path = undefined;
            let stream;
            engine.files.forEach(function (file) {
                if ((file.name.indexOf('.mp4') || file.name.indexOf('.MP4')) > 0) {
                    path = file.path;
                    stream = file.createReadStream();
                }
                return path;
            });
            res.header({
                'Content-type': 'video/mp4'
            })
            return stream.pipe(res);
        })
        .catch((err) => console.log(err.stack));
    }
    else if (req.params.api === 'bay'){
        console.log('Bay');
        const movie = await PirateBay.getTorrent(req.params.id);
        var engine = torrentStream(movie.magnetLink, { path: 'tmp/movies' });
        console.log('Salut');
        return new Promise(function (resolve, reject) {
        console.log('Salut2');
        engine.on('ready', function () {
        console.log('Salut3');
        resolve({ engine, movie });
            });
        })
        .then(({ engine, movie }) => {
            let path = undefined;
            let stream = undefined;
            engine.files.forEach(function (file) {
                if (!stream && isVideo(file.name) && file.name !== 'sample.avi') {
                    console.log('Salut4');
                    if(file.name.indexOf('.avi') !== -1 || file.name.indexOf('.AVI') !== -1){
                        console.log('Salut5');
                        stream = file.createReadStream();
                    } else {
                        console.log('Salut6');
                        stream = file.createReadStream();
                    }
                    path = file.path;
                    console.log(file.name);
                } else {
                    file.createReadStream();
                }
                return path;
            });
            return stream.pipe(res);
        })
        .catch((err) => console.log(err));
    }
    else {
        res.json({erreur: 'Api problem'});
    }
})

module.exports = router