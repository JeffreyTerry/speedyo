var _ = require('underscore'),
    request = require('request'),
    chat = require('../app/controllers/chat');

module.exports = function(app, config){
    app.get('/yo', function(req, res){
        if(req.query) {
            console.log('query', req.query);
            if(req.query.username == 'HANGJEANS') {
                res.json({'err': 'you suck'});
                return;
            }
        }
        var formData = {'username': req.query.username,
                        'api_token': '1d8ea23c-a1bf-4f18-b417-756e01d5b359',
                        'link': 'http://74a4c901.ngrok.com'};
        console.log('formData', formData);
        request.post({url: 'https://api.justyo.co/yo/', form: formData}, function(err, response, body) {
            if(err) {
                res.status(500).json({'err': err});
            } else {
                res.json(body);
            }
        });
        // var formData = {'to': 'THEONLYJEFF2',
        //                 'username': 'THEONLYJEFF2',
        //                 'link': 'http://google.com'};
        // request.post({url: 'http://dev.justyo.co/rpc/yo_from_api_account', form: formData}, function(err, response, body) {
        //     if(err) {
        //         res.status(500).json({'err': err});
        //     } else {
        //         res.json(body);
        //     }
        // });
    });

    app.get('/fakeyo', function(req, res) {
        chat.createChat(function(err, response) {
            res.json({});
        });
    });
};


