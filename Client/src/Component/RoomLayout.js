import React from 'react';
import RoomList from './RoomList';
import './CSS/RoomLayout.css'


class RoomLayout extends React.Component {
    constructor(props){
        super(props);
        this.state={
            search:''
        }
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    filterRoom = (roomList)=>{
        const {search} = this.state;
        return roomList.filter(room => room.roomName.indexOf(search)>=0);
    }
    render() {
        console.log('render');
        const { Rooms ,GetRoomsInfo, makeRoom, enterRoom} = this.props;
        const roomsList = this.filterRoom(Rooms);
        return (
            <div id="roomLayout">
                <div id="roomManage">
                    <div id="makeRoom">
                        <button onClick={makeRoom}>방만들기</button>
                    </div>
                    <div id="findRoom">
                        <input
                            name="search"
                            placeholder="방 검색"
                            autoComplete="false"
                            id="findRoomInput"
                            value={this.state.search}
                            onChange={this.handleValueChange}
                        />
                    </div>
                    <div id="refreshRoom">
                        <button onClick={GetRoomsInfo}>새로고침</button>
                    </div>
                </div>
                <RoomList Rooms={roomsList} enterRoom={enterRoom}/>
            </div>
        )
    }
}

export default RoomLayout; 