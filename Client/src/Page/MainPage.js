import React from 'react';
import { post } from 'axios';
import io from 'socket.io-client';
import RoomList from '../Component/RoomList';
import Chat from '../Component/Chat';
import UserInfo from '../Component/UserInfo';
import GameLayout from '../Component/GameLayout';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Rooms: [],
            enterRoom: false,
            enterRoomNum: 0,
            chattingMessages:['안녕하세요, 반가워요 ㅎㅎ'],
            socket:io(`/${0}`, { transports: ['polling'],forceNew: true })
        }
    }
    handleChangeSocket = (roomNum)=>{
        //this.state.socket.disconnect();
        const exSocket = this.state.socket;
        exSocket.disconnect();
        const socket = io(`/${roomNum}`, { transports: ['polling'],forceNew: true });
        this.setState({
            socket
        },()=>this.handleConnectSocket());
    }
    handleConnectSocket = ()=>{
        const {socket} = this.state;
        socket.on('connect',()=>{
            socket.on('hi',(msg)=>{
                this.handleGetMessageFromServer(msg,true);
            })
            socket.on('chat',(msg)=>{
                this.handleGetMessageFromServer(msg,false);
            })
        })
    }
    //채팅 메시지 보내는거
    handleSendMessageToServer = (message) => {
        const {socket} = this.state;
        socket.emit('chat', JSON.stringify({ email: this.props.email, message: message }));
    }

    //채팅 메시지 받는거
    handleGetMessageFromServer = (msg, signal) => {
        const { chattingMessages } = this.state;

        if (signal) {
            //서버신호 -> 방입장
            this.setState({
                chattingMessages: chattingMessages.concat(msg)
            })
            return;
        }
        //사람신호 -> 채팅
        const { email, message } = JSON.parse(msg);
        this.setState({
            chattingMessages: chattingMessages.concat(`${email} : ${message}`)
        })
    }
    //방 정보들을 서버로 부터 얻음
    handleGetRoomsInfo = () => {
        post('/api/roomList')
            .then(res => {
                const Rooms = res.data;
                this.setState({
                    Rooms: Rooms
                })
            })
            .catch(error=>console.error(error));
    }
    //방 만드는 함수
    handleMakeRoom = () => {
        post('/makeRoom', { roomName: 'test-Room-Maker' })
            .then(res => {
                this.handleEnterRoom(res.data.roomNumber);
            })
            .catch(error=>console.error(error));
    }
    //채팅방 입장 (MainPage -> RoomPage) 이동
    handleEnterRoom = (roomNum) => {
        this.setState({
            enterRoom: true,
            enterRoomNum: roomNum,
            chattingMessages:[`${roomNum}번 방에 입장하셨습니다!`]
        },()=>this.handleChangeSocket(roomNum));
    }
    //채팅방 퇴장 (RoomPage -> MainPage) 이동
    handleLeaveRoom =  () =>  {
        this.setState({
            enterRoom: false,
            enterRoomNum: 0,
            chattingMessages:['메인 채팅방입니다~']
        },()=>this.handleChangeSocket(0))        
    }

    //컴포넌트 마운트 끝나면 서버로부터 정보 가지고오기
    componentDidMount() {
        this.handleConnectSocket(); 
        this.handleGetRoomsInfo();
    }

    render() {
        const { Rooms ,chattingMessages,enterRoom} = this.state;
        const { email } = this.props;
        return (
            <div id="main-wrap">
                {enterRoom === false
                    ? <RoomList
                        makeRoom={this.handleMakeRoom}
                        enterRoom={this.handleEnterRoom}
                        GetRoomsInfo={this.handleGetRoomsInfo}
                        Rooms={Rooms}
                    />
                    : <GameLayout
                        leaveRoom={this.handleLeaveRoom}
                        GetRoomsInfo={this.handleGetRoomsInfo}
                    />
                }
                <div id="rightSide">
                    <UserInfo nick={'tester'} />
                    <Chat
                        email={email}
                        sendMessage={this.handleSendMessageToServer}
                        chattingMessages={chattingMessages}
                    />
                </div>
            </div>
        )
    }
}

export default MainPage;