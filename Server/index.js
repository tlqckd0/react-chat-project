const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);


var ChattingSocket = require('./ChattingSocket');
//메인 채팅방
ChattingSocket(io,'/0');

const RoomManager = require('./RoomManage.js');

//채팅방 관리자
const roomManager = new RoomManager(io);
setInterval(() => {
    //30초마다 방 0 명이면 삭제함
    roomManager.checkRoom();
}, 30000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const routes = require('./routes/index')(roomManager);

app.use('/',routes);

http.listen(4000,()=>{
    console.log('server listening on 4000');
})