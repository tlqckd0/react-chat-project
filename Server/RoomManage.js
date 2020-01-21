const Room = require('./Room');

class RoomManager{
    constructor(io){
        this.io = io;
        this.roomNumber = 1;
        this.Rooms = [];
    }
    addRoom = (RoomName)=>{
        const newRoom = new Room(this.roomNumber++, RoomName, this.io);
        this.Rooms.push(newRoom);
        return newRoom;
    }
    getRoomListInfo = ()=>{
        const roomList = this.Rooms.map(room=>room.getInfo());
        return roomList;
    }
    checkRoom = ()=>{
        console.log('방 확인')
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