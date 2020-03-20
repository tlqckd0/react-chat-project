function ChattingSocket(io,roomName) {

    const nsp = io.of(roomName);
    //메인방 연결
    nsp.on('connect', (socket) => {
        socket.broadcast.emit('hi', '누군가 입장했어요!');
        console.log('연결됨');
        //체팅방에서 받은거를 보내기
        socket.on('chat', (msg) => {
            console.log('매인방',msg);
            nsp.emit('chat', msg);
        })
        socket.on('disconnect', () => {
        })
        setInterval(() => {
            nsp.emit('refresh');
        }, 10*1000);
    })
}
module.exports = ChattingSocket;