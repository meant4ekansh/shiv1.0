var express = require('express');

var app = express();

var socket = require('socket.io');



var server = app.listen(3000);
app.use(express.static('public'));

// app.use('/login', express.static('login'));

var io = socket(server);

io.sockets.on('connection', newConnection);

console.log('running, maybe!');

function newConnection(socket){
  console.log('connection id ' + socket.id);
  socket.on('mouse', mouseMsg);

  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }

}
