var express = require('express');
var app = express()
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db');

app.set('port', process.env.PORT || 8090);
app.use(express.static(path.join(__dirname, '../client/public/')));
app.use(express.static(path.join(__dirname, '../client/public/views')));
// app.use('/css', express.static(path.join(__dirname, '../client/public/css')));
// app.use('/js', express.static(path.join(__dirname, '../client/public/js')));

server.listen(app.get('port'));

var userList = [];
var roomMember = [];
var Game = {};
 
io.sockets.on('connection', function(socket) {//这个是传递本次连接的socket
  var user;
//   socket.on('disconnect', function(data) {
//       socket.emit('disconnect');
//     // io.sockets.emit('quit', this.name);
//   });
// console.log(this);

  socket.on('paint', function(data) {
    socket.broadcast.emit('paint_sync', data.paths);//给除了自己之外的客户端发消息。
  });

  socket.on('reset', function(data) {
      socket.broadcast.emit('reset');
    });

    socket.on('joinRoom', function(data) {
        roomMember.push(data);

    });
    io.sockets.emit('roomMember',roomMember.length);

    socket.on('waiting-page', function() {
        io.sockets.emit('waiting-page', roomMember);
    });
    socket.on('game_start', function() {
        io.sockets.emit('game_start', roomMember);
        setTimeout(gamerun, 1000);
    });


        function gamerun() {
            console.log('-----')
            if(!roomMember.length) {
                io.sockets.emit('gameover');
                return;

            }
            var drawer = roomMember[0];
            console.log('现在由'+drawer+'来画');
            io.sockets.emit('yourtime', drawer);
            setTimeout(function() {
                    roomMember.shift();
                    gamerun();
            }, 30000);
        }
       





});

