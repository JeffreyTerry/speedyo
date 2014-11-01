var Chat = require('../models/chat').model;

exports.findOpenChat = function(query, cb) {
  Chat.findOne({count: -1}, function(err, obj) {
    if(err || obj == null) {
      cb({'err': 'no chats'}, undefined);
    } else {
      Chat.findByIdAndUpdate(obj._id, {$inc: {count: 1}}, cb);
    }
  });
};

exports.createChat = function(username, cb) {
  var chat = new Chat({'username': username, count: -1});
  chat.save(cb);
};

exports.getCount = function(id, cb) {
  Chat.findByIdAndUpdate(id, {$inc: {count: 1}}, function(err, obj) {
    if(err) {
      cb(err, undefined);
    } else {
      cb(undefined, obj.count);
    }
  });
};

