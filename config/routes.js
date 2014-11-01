var _ = require('underscore'),
    request = require('request'),
    chat = require('../app/controllers/chat');

module.exports = function(app, config){
    app.get('/yo', function(req, res){
        chat.findOpenChat(req.query, function(err, obj) {
            if(err) {
                if(req.query && req.query.username) {
                    chat.createChat(req.query.username, function(err, object) {
                        res.json({'response': 'OK'});
                    });
                }
            } else {

                var formData1 = {'username': req.query.username,
                                'api_token': '1d8ea23c-a1bf-4f18-b417-756e01d5b359',
                                'link': 'http://74a4c901.ngrok.com/chat/' + obj._id};
                var formData2 = {'username': obj.username,
                                'api_token': '1d8ea23c-a1bf-4f18-b417-756e01d5b359',
                                'link': 'http://74a4c901.ngrok.com/chat/' + obj._id};
                request.post({url: 'https://api.justyo.co/yo/', form: formData1}, function(err, response1, body1) {
                    request.post({url: 'https://api.justyo.co/yo/', form: formData2}, function(err, response2, body2) {
                        if(err) {
                            res.status(500).json({'err': err});
                        } else {
                            res.json(body2);
                        }
                    });
                });
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

    app.get('/chat/:cid', function(req, res) {
        chat.getCount(req.params.cid, function(err, count) {
            if(err || count < 1 || count > 2) {
                res.render('404', {});
            } else {
                res.render('home/home', {});
            }
        });
    });

    app.get('/fakeyo', function(req, res) {
        chat.findOpenChat(req.query, function(err, obj) {
            if(err) {
                chat.createChat("bob", function(err, obj) {
                    res.json({'response': 'OK'});
                });
            } else {
                res.json({url: '/chat/' + obj._id});
            }
        });
    });
};


