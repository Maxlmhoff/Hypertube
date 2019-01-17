var express = require('express');

var fs = require('fs');
var torrentStream = require('torrent-stream');


var router = express.Router();
var con = require('../../config/database');



router.get('/', (req, res) => {
    var engine = torrentStream('magnet:?xt=urn:btih:A0594137116DE074903EADF1A20CBA903F13E878&dn=https:\/\/yts.am\/torrent\/download\/A0594137116DE074903EADF1A20CBA903F13E878&tr=http://track.one:1234/announce&tr=udp://track.two:80');
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
    res.send('page stream');
})

module.exports = router