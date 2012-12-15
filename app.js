var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Port: Cloud 9, AppFog, or fall back to 80
var port = process.env.PORT || process.env.VCAP_APP_PORT || 80;

server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/(js|css|img)/*', function(req, res){
  res.sendfile(__dirname + "/public/"+req.url);
});

/* Use xhr-polling for web hosts that don't fully support socket.io
io.configure(function () {
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
*/

io.sockets.on('connection', function (socket) {
  // echo the message
  socket.on('message', function (data) {
    console.info(data);
    //socket.send("[ECHO] " + data);
    socket.emit('message', data);
    socket.broadcast.emit('message', data);
  });
});