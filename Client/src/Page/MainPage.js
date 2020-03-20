import React from 'react';
import { post, get } from 'axios';
import io from 'socket.io-client';
import RoomLayout from '../Component/RoomLayout';
import Chat from '../Component/Chat';
import UserInfo from '../Component/UserInfo';
import GameLayout from '../Component/GameLayout';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            isRoomLoaded: false,
            enterRoom: false,
            enterRoomNum: 0,
            chattingMessages: [{ who: 'system', message: '안녕하세요, 반가워요 ㅎㅎ' }],
            socket: io(`/${0}`, { transports: ['polling'], forceNew: true })
        }
    }
    //소켓 namespace변경
    handleChangeSocket = (roomNum) => {
        const exSocket = this.state.socket;
        exSocket.disconnect();
        const socket = io(`/${roomNum}`, { transports: ['polling'], forceNew: true });
        this.setState({
            socket
        }, () => this.handleConnectSocket());
    }
    //소켓 연결하기
    handleConnectSocket = () => {
        const { socket } = this.state;
        socket.on('connect', () => {
            socket.on('hi', (msg) => {
                //서버에서 보내주는거
                this.handleGetMessageFromServer(msg, true);
            })
            socket.on('chat', (msg) => {
                //사람끼리 이야기하는거
                this.handleGetMessageFromServer(msg, false);
            })
            socket.on('refresh',()=>{
                this.handleGetRoomsInfo();
            })
        })
        socket.on('error', (error) => {
            this.handleGetMessageFromServer('서버와의 연결이 되지않습니다.', true);
        })
    }
    //채팅 메시지 보내는거
    handleSendMessageToServer = (message) => {
        const { socket } = this.state;
        const time = new Date().toLocaleTimeString();
        socket.emit('chat', JSON.stringify({ email: this.props.email, message, time }));
    }
    //채팅 메시지 받는거
    handleGetMessageFromServer = (msg, signal) => {
        const { chattingMessages } = this.state;
        let messageObj = { who: '', message: '' };

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
        let { email, message, time } = JSON.parse(msg);
        if (email === this.props.email) {
            messageObj.who = "me";
        } else {
            messageObj.who = email;
        }
        messageObj.message = message;
        messageObj.time = time;
        this.setState({
            chattingMessages: chattingMessages.concat(messageObj)
        })
    }
    //방 정보들을 서버로 부터 얻음
    handleGetRoomsInfo = () => {
        get('/roomList')
            .then(res => {
                const rooms = res.data;
                this.setState({
                    rooms: rooms,
                    isRoomLoaded: true
                })
            })
            .catch(error => console.error(error));
    }
    //방 만드는 함수
    handleMakeRoom = () => {
        const roomName = prompt('방제목을 입력해주세요');
        if (roomName === null) {
            return;
        }
        if (roomName.length === 0) {
            alert('방 제목은 필수입니다!');
            return;
        }
        post('/makeRoom', { roomName })
            .then(res => {
                this.handleEnterRoom(res.data.roomNumber);
            })
            .catch(error => console.error(error));
    }
    //채팅방 입장 (MainPage -> RoomPage) 이동
    handleEnterRoom = (roomNum) => {
        post('/enterRoom', { roomNum })
            .then(res => {
                if (res.data.result !== true) {
                    alert('방이 꽉 찼습니당..');
                } else {
                    this.setState({
                        Rooms: [],
                        isRoomLoaded: false,
                        enterRoom: true,
                        enterRoomNum: roomNum,
                        chattingMessages: [{ who: 'system', message: `${roomNum}번 방에 입장하셨습니다!` }]
                    }, () => this.handleChangeSocket(roomNum));
                }
            });
    }
    //채팅방 퇴장 (RoomPage -> MainPage) 이동
    handleLeaveRoom = () => {
        this.setState({
            enterRoom: false,
            enterRoomNum: 0,
            chattingMessages: [{ who: 'system', message: `매인화면 입니다!` }]
        }, () => {
            this.handleChangeSocket(0);
            this.handleGetRoomsInfo();
        })
    }

    //컴포넌트 마운트 끝나면 서버로부터 정보 가지고오기
    componentDidMount() {
        this.handleConnectSocket();
        this.handleGetRoomsInfo();
    }
    render() {
        const { rooms, chattingMessages, enterRoom, isRoomLoaded } = this.state;
        const { email } = this.props;
        return (
            <div id="main-wrap" style={{ display: 'flex' }}>
                {enterRoom === false
                    ? <RoomLayout
                        makeRoom={this.handleMakeRoom}
                        enterRoom={this.handleEnterRoom}
                        GetRoomsInfo={this.handleGetRoomsInfo}
                        rooms={rooms}
                        isRoomLoaded={isRoomLoaded}
                    />
                    : <GameLayout
                        leaveRoom={this.handleLeaveRoom}
                        GetRoomsInfo={this.handleGetRoomsInfo}
                    />
                }
                <div id="rightSide">
                    <UserInfo nick={email} />
                    <Chat
                        sendMessage={this.handleSendMessageToServer}
                        chattingMessages={chattingMessages}
                    />
                </div>
            </div>
        )
    }
}

// const MainPage = ({ email }) => {
//     const [rooms, setRooms] = useState([]);
//     const [isRoomLoaded, setIsRoomLoaded] = useState(false);
//     const [enterRoom, setEnterRoom] = useState(false);
//     const [chattingMessages, setChattingMessages] = useState([{ who: 'system', message: '안녕하세요, 반가워요 ㅎㅎ' }]);
//     const [socket, setSocket] = useState(io(`/${0}`, { transports: ['polling'], forceNew: true }));
//     const [enterRoomNum, setEnterRoomNum] = useState(0);

//     /* 소캣 변경 */
//     const handleChangeSocket = (roomNum) => {
//         socket.disconnect();
//         setSocket(io(`/${roomNum}`, { transports: ['polling'], forceNew: true }));
//     };

//     /* 소캣 연결 */
//     const handleConnectSocket = (socket) => {
//         socket.on('connect', () => {
//             console.log('연결됨');
//             socket.on('hi', (msg) => {
//                 //서버에서 보내주는거
//                 handleGetMessageFromServer(msg, true);
//             })
//             socket.on('chat', (msg) => {
//                 //사람끼리 이야기하는거
//                 handleGetMessageFromServer(msg, false);
//             })
//         })
//         socket.on('error', (error) => {
//             handleGetMessageFromServer(`서버 연결이 되지않습니다. "${error}" `, true);
//         })
//     };

//     /* 채팅 메시지 보내기 */
//     const handleSendMessageToServer = (message) => {
//         const time = new Date().toLocaleTimeString();
//         console.log(message);
//         socket.emit('chat', JSON.stringify({ _email: email, message, time }));
//     };

//     /* 채팅 메시지 받기 */
//     const handleGetMessageFromServer = (msg, signal) => {
//         let messageObj = { who: '', message: '' };

//         if (signal) { //서버신호 -> 방입장
//             messageObj.who = 'system';
//             messageObj.message = msg;
//             setChattingMessages(chattingMessages.concat(messageObj));
//             return;
//         } else {  //사람신호 -> 채팅
//             let { _email, message, time } = JSON.parse(msg);
//             if (_email === email) {
//                 messageObj.who = "me";
//             } else {
//                 messageObj.who = _email;
//             }
//             messageObj.message = message;
//             messageObj.time = time;
//             setChattingMessages(chattingMessages.concat(messageObj));
//         }
//     };

//     /* 방 정보를 가지고옴 */
//     const handleGetRoomsInfo = () => {
//         get('/roomList')
//             .then(res => {
//                 setRooms(res.data);
//                 setIsRoomLoaded(true);
//             })
//             .catch(error => console.error(error));
//     };

//     /* 방을 만듬 */
//     const handleMakeRoom = () => {
//         const roomName = prompt('방제목을 입력해주세요');
//         if (roomName === null) {
//             return;
//         }
//         if (roomName.length === 0) {
//             alert('방 제목은 필수입니다!');
//             return;
//         }
//         post('/makeRoom', { roomName })
//             .then(res => {
//                 handleEnterRoom(res.data.roomNumber);
//             })
//             .catch(error => console.error(error));
//     };

//     /* 채팅방 입장 (MainPage -> RoomPage) 이동 */
//     const handleEnterRoom = (roomNum) => {
//         post('/enterRoom', { roomNum })
//             .then(res => {
//                 if (res.data.result !== true) {
//                     alert('방이 꽉 찼습니당..');
//                 } else {
//                     setRooms([]);
//                     setIsRoomLoaded(false);
//                     setEnterRoom(true);
//                     setEnterRoomNum(roomNum);
//                     setChattingMessages([{ who: 'system', message: `${roomNum}번 방에 입장하셨습니다!` }]);
//                     return roomNum;
//                 }
//             })
//             .then((roomNum) => {
//                 handleChangeSocket(roomNum)
//             });
//     };

//     /* 채팅방 퇴장 (RoomPage -> MainPage) 이동 */
//     const handleLeaveRoom = () => {
//         setEnterRoom(false);
//         setEnterRoomNum(0);
//         setChattingMessages([{ who: 'system', message: `매인화면 입니다!` }]);

//         //상태변경
//         handleChangeSocket(0);
//         handleGetRoomsInfo();
//     };

//     useEffect(
//         () => {
//             handleGetRoomsInfo();
//             handleConnectSocket(socket);
//         },
//         [socket]
//     )

//     return (
//         <div id="main-wrap" style={{ display: 'flex' }}>
//             {enterRoom === false
//                 ? <RoomLayout
//                     makeRoom={handleMakeRoom}
//                     enterRoom={handleEnterRoom}
//                     GetRoomsInfo={handleGetRoomsInfo}
//                     rooms={rooms}
//                     isRoomLoaded={isRoomLoaded}
//                 />
//                 : <GameLayout
//                     leaveRoom={handleLeaveRoom}
//                     GetRoomsInfo={handleGetRoomsInfo}
//                 />
//             }
//             <div id="rightSide">
//                 <UserInfo nick={email} />
//                 <Chat
//                     sendMessage={handleSendMessageToServer}
//                     chattingMessages={chattingMessages}
//                 />
//             </div>
//         </div>
//     );
// }


export default MainPage;