// var socket = io('localhost:8090');
var socket = io('192.168.1.101:8090');
console.log(socket);
var playername = document.cookie.match('playername=([^;]*)[;]?')[1];
var isMe = false;