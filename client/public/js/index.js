var roomMember;
//屏幕动态适配
MT.p2m(640);

socket.on('joinRoom', function(data) {
    console.log(data)//roomInfo
    roomMember = data.roomMember;
    $('.players').html('');
    var docFragment = document.createDocumentFragment();
    var span = null;
    for(var i = 0;i<roomMember.length;i++) {
        span = document.createElement('span');
        span.appendChild(document.createTextNode(roomMember[i].playername));
        docFragment.appendChild(span);
    }
    $('.players').append(docFragment);
    $(".start-game-btn").click(function() {
        if(roomMember.length <2) {
            MT.toast('至少需2人才能开始游戏');
        } else {
            socket.emit('game-start')
        }
    });
    socket.on('game-start',function() {
        window.location.pathname = '/draw.html';
    })
});

socket.on('join-game-lobby', function(data){
    socket.on('roomMember', function(data) {
        console.log(data)
        $('.online').html('当前人数' + data);
    });
    $('.room-enter').click(function() {
        socket.emit('joinRoom', data);
        $('.room-wrap').remove();
        $('.main').append(
            '<div class="wait-game">'+
                '<div class="players">'+
                '</div>'+
                '<div class="btn start-game-btn">开始游戏</div>'+
            '</div>'
        )
    });
});

Zepto(function ($) {
    $('.login-btn').on('click', function () {
        var playername = $('.login-name').val();
        if (playername) {
            document.cookie = "playername=" + playername;
            $('.login-wrap').remove();
            $('.main').append(
                '<div class="room-wrap"><div class="room-item clearfix">'+
                    '<span class="room">房间1</span>'+
                   ' <span class="online">当前人数0</span>'+
                   '<span class="room-enter">进入</span></div></div>'
            )
            socket.emit('join-game-lobby',{playername: playername})
        } else {
            alert('请输入用户名');
        }
    })
});
