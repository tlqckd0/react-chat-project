class Room{
    constructor(roomNumber,roomName,io) {
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.numOfPlayer = 0;
        const nsp = io.of(`/${roomNumber}`);
        nsp.on('connect',(socket)=>{
            socket.broadcast.emit('hi', '누군가 입장했어요!');
            this.numOfPlayer++;
            socket.on('chat', (msg) => {
                console.log(`${this.roomNumber}번 방에서 채팅`)
                nsp.emit('chat', msg);
            })    
            socket.on('disconnect', (reason) => {
                console.log('오류',reason);
                this.numOfPlayer--;
            })
            socket.on('error', (error) => {
                console.error(error);
            });
        })
    }
    getInfo=()=>{
        return {
            roomNumber:this.roomNumber,
            numOfPlayer:this.numOfPlayer,
            roomName:this.roomName
        }
    }
}

module.exports = Room;