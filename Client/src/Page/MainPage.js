import React from 'react';
import { post } from 'axios';
import io from 'socket.io-client';
import RoomLayout from '../Component/RoomLayout';
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
            chattingMessages:[{who:'system',message:'안녕하세요, 반가워요 ㅎㅎ'}],
            socket:io(`/${0}`, { transports: ['polling'],forceNew: true })
        }
    }

    handleValueChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    //소켓 namespace변경
    handleChangeSocket = (roomNum)=>{
        //this.state.socket.disconnect();
        const exSocket = this.state.socket;
        exSocket.disconnect();
        const socket = io(`/${roomNum}`, { transports: ['polling'],forceNew: true });
        this.setState({
            socket
        },()=>this.handleConnectSocket());
    }
    //소켓 연결하기
    handleConnectSocket = ()=>{
        const {socket} = this.state;
        socket.on('connect',()=>{
            socket.on('hi',(msg)=>{
                //서버에서 보내주는거
                this.handleGetMessageFromServer(msg,true);
            })
            socket.on('chat',(msg)=>{
                //사람끼리 이야기하는거
                this.handleGetMessageFromServer(msg,false);
            })
        })
        socket.on('error',(error)=>{
            this.handleGetMessageFromServer('서버와의 연결이 되지않습니다.', true);
        })
    }
    //채팅 메시지 보내는거
    handleSendMessageToServer = (message) => {
        const {socket} = this.state;
        const time = new Date().toLocaleTimeString();
        socket.emit('chat', JSON.stringify({ email: this.props.email, message,time}));
    }

    //채팅 메시지 받는거
    handleGetMessageFromServer = (msg, signal) => {
        const { chattingMessages } = this.state;
        let messageObj = {who:'',message:''};

        if (signal) {
            //서버신호 -> 방입장
            messageObj.who = 'system';
            messageObj.message = msg;
            this.setState({
                chattingMessages: chattingMessages.concat(messageObj)
            })
            return;
        }
        //사람신호 -> 채팅
        let { email, message,time } = JSON.parse(msg);
        if(email === this.props.email){
            messageObj.who="me";
        }else{
            messageObj.who=email;
        }
        messageObj.message = message;
        messageObj.time=time;
        this.setState({
            chattingMessages: chattingMessages.concat(messageObj)
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
        const roomName = prompt('방제목을 입력해주세요');
        if(roomName === null){
            return;
        }
        if(roomName.length === 0){
            alert('방 제목은 필수입니다!');
            return;
        }
        post('/makeRoom', { roomName })
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
            chattingMessages:[{who:'system',message:`${roomNum}번 방에 입장하셨습니다!`}]
        },()=>this.handleChangeSocket(roomNum));
    }
    //채팅방 퇴장 (RoomPage -> MainPage) 이동
    handleLeaveRoom =  () =>  {
        this.setState({
            enterRoom: false,
            enterRoomNum: 0,
            chattingMessages:[{who:'system',message:`매인화면 입니다!`}]
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
            <div id="main-wrap" style={{display:'flex'}}>
                {enterRoom === false
                    ? <RoomLayout
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
                    <UserInfo nick={email} />
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