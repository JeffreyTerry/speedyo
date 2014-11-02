var Chat = require('../models/chat').model;

function distanceBetween(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

exports.findOpenChat = function(query, cb) {
  Chat.find({count: -1}, function(err, objects) {
    var found = [];
    var hasPossibleChats = false;
    for(var i = 0; i < objects.length; ++i) {
      if(distanceBetween(objects[i].lat, objects[i].lng, query.lat, query.lng) < 40) {
        hasPossibleChats = true;
        if(objects[i].username != query.username) {
          found.push(objects[i]);
        }
      }
    }
    if(found.length != 0) {
      var obj = found[0];
      for(var i = 1; i < found.length; ++i) {
        if(found[i].time < obj.time) {
          obj = found[i];
        }
      }
      if(err || obj == null) {
        cb({'err': 'no chats'}, undefined);
      } else {
        Chat.findByIdAndUpdate(obj._id, {$inc: {count: 1}}, cb);
      }
    } else {
      if(hasPossibleChats) {
        cb({'err': 'already yod'}, undefined);
      } else {
        cb({'err': 'no chats'}, undefined);
      }
    }
  });
};

exports.createChat = function(username, lat, lng, cb) {
  var chat = new Chat({'username': username, 'time': new Date(), 'lat': lat, 'lng': lng, 'count': -1});
  chat.save(cb);
};

exports.remove = function(id, cb) {
  Chat.findByIdAndRemove(id, cb);
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

