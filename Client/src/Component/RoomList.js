import React from 'react';
import Room from './Room'
import './CSS/RoomList.css'


class RoomList extends React.Component {

    render() {
        const { Rooms ,GetRoomsInfo, makeRoom, enterRoom} = this.props;
        const roomsList = Rooms.map(
            room => <Room
                key={room.roomNumber}
                roomNumber={room.roomNumber}
                numOfPlayer={room.numOfPlayer}
                roomName={room.roomName}
                enterRoom={enterRoom}
            />
        )
        return (
            <div id="room-list">
                <div id="roomManage">
                    <div id="makeRoom">
                        <button onClick={makeRoom}>방만들기</button>
                    </div>
                    <div id="findRoom">
                        <input
                            type="text"
                            placeholder="방 검색"
                            autoComplete="false"
                            id="findRoomInput"
                        />
                    </div>
                    <div id="refreshRoom">
                        <button onClick={GetRoomsInfo}>새로고침</button>
                    </div>
                </div>
                {roomsList}
            </div>
        )
    }
}

export default RoomList; 