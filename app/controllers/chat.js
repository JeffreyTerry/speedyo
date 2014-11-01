var Chat = require('../models/chat').model;

exports.createChat = function(cb) {
  var chat = new Chat(req.body);
  chat.save(cb);
};

exports.getUserCount = function(id, cb) {
  Chat.findByIdAndUpdate(id, {$inc: {count: 1}}, function(err, obj) {
    console.log(obj);
    cb(err, obj);
  });
};

