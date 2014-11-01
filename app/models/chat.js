var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
  count: {type: Number, required: true},
  username: {type: String, required: true}
});

exports.model = mongoose.model('chat', chatSchema);




