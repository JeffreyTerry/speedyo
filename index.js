var config = require('./config/config')
  , express = require('express')
  , mongoose = require('mongoose')
  , fs = require('fs');

// Open the MongoDB connection 
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('Unable to connect to the database at ' + config.db);
});

// Reads all the model files form /app/models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});


// Configures app and routes
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('./config/express')(app, config);
require('./config/routes')(app, config, io);

// Starts the server: Export the app when running production, start the server directly when developing.
if (process.env.NODE_ENV == 'production') {
  module.exports = app;
} else {
  server.listen(config.port);
  console.log('Express server is listening on port %s on %s environment.', config.port, app.settings.env);
}



