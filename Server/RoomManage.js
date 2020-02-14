const Room = require('./Room');

class RoomManager{
    constructor(io){
        this.io = io;
        this.roomNumber = 1;
        this.Rooms = [];
        this.deleteRoomNum = 0;
    }
    addRoom = (RoomName)=>{
        const newRoom = new Room(this.roomNumber++, RoomName, this.io);
        this.Rooms.push(newRoom);
        return newRoom;
    }
    enterRoom = (RoomNum)=>{
        const room = this.Rooms.filter(room=>room.roomNumber == RoomNum)[0];
        const NOP = room.numOfPlayer;
        console.log(`${RoomNum}번 방에 ${NOP}명 사람있음 ㅇㅇ`);
        if(NOP <4){
            return true;
        }else{
            return false;
        }
    }
    getRoomListInfo = ()=>{
        const roomList = this.Rooms.map(room=>room.getInfo());
        return roomList;
    }
    checkRoom = ()=>{
        this.Rooms.map(room=>{
            if(room.numOfPlayer === 0){
                console.log('빈방 삭제: ', room.getInfo())
                const idx = this.Rooms.findIndex(_room=>_room.roomNumber === room.roomNumber);
                this.Rooms.splice(idx,1);
            }else{
                console.log(room.getInfo())
            }
        })
    }
}

module.exports = RoomManager;