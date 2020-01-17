const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);
var ChattingSocket = require('./ChattingSocket');
const RoomManager = require('./RoomManage.js');


//채팅방 관리자
const roomManager = new RoomManager(io);
setInterval(() => {
    //30초마다 방 0 명이면 삭제함
    roomManager.checkRoom();
}, 30000);
//메인 채팅방
ChattingSocket(io,'/0');


app.use(express.json());
app.use(express.urlencoded({extended:false}));


//방 정보를 얻어요
app.post('/api/roomList',(req,res,next)=>{
    try{
        res.json(roomManager.getRoomListInfo());
    }catch(err){
        console.error(err)
    }
})


//방 만들기
app.post('/makeRoom',(req,res,next)=>{
    const roomName = req.body.roomName;
    console.log(roomName);
    try{
        const newRoom = roomManager.addRoom(roomName);
        console.log(newRoom.getInfo());
        res.json(newRoom.getInfo());
    }catch(err){
        console.error(err);
    }
})

http.listen(4000,()=>{
    console.log('server listening on 4000');
})