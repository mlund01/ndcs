var express = require('express');
var router = express.Router();
var https = require('https');
const hljs = require('highlight.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/reference', function (req, res, next) {
    var options = {
        hostname: 'api.ordercloud.io',
        path: '/v1/docs/sections/Authentication',
        method: 'GET'
    };
    console.log('caught route');
    var str = '';
    var request = https.request(options, function (response) {
        console.log('started request');
        response.on('data', function (d) {
            str += d;
            //console.log('data loaded');
            
        });
        response.on('end', function(){
            var data = JSON.parse(str);
            var html = hljs.highlight()
            res.render('reference', {docs: str})
        })
    });

    request.on('error', function (err) {
        console.log(err);
    });

    request.on('end', function () {
        console.log(str);

    })
    request.end();
    console.log(str);

});

module.exports = router;
