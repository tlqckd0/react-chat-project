const express = require('express');
var router = express.Router();

module.exports = function(roomManager){
    //방 정보를 얻어요
    router.get('/roomList',(req,res,next)=>{
        try{
            res.json(roomManager.getRoomListInfo());
        }catch(err){
            console.error(err)
        }
    })
    //방 입장
    router.post('/enterRoom',(req,res,next)=>{
        try{
            res.json({result:roomManager.enterRoom(req.body.roomNum)});
        }catch(err){
            console.log(err);
        }
    })
    
    //방 만들기
    router.post('/makeRoom',(req,res,next)=>{
        try{
            res.json(roomManager.addRoom(req.body.roomName).getInfo());
        }catch(err){
            console.error(err);
        }
    })

    return router;
}