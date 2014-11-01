var _ = require('underscore')
       ,request = require('request')
       ,chat = require('../app/controllers/chat');

module.exports = function(app, config, io){

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
  });

  app.get('/fakeyo', function(req, res) {
    chat.createChat(function(err, response) {
      res.json({});
    });
  });

  app.get('/', function(req,res) {
      res.render('home/home', {});
  });

  io.on('connection', function (socket) {
    console.log('hi');
    socket.on('disconnect', function(){
      console.log('bye');
    });
  });

  
};


