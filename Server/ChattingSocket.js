function ChattingSocket(io,roomName) {

    const nsp = io.of(roomName);
    //메인방 연결
    nsp.on('connect', (socket) => {
        socket.broadcast.emit('hi', '누군가 입장했어요!');

        //체팅방에서 받은거를 보내기
        socket.on('chat', (msg) => {
            console.log('메인화면 채팅 .. 십ㄹ')
            nsp.emit('chat', msg);
        })

        socket.on('disconnect', () => {
        })
    })
}
module.exports = ChattingSocket;