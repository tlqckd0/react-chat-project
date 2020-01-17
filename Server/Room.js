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
            nsp.on('disconnect', () => {
                console.log('1번 오류')
                this.numOfPlayer--;
            })
            nsp.on('disconnecting', () => {
                console.log('2번 오류');
                this.numOfPlayer--;
            })
            nsp.on('error', (error) => {
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