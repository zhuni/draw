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
var roomMember = [];//[{playername: playername}]
var roomMemberCopy;
var Game = {};
var roomInfo = {
    roomMember: roomMember,
    isStart: false
};
//{ roomMember: , isStart: false}

io.sockets.on('connection', function(socket) {//这个是传递本次连接的socket
  var user;
//   socket.on('disconnect', function(data) {
//       socket.emit('disconnect');
//     // io.sockets.emit('quit', this.name);
//   });
// console.log(this);

    socket.on('join-game-lobby', function(data) {
        //{playername: playername}
        socket.emit('join-game-lobby',data);
        io.sockets.emit('roomMember',roomMember.length);

    })
    socket.on('joinRoom', function(data) {
        //roomM[] {playername: playername}
        data.score = 0;
        roomMember.push(data);
        console.log('joinroom');
        console.log(roomMember);
        console.log('joinRoom');
        io.sockets.emit('roomMember',roomMember.length);
        io.sockets.emit('joinRoom', roomInfo);
    });
    console.log('roomMember:', roomMember);
    socket.emit('players', roomMember);

    socket.on('game-start', function() {
        if(!roomMemberCopy) {
            roomMemberCopy = roomMember.slice();
        }
        io.sockets.emit('game-start', roomMember);
        setTimeout(gamerun, 1000);
    });

            function gamerun() {
            if(!roomMember.length) {
                io.sockets.emit('gameover');
                return;
            }
            var drawer = roomMember[0].playername;
            var word = db.randomWord();
            roomMember[0].word = word;//{word: 'dd', tip: ''}
            console.log('现在由'+drawer+'来画');
            io.sockets.emit('yourtime', roomMember[0]);
            setTimeout(function() {
                    roomMember.shift();
                    gamerun();
            }, 30000);
        }


  socket.on('paint', function(data) {
    socket.broadcast.emit('paint_sync', data.paths);//给除了自己之外的客户端发消息。
  });

  socket.on('reset', function() {
      io.sockets.emit('reset');
    });

    socket.on('answer-msg', function(data) {
        var isCorrect = data.anwer ==data.playerInfo.word.word ? '正确' : '错误';
        var answerStr = data.anwerpeoplename +' 回答说: '+ data.anwer+ '  回答'+isCorrect;
        io.sockets.emit('answer-msg', answerStr);
        console.log(roomMemberCopy);
        if(isCorrect == '正确') {
            for(var i=0;i<roomMemberCopy.length;i++) {
                if(roomMemberCopy[i].playername == data.anwerpeoplename) {
                    roomMemberCopy[i].score++;
                    io.sockets.emit('players', roomMemberCopy);
                }
            }
        }
        console.log(roomMemberCopy);
    })

});
