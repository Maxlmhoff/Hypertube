var express = require('express');

var fs = require('fs');
var torrentStream = require('torrent-stream');


var router = express.Router();
var con = require('../../config/database');



router.post('/', (req, res) => {
    console.log("server server")
    var hash = req.body.movie_infos.movie.torrents[0].hash;
    var link = req.body.movie_infos.movie.torrents[0].url;
    console.log(req.body.movie_infos.movie.torrents[0]);
    var engine = torrentStream('magnet:?xt=urn:btih:'+ hash +'&dn='+ link +'&tr=http://track.one:1234/announce&tr=udp://track.two:80', {path: '/tmp/movies'});
    engine.on('ready', function() {
        engine.files.forEach(function(file) {
            var fileName = file.name;
            var filePath = file.path;
            console.log(fileName + '  ***  ' + filePath);
            console.log('filename:', file.name);
            console.log(file); 
            var stream = file.createReadStream();
            // console.log(stream);
            // stream is readable stream to containing the file content
        });
    });
    res.json({path: 'ok'});
})

module.exports = router