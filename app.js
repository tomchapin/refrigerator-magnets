var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8001;

server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/(js|css|img)/*', function(req, res){
  res.sendfile(__dirname + "/public/"+req.url);
});

io.sockets.on('connection', function (socket) {
  // echo the message
  socket.on('message', function (data) {
    console.info(data);
    //socket.send("[ECHO] " + data);
    socket.emit('message', "test");
    socket.broadcast.emit('message', "test");
  });
});