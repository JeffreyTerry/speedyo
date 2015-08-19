var _ = require('underscore'),
    request = require('request'),
    chat = require('../app/controllers/chat'),
    Cleverbot = require('cleverbot-node'),
    cleverbot = new Cleverbot;

module.exports = function(app, config, io){
  app.get('/yo', function(req, res){
      req.query.lat = parseFloat(req.query.location.split(';')[0]);
      req.query.lng = parseFloat(req.query.location.split(';')[1]);
      console.log(req.query, 'blaze');
      chat.findOpenChat(req.query, function(err, obj) {
          if(err) {
              if(err.err == 'already yod') {
                  res.json({'response': 'ALREADY YOD'})
              } else {
                  if(req.query && req.query.username) {
                      chat.createChat(req.query.username, req.query.lat, req.query.lng, function(err, object) {
                          res.json({'response': 'OK'});
                      });
                  }
              }
          } else {
              var formData1 = {'username': req.query.username,
                              'api_token': '2ba68aaf-bf89-48bc-b94d-765a8841b557',
                              'link': 'http://54.201.26.7/chat/' + obj._id};
              var formData2 = {'username': obj.username,
                              'api_token': '2ba68aaf-bf89-48bc-b94d-765a8841b557',
                              'link': 'http://54.201.26.7/chat/' + obj._id};
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

  app.get('/chat/:cid', function(req, res) {
    chat.getCount(req.params.cid, function(err, count) {
        if(err || count < 1 || count > 2) {
            res.render('404', {});
        } else {
            //to eliminate duplicate servers, only listen to the 1st person.
            if (count == 1) {
              var local = io.of('/' + req.params.cid);
              var connected = 0;
              local.on('connection', function (socket) {
                  ++connected;

                  socket.on('disconnect', function() {
                    --connected;
                    if(connected == 0) {
                        chat.remove(req.params.cid, function(err, response){});
                    } else {
                      socket.broadcast.emit('left room');
                    }
                  });

                  socket.on('chat message', function(msg) {
                    socket.broadcast.emit('chat message', msg);
                  });
                  socket.on('typing', function () {
                    socket.broadcast.emit('typing');
                  });
                  socket.on('not typing', function() {
                    socket.broadcast.emit('not typing');
                  });

                  if (connected == 2){
                    socket.broadcast.emit('person entered');
                    socket.emit('person entered');
                  }
              });
            }
            res.render('home/home', {});
        }
    });
  });

  app.get('/fakeyo', function(req, res) {
      chat.findOpenChat({lat: 41.258286, lng: -72.989223}, function(err, obj) {
          if(err) {
            if(err.err == 'already yod') {
                res.json({'response': 'ALREADY YOD'})
            } else {
                chat.createChat('bob', 41.258286, -72.989223, function(err, obj) {
                    res.json({'response': 'OK'});
                });
            }
          } else {
              res.json({url: '/chat/' + obj._id});
          }
      });
  });

  // This sets cleverbot up on the index page
  var local = io.of('/');
  local.on('connection', function (socket) {
      socket.on('disconnect', function() {
        socket.broadcast.emit('left room');
      });

      socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', msg);
        socket.emit('typing');
        Cleverbot.prepare(function(){
          cleverbot.write(msg, function (response) {
            socket.emit('not typing');
            socket.emit('chat message', response.message);
          });
        });
      });
      socket.on('typing', function () {
        socket.broadcast.emit('typing');
      });
      socket.on('not typing', function() {
        socket.broadcast.emit('not typing');
      });

      socket.broadcast.emit('person entered');
      socket.emit('person entered');
  });
};


