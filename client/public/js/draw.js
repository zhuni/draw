var canvas = document.getElementById('draw-board');
	canvas.width = window.innerWidth;
var	ctx = canvas.getContext('2d');
var can = {};
	canvas.paths = [];

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
		ctx.clearRect(0, 0, canvas.width, 450);
		socket.emit('reset');
	})

	


}




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
}