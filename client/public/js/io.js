var socket = io('192.168.1.100:8090');
var playername = document.cookie.match('playername=([^;]*)[;]?')[1];
var isMe = false;
