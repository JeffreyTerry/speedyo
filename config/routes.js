var _ = require('underscore'),
    request = require('request'),
    chat = require('../app/controllers/chat');

module.exports = function(app, config, io){
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

  app.get('/chat/:cid', function(req, res) {
    chat.getCount(req.params.cid, function(err, count) {
        if(err || count < 1 || count > 2) {
            res.render('404', {});
        } else {
            if (count == 1) {
              var local = io.of('/' + req.params.cid);
              local.on('connection', function (socket) {
                  socket.on('disconnect', function() {
                      console.log('bye');
                  });
                  socket.on('chat message', function(msg) {
                    console.log(msg);
                    socket.broadcast.emit('chat message', msg);
                  });
              });  
            } 
            res.render('home/home', {});
        }
    });
  });

  app.get('/fakeyo', function(req, res) {
      chat.findOpenChat(req.query, function(err, obj) {
        console.log('blaze');
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


