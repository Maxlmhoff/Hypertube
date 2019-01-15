var express = require('express');

var fs = require('fs');
var torrentStream = require('torrent-stream');
var engine = torrentStream('magnet:?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80');

var router = express.Router();
var con = require('../../config/database');

engine.on('ready', function() {
    engine.files.forEach(function(file) {
        console.log('filename:', file.name);
        var stream = file.createReadStream();
        // stream is readable stream to containing the file content
    });
});


router.get('/', (req, res) => {
    res.send('page stream');
})

module.exports = router