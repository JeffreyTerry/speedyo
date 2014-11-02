var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
  count: {type: Number, required: true},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  time: {type: Date, required: true},
  username: {type: String, required: true}
});

exports.model = mongoose.model('chat', chatSchema);




