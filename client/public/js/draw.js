var canvas = document.getElementById('draw-board');
	canvas.width = window.innerWidth;
var	ctx = canvas.getContext('2d');
var gameInfo = {};
var can = {};
canvas.paths = [];

//屏幕动态适配
MT.p2m(640);
socket.on('players', function(data) {
    $('.game-role').html('');
	console.log('得分:', data);
    for(var i=0;i<data.length;i++) {
        $('.game-role').append('<span class="game-player">'+data[i].playername+'<span>得分:'+data[i].score+'</span></span>')
    }
});

socket.on('yourtime', function(data) {
    console.log(data);
    gameInfo.playerInfo = data;
    socket.emit('reset');
    $('.msg-box').html('');
    if(playername == data.playername) {
        isMe = true;
        $('.tips').html('现在由你来画，提示：'+data.word.word);
    } else {
        isMe = false;
        $('.tips').html('现在由'+data.playername+'来画，提示：'+data.word.tip);
    }
});

socket.on('gameover', function() {
    MT.toast('游戏结束');
    setTimeout(function() {
        window.location.pathname = '/index.html';
    }, 1000);
});

socket.on('paint_sync', function(data) {
    Ctrl.drawPts(ctx, data);
});

socket.on('reset', function(data) {
	ctx.clearRect(0, 0, canvas.width, 450);
});

socket.on('answer-msg', function(data) {
    console.log(data);
    $('.msg-box').html(data);
});

$('.answer-input').focus(function() {
    if(isMe) {
        $('.msg-box').html('你是作图者，不能回答');
    }
})
$('.send-answer').click(function() {
    var answer = $('.answer-input').val();
    if(!answer) {
        return;
    }
    gameInfo.anwerpeoplename = playername;
    gameInfo.anwer = answer;
    socket.emit('answer-msg', gameInfo);
    $('.answer-input').val('');
});

window.onload = function() {
	canvas.addEventListener('touchstart', function(e) {
		if(!isMe) {
			return;
		}
		canvas.paths = [];
		can.isTouchdown = true;
		var x = e.touches[0].clientX,
			y = e.touches[0].clientY - 50;
			canvas.paths.push([x,y]);
			console.log(x, y);
	});

	canvas.addEventListener('touchmove', function(e) {
		if(!isMe) {
			return;
		}
		if(can.isTouchdown) {
		var x = e.touches[0].clientX,
			y = e.touches[0].clientY -50;
			console.log(x,y);
			canvas.paths.push([x, y]);
			socket.emit('paint', {paths: canvas.paths});
			Ctrl.drawPts(ctx, canvas.paths);
		}

	});

	canvas.addEventListener('touchend', function(e) {
		if(!isMe) {
			return;
		}
		console.log('touch end');
		can.isTouchdown = false;
	});

	$('.reset-board').on('click', function() {
		if(!isMe) {
			return;
		}
		// ctx.clearRect(0, 0, canvas.width, 450);
		socket.emit('reset');
	});
};

var Ctrl = {
	drawPts: function(ctx, pts) {
		var p1 = pts[0];
		ctx.beginPath();
		ctx.moveTo(p1[0], p1[1]);
		pts.slice(1).forEach(item => {
			ctx.lineTo(item[0], item[1]);
		});
		// ctx.strokeStyle = "blue";
		ctx.stroke();

	}
};
