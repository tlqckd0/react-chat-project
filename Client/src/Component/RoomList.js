import React from 'react';
import Room from './Room'

class RoomList extends React.Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.Rooms !== this.props.Rooms;
    }
    render(){
        const {Rooms,enterRoom} = this.props;
        const roomsList = Rooms.map(
            room => <Room
                key={room.roomNumber}
                roomNumber={room.roomNumber}
                numOfPlayer={room.numOfPlayer}
                roomName={room.roomName}
                enterRoom={enterRoom}
            />
        )
        return(
            <div id="room-list">
                {roomsList}
            </div>
        )
    }
}

export default RoomList;